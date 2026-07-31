import { useCallback, useEffect, useRef, useState } from "react";
import type { Map as MLMap, Marker as MLMarker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Icon from "./Icon";
import { useTheme } from "../theme/ThemeContext";
import { buildStyle, overlay } from "./coverageStyle";
import { cityFrom, geocode, suggest, type Suggestion } from "./geocode";
import {
  HOME_VIEW,
  HQ,
  INTRO_VIEW,
  NA_BOUNDS,
  arcBetween,
  legend,
  monitoredCities,
  questions,
  recommend,
  tiers,
  zones,
  zoneFor,
  type Plan,
  type TierId,
} from "../data/coverage";
import "./CoverageMap.css";

type Located = {
  point: [number, number];
  label: string;
  tier: TierId | null;
  city: string;
};

const zoneGeoJSON = (id: TierId) => ({
  type: "Feature" as const,
  properties: {},
  geometry: {
    type: "MultiPolygon" as const,
    coordinates: zones.find((z) => z.id === id)!.rings.map((ring) => [ring]),
  },
});

export default function CoverageMap() {
  const { theme } = useTheme();
  const hostRef = useRef<HTMLDivElement>(null);
  const mapNodeRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMap | null>(null);
  const glRef = useRef<typeof import("maplibre-gl") | null>(null);
  const searchMarkerRef = useRef<MLMarker | null>(null);
  const pulseRaf = useRef(0);
  const spinRaf = useRef(0);
  const interacted = useRef(false);
  const inView = useRef(false);
  const skipSuggest = useRef(false);
  const officeFound = useRef(false);
  const revealed = useRef(false);
  const revealAt = useRef(0);
  /* The init effect runs once, so it needs a live read of the theme. */
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const arcsRef = useRef(
    monitoredCities.map(([, lng, lat], i) => ({
      phase: (i * 0.41) % 1,
      coords: arcBetween([HQ.lng, HQ.lat], [lng, lat]),
    }))
  );

  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Suggestion[]>([]);
  const [hl, setHl] = useState(-1);
  const [busy, setBusy] = useState(false);
  const [located, setLocated] = useState<Located | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [waterPin, setWaterPin] = useState(false);
  const [pinMode, setPinMode] = useState(false);
  const [step, setStep] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [plan, setPlan] = useState<Plan | null>(null);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- overlays ---------------- */

  const addOverlays = useCallback(
    (map: MLMap, mode: "light" | "dark") => {
      const c = overlay(mode);

      /* Under the water layer, so lakes and the Detroit River punch straight
         through the tint — gold only ever lands on real ground. */
      const under = map.getLayer("water") ? "water" : undefined;

      zones.forEach((z) => {
        const src = `zone-${z.id}`;
        if (!map.getSource(src)) {
          map.addSource(src, { type: "geojson", data: zoneGeoJSON(z.id) });
        }
        if (!map.getLayer(`${src}-fill`)) {
          map.addLayer(
            {
              id: `${src}-fill`,
              type: "fill",
              source: src,
              paint: {
                "fill-color": c.zoneFill,
                "fill-opacity": c.zoneOpacity[z.id],
              },
            },
            under
          );
        }
        if (!map.getLayer(`${src}-line`)) {
          const core = z.id === "core";
          map.addLayer(
            {
              id: `${src}-line`,
              type: "line",
              source: src,
              paint: {
                "line-color": c.zoneLine,
                "line-width": core ? 1.8 : 1,
                "line-opacity": core ? 0.8 : 0.45,
                /* Solid for the home zone; dashed for the softer outer tiers.
                   A dash array must never contain a zero-length segment. */
                ...(core ? {} : { "line-dasharray": [2, 1.5] }),
              },
            },
            under
          );
        }
      });

    /* Reach arcs from the office out to the cities we monitor into, with a
       travelling pulse on each. Sits above the tint, below the labels. */
    if (!map.getSource("arcs")) {
      map.addSource("arcs", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: arcsRef.current.map((a) => ({
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: a.coords },
          })),
        },
      });
      map.addLayer({
        id: "arc-glow",
        type: "line",
        source: "arcs",
        layout: { "line-cap": "round" },
        paint: {
          "line-color": c.arcGlow,
          "line-width": 2.2,
          "line-opacity": c.arcGlowOpacity,
          "line-blur": 5,
        },
      });
      map.addLayer({
        id: "arc-core",
        type: "line",
        source: "arcs",
        layout: { "line-cap": "round" },
        paint: {
          "line-color": c.arcCore,
          "line-width": 0.9,
          "line-opacity": c.arcCoreOpacity,
        },
      });
    }

    if (!map.getSource("cities")) {
      map.addSource("cities", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: monitoredCities.map(([name, lng, lat]) => ({
            type: "Feature",
            properties: { name },
            geometry: { type: "Point", coordinates: [lng, lat] },
          })),
        },
      });
      map.addLayer({
        id: "city-ring",
        type: "circle",
        source: "cities",
        paint: {
          "circle-color": "rgba(0,0,0,0)",
          "circle-stroke-color": c.city,
          "circle-stroke-width": 1.2,
          "circle-stroke-opacity": 0,
          "circle-radius": 4,
        },
      });
      map.addLayer({
        id: "city-dot",
        type: "circle",
        source: "cities",
        paint: {
          "circle-color": c.city,
          "circle-radius": 2.6,
          "circle-opacity": 0.85,
        },
      });
    }

    if (!map.getSource("flow")) {
      map.addSource("flow", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });
      map.addLayer({
        id: "flow",
        type: "circle",
        source: "flow",
        paint: {
          "circle-color": c.flow,
          "circle-radius": 2.4,
          "circle-blur": 0.5,
          "circle-opacity": 0.95,
        },
      });
    }

    /* The office itself: the real footprint from the vector tiles, lit gold.
       Starts empty and is filled in by captureOfficeFootprint once we're
       zoomed in far enough for the building layer to be queryable. */
    if (!map.getSource("hq-block")) {
      map.addSource("hq-block", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });
      map.addLayer({
        id: "hq-block",
        type: "fill-extrusion",
        source: "hq-block",
        paint: {
          "fill-extrusion-color": c.hq,
          "fill-extrusion-height": ["coalesce", ["get", "h"], 12],
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 0.92,
          "fill-extrusion-vertical-gradient": true,
        },
      });
    }

    if (!map.getSource("locpulse")) {
      map.addSource("locpulse", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "Point", coordinates: [HQ.lng, HQ.lat] },
        },
      });
      map.addLayer({
        id: "locpulse-glow",
        type: "circle",
        source: "locpulse",
        paint: {
          "circle-color": c.pulse,
          "circle-opacity": 0,
          "circle-blur": 1,
          "circle-radius": 6,
        },
      });
      map.addLayer({
        id: "locpulse-ring",
        type: "circle",
        source: "locpulse",
        paint: {
          "circle-color": "rgba(0,0,0,0)",
          "circle-stroke-color": c.pulse,
          "circle-stroke-width": 2.4,
          "circle-stroke-opacity": 0,
          "circle-radius": 6,
        },
      });
      }
    },
    []
  );

  /**
   * Swap the office marker onto the building's real footprint, read straight
   * out of the vector tiles. Only possible once the building layer is drawn,
   * so this is attempted during the opening close-up.
   */
  const captureOfficeFootprint = useCallback((map: MLMap) => {
    if (officeFound.current || map.getZoom() < 14) return;
    const pt = map.project([HQ.lng, HQ.lat]);
    const canvas = map.getCanvas();
    if (pt.x < 0 || pt.y < 0 || pt.x > canvas.width || pt.y > canvas.height)
      return;

    let hits: any[] = [];
    try {
      hits = map.queryRenderedFeatures(pt, { layers: ["buildings-3d"] });
    } catch {
      return;
    }
    if (!hits.length) return;

    const f = hits[0];
    const h = +f.properties.render_height || +f.properties.height || 12;
    const src = map.getSource("hq-block") as any;
    src?.setData({
      type: "Feature",
      properties: { h },
      geometry: f.geometry,
    });
    officeFound.current = true;
  }, []);

  /**
   * The opening pull-back from the office to the region.
   *
   * Driven by the animation loop so the visitor actually sees it, but also
   * armed with a plain timer: requestAnimationFrame is suspended in hidden or
   * heavily throttled tabs, and without the fallback the map would be stuck at
   * street level — no zones, no reach arcs — which is a broken resting state.
   */
  const runReveal = useCallback(
    (map: MLMap) => {
      if (revealed.current || interacted.current) return;
      revealed.current = true;
      captureOfficeFootprint(map);

      if (reduce || document.hidden) {
        map.jumpTo(HOME_VIEW);
        return;
      }
      map.easeTo({
        ...HOME_VIEW,
        duration: 3400,
        essential: true,
        easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      });
    },
    [captureOfficeFootprint, reduce]
  );

  /* ---------------- init (lazy, on approach) ---------------- */

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let revealFallback: ReturnType<typeof setTimeout> | undefined;

    /* Within 300px of the viewport in either direction. */
    const near = () => {
      const r = host.getBoundingClientRect();
      return r.top < window.innerHeight + 300 && r.bottom > -300;
    };

    /* IntersectionObserver is the cheap path; scroll is the fallback for
       environments where it never fires. Whichever wins tears down both. */
    const io =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver(() => maybeBoot(), { rootMargin: "300px" })
        : null;

    const stopTriggers = () => {
      io?.disconnect();
      window.removeEventListener("scroll", maybeBoot);
      window.removeEventListener("resize", maybeBoot);
    };

    function maybeBoot() {
      if (cancelled || mapRef.current || !near()) return;
      stopTriggers();
      void boot();
    }

    io?.observe(host);
    window.addEventListener("scroll", maybeBoot, { passive: true });
    window.addEventListener("resize", maybeBoot);
    maybeBoot();

    async function boot() {
      const gl = await import("maplibre-gl");
      if (cancelled || !mapNodeRef.current) return;
      glRef.current = gl;

      const map = new gl.Map({
        container: mapNodeRef.current,
        style: buildStyle(themeRef.current),
        center: INTRO_VIEW.center,
        zoom: INTRO_VIEW.zoom,
        pitch: INTRO_VIEW.pitch,
        bearing: INTRO_VIEW.bearing,
        maxBounds: NA_BOUNDS,
        attributionControl: { compact: true },
        dragRotate: true,
      });
      mapRef.current = map;
      if (import.meta.env.DEV) (window as any).__cmapMap = map;

      map.on("load", () => {
        if (cancelled) return;
        addOverlays(map, themeRef.current);
        setReady(true);

        const hqEl = document.createElement("div");
        hqEl.className = "cmap__hq";
        hqEl.innerHTML =
          '<span class="cmap__hq-dot"></span>' +
          '<span class="cmap__hq-text"><b></b><i></i></span>';
        hqEl.querySelector("b")!.textContent = HQ.label;
        hqEl.querySelector("i")!.textContent = HQ.sub;
        new gl.Marker({ element: hqEl, anchor: "left" })
          .setLngLat([HQ.lng, HQ.lat])
          .addTo(map);

        /* The building layer may not be drawn on the first frame, so keep
           trying through the close-up until we get the real footprint. */
        const tryCapture = () => {
          captureOfficeFootprint(map);
          if (officeFound.current) map.off("render", tryCapture);
        };
        tryCapture();
        map.on("render", tryCapture);

        /* Reduced motion: settle immediately. Otherwise arm the fallback —
           the animation loop normally beats this by a couple of seconds. */
        if (reduce) runReveal(map);
        else revealFallback = setTimeout(() => runReveal(map), 4200);
      });

      ["dragstart", "zoomstart", "rotatestart", "mousedown", "touchstart"].forEach(
        (ev) => map.on(ev as "dragstart", () => (interacted.current = true))
      );
    }

    return () => {
      cancelled = true;
      stopTriggers();
      clearTimeout(revealFallback);
      cancelAnimationFrame(pulseRaf.current);
      cancelAnimationFrame(spinRaf.current);
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- theme swap ---------------- */

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    map.setStyle(buildStyle(theme));
    map.once("styledata", () => addOverlays(map, theme));
  }, [theme, ready, addOverlays]);

  /* ---------------- ambient drift until the user takes over ---------------- */

  useEffect(() => {
    if (!ready || reduce) return;
    let last = performance.now();

    let lastFlow = 0;

    const tick = (now: number) => {
      const map = mapRef.current;
      const dt = now - last;
      last = now;

      if (map && inView.current && !document.hidden) {
        /* The opening pull-back, fired the first time the section is really
           on screen in a visible tab — so the visitor actually sees it, and
           a slow connection can't strand them at street level. */
        if (!revealed.current && !interacted.current) {
          if (!revealAt.current) revealAt.current = now + 1100;
          else if (now >= revealAt.current) runReveal(map);
        }

        /* Slow drift, only once the reveal is done and nobody has taken over. */
        if (revealed.current && !interacted.current && !located) {
          map.setBearing(map.getBearing() + dt * 0.0022);
        }

        /* Travelling pulses along the reach arcs, ~25fps. */
        if (now - lastFlow > 40) {
          lastFlow = now;

          const p = (now / 2400) % 1;
          const eased = 1 - Math.pow(1 - p, 3);
          if (map.getLayer("city-ring")) {
            map.setPaintProperty("city-ring", "circle-radius", 4 + eased * 14);
            map.setPaintProperty(
              "city-ring",
              "circle-stroke-opacity",
              0.5 * (1 - p)
            );
          }

          const src = map.getSource("flow") as any;
          if (src?.setData) {
            src.setData({
              type: "FeatureCollection",
              features: arcsRef.current.map((a) => {
                const t = (now / 3200 + a.phase) % 1;
                const i = Math.min(
                  a.coords.length - 1,
                  Math.floor(t * (a.coords.length - 1))
                );
                return {
                  type: "Feature",
                  properties: {},
                  geometry: { type: "Point", coordinates: a.coords[i] },
                };
              }),
            });
          }
        }
      }

      spinRaf.current = requestAnimationFrame(tick);
    };
    spinRaf.current = requestAnimationFrame(tick);

    /* Drift only while the section is actually on screen. */
    const host = hostRef.current;
    const sync = () => {
      if (!host) return;
      const r = host.getBoundingClientRect();
      inView.current = r.top < window.innerHeight && r.bottom > 0;
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      cancelAnimationFrame(spinRaf.current);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [ready, reduce, located]);

  /* ---------------- autocomplete ---------------- */

  useEffect(() => {
    /* Picking a suggestion rewrites the query — don't reopen the list. */
    if (skipSuggest.current) {
      skipSuggest.current = false;
      return;
    }
    const q = query.trim();
    if (q.length < 3) {
      setItems([]);
      setHl(-1);
      return;
    }
    const ac = new AbortController();
    const t = setTimeout(async () => {
      try {
        const r = await suggest(q, ac.signal);
        setItems(r);
        setHl(-1);
      } catch {
        /* aborted or provider hiccup — leave the list as-is */
      }
    }, 240);
    return () => {
      clearTimeout(t);
      ac.abort();
    };
  }, [query]);

  /* ---------------- locate + classify ---------------- */

  const pulse = useCallback(
    (p: [number, number]) => {
      const map = mapRef.current;
      if (!map) return;
      const src = map.getSource("locpulse") as any;
      if (src?.setData) {
        src.setData({
          type: "Feature",
          properties: {},
          geometry: { type: "Point", coordinates: p },
        });
      }
      if (reduce) return;

      cancelAnimationFrame(pulseRaf.current);
      const dur = 2600;
      const reps = 3;
      let t0 = 0;

      const stepFn = (ts: number) => {
        if (!t0) t0 = ts;
        const el = ts - t0;
        const cyc = (el % (dur / reps)) / (dur / reps);
        const radius = 6 + cyc * 54;
        const op = Math.max(0, 1 - cyc);
        if (map.getLayer("locpulse-ring")) {
          map.setPaintProperty("locpulse-ring", "circle-radius", radius);
          map.setPaintProperty("locpulse-ring", "circle-stroke-opacity", op * 0.85);
        }
        if (map.getLayer("locpulse-glow")) {
          map.setPaintProperty("locpulse-glow", "circle-radius", radius * 0.8);
          map.setPaintProperty("locpulse-glow", "circle-opacity", op * 0.22);
        }
        if (el < dur) pulseRaf.current = requestAnimationFrame(stepFn);
        else if (map.getLayer("locpulse-ring")) {
          map.setPaintProperty("locpulse-ring", "circle-stroke-opacity", 0);
          map.setPaintProperty("locpulse-glow", "circle-opacity", 0);
        }
      };
      pulseRaf.current = requestAnimationFrame(stepFn);
    },
    [reduce]
  );

  const classify = useCallback(
    (point: [number, number], label: string) => {
      const tier = zoneFor(point);
      setNotFound(false);
      setWaterPin(false);
      setStep(null);
      setPlan(null);
      setAnswers({});
      setLocated({ point, label, tier, city: cityFrom(label) });

      const map = mapRef.current;
      const gl = glRef.current;
      if (map && gl) {
        searchMarkerRef.current?.remove();
        const el = document.createElement("div");
        el.className = "cmap__pin";
        el.innerHTML = '<span class="cmap__pin-core"></span>';
        searchMarkerRef.current = new gl.Marker({ element: el, anchor: "center" })
          .setLngLat(point)
          .addTo(map);

        map.flyTo({
          center: point,
          zoom: tier === "core" ? 14.2 : tier ? 10.5 : 8.5,
          pitch: tier === "core" ? 55 : 25,
          duration: reduce ? 0 : 3000,
          essential: true,
        });
        pulse(point);
      }
    },
    [pulse, reduce]
  );

  const pick = useCallback(
    (i: number) => {
      const it = items[i];
      if (!it) return;
      const label = it.primary + (it.secondary ? `, ${it.secondary}` : "");
      skipSuggest.current = true;
      setQuery(label);
      setItems([]);
      setHl(-1);
      classify([it.lng, it.lat], label);
    },
    [items, classify]
  );

  const runSearch = useCallback(async () => {
    const q = query.trim();
    if (!q) return;
    if (items.length) {
      pick(hl >= 0 ? hl : 0);
      return;
    }
    setBusy(true);
    const hit = await geocode(q);
    setBusy(false);
    if (hit) classify([hit.lng, hit.lat], hit.name);
    else {
      setLocated(null);
      setNotFound(true);
    }
  }, [query, items, hl, pick, classify]);

  /* ---------------- pin drop ---------------- */

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const onClick = (e: any) => {
      if (!pinMode) return;
      setPinMode(false);
      const p: [number, number] = [e.lngLat.lng, e.lngLat.lat];

      /* Ontario's regional boundaries run out over the lakes, so a pin dropped
         on open water would otherwise come back "covered". */
      let onWater = false;
      try {
        onWater =
          map.queryRenderedFeatures(e.point, { layers: ["water"] }).length > 0;
      } catch {
        /* layer not rendered yet — fall through and classify normally */
      }
      if (onWater) {
        setLocated(null);
        setNotFound(false);
        setWaterPin(true);
        return;
      }

      classify(
        p,
        `Dropped pin, ${p[1].toFixed(4)} N ${Math.abs(p[0]).toFixed(4)} W`
      );
    };
    map.on("click", onClick);
    return () => {
      map.off("click", onClick);
    };
  }, [ready, pinMode, classify]);

  /* ---------------- map controls ---------------- */

  const ctl = (action: "in" | "out" | "reset" | "me") => {
    const map = mapRef.current;
    if (!map) return;
    interacted.current = true;
    map.stop();
    if (action === "in") map.zoomIn({ duration: 380 });
    if (action === "out") map.zoomOut({ duration: 380 });
    if (action === "reset")
      map.flyTo({ ...HOME_VIEW, duration: reduce ? 0 : 1600, essential: true });
    if (action === "me") {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          classify(
            [pos.coords.longitude, pos.coords.latitude],
            "Your current location"
          ),
        () => setNotFound(true),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }
  };

  /* ---------------- snapshot wizard ---------------- */

  const answer = (key: string, value: string) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    const s = (step ?? 0) + 1;
    if (s < questions.length) setStep(s);
    else {
      setStep(null);
      setPlan(recommend(next, located?.tier ?? "core", located?.city ?? "your area"));
    }
  };

  const contactHref = () => {
    const p = new URLSearchParams();
    if (located?.label) p.set("location", located.label);
    if (plan?.name) p.set("package", plan.name);
    return `/contact?${p.toString()}#contact-form`;
  };

  const tier = located?.tier ? tiers[located.tier] : null;

  return (
    <section className="cmap" id="coverage" ref={hostRef} aria-label="Coverage map">
      <div className="cmap__canvas" ref={mapNodeRef} />
      <div className="cmap__scrim" aria-hidden="true" />
      {!ready && <div className="cmap__loading">Loading coverage map…</div>}

      {/* ---- left panel ---- */}
      <div className="cmap__panel">
        <span className="eyebrow">Where we cover</span>
        <h2 className="cmap__title">
          Find your <span className="gold">coverage.</span>
        </h2>
        <p className="cmap__lead">
          AI surveillance, access control, alarms and low-voltage infrastructure
          across Windsor–Essex and Southwestern Ontario, plus systems, towers and
          remote monitoring further afield. Check your address to see what we can
          do at your site.
        </p>

        <div className="cmap__search">
          <div className="cmap__field">
            <input
              type="text"
              value={query}
              placeholder="Start typing an address"
              aria-label="Property address"
              autoComplete="off"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (items.length) {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setHl((h) => (h + 1) % items.length);
                    return;
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setHl((h) => (h - 1 + items.length) % items.length);
                    return;
                  }
                  if (e.key === "Enter") {
                    e.preventDefault();
                    pick(hl >= 0 ? hl : 0);
                    return;
                  }
                  if (e.key === "Escape") {
                    setItems([]);
                    return;
                  }
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  void runSearch();
                }
              }}
            />
            {items.length > 0 && (
              <ul className="cmap__ac" role="listbox">
                {items.map((it, i) => (
                  <li
                    key={`${it.primary}-${i}`}
                    role="option"
                    aria-selected={i === hl}
                    className={i === hl ? "hl" : ""}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      pick(i);
                    }}
                  >
                    <b>{it.primary}</b>
                    {it.secondary && <span>{it.secondary}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="cmap__go"
            type="button"
            onClick={() => void runSearch()}
            disabled={busy}
          >
            {busy ? "…" : "Check"}
            {!busy && <Icon name="arrow" size={15} />}
          </button>
        </div>

        <div className="cmap__hints">
          <span>try: Windsor ON · Leamington · Chatham</span>
          <button type="button" onClick={() => setPinMode(true)}>
            no address? drop a pin
          </button>
        </div>

        {/* ---- result ---- */}
        {pinMode && (
          <div className="cmap__result">
            <div className="cmap__addr">Pin drop</div>
            <p className="cmap__note">
              Click your site on the map and we'll check coverage for that exact
              spot.
            </p>
          </div>
        )}

        {waterPin && !pinMode && (
          <div className="cmap__result cmap__result--out">
            <div className="cmap__verdict">
              <i />
              That's open water
            </div>
            <p className="cmap__note">
              Drop the pin on the site itself and we'll check coverage there.
            </p>
          </div>
        )}

        {notFound && !pinMode && (
          <div className="cmap__result cmap__result--out">
            <div className="cmap__verdict">
              <i />
              Address not found
            </div>
            <p className="cmap__note">
              Try a more specific address, pick a suggestion, or drop a pin.
            </p>
          </div>
        )}

        {located && !pinMode && step === null && !plan && (
          <div
            className={`cmap__result cmap__result--${located.tier ?? "out"}`}
          >
            <div className="cmap__addr">
              {located.label.split(",").slice(0, 3).join(", ")}
            </div>
            {tier ? (
              <>
                <div className="cmap__verdict">
                  <i />
                  {tier.verdict}
                </div>
                <div className="cmap__zoneline">
                  Zone: {located.city.toUpperCase()}
                  {located.tier === "core" ? " · WINDSOR–ESSEX" : ""}
                </div>
                <ul className="cmap__svc">
                  {tier.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <button
                  className="cmap__snap"
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setStep(0);
                  }}
                >
                  Get my free Security Snapshot <Icon name="arrow" size={15} />
                </button>
              </>
            ) : (
              <>
                <div className="cmap__verdict">
                  <i />
                  Outside current coverage
                </div>
                <p className="cmap__note">
                  This location is beyond our mapped coverage. Get in touch and
                  we'll tell you honestly whether we can help.
                </p>
                <a className="cmap__snap" href="/contact#contact-form">
                  Contact us <Icon name="arrow" size={15} />
                </a>
              </>
            )}
          </div>
        )}

        {step !== null && located && (
          <div className={`cmap__result cmap__result--${located.tier ?? "out"}`}>
            <div className="cmap__addr">
              Security Snapshot · step {step + 1} of {questions.length}
            </div>
            <div className="cmap__q">{questions[step].q}</div>
            <div className="cmap__chips">
              {questions[step].opts.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => answer(questions[step].key, o)}
                >
                  {o}
                </button>
              ))}
            </div>
            <button
              className="cmap__back"
              type="button"
              onClick={() => (step > 0 ? setStep(step - 1) : setStep(null))}
            >
              {step > 0 ? "Back" : "Cancel"}
            </button>
          </div>
        )}

        {plan && located && (
          <div className={`cmap__result cmap__result--${located.tier ?? "out"}`}>
            <div className="cmap__addr">Your Security Snapshot</div>
            <div className="cmap__verdict">
              <i />
              {plan.name}
            </div>
            <div className="cmap__zoneline">{plan.line}</div>
            <div className="cmap__plan">
              {plan.items.map(([t, d]) => (
                <div key={t}>
                  <b>{t}</b>
                  <span>{d}</span>
                </div>
              ))}
            </div>
            <p className="cmap__note">{plan.note}</p>
            <div className="cmap__ctas">
              <a className="cmap__snap" href={contactHref()}>
                Request a Quote <Icon name="arrow" size={15} />
              </a>
              <button
                className="cmap__back"
                type="button"
                onClick={() => {
                  setPlan(null);
                  setAnswers({});
                }}
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ---- legend ---- */}
      <div className="cmap__legend">
        <span className="cmap__legend-head">Our coverage</span>
        {legend.map((l) => (
          <div className="cmap__legend-row" key={l.id}>
            <i className={`cmap__swatch cmap__swatch--${l.id}`} />
            <div>
              <b>{l.title}</b>
              <span>{l.body}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ---- controls ---- */}
      <div className="cmap__ctl">
        <button type="button" onClick={() => ctl("in")} aria-label="Zoom in">
          +
        </button>
        <button type="button" onClick={() => ctl("out")} aria-label="Zoom out">
          −
        </button>
        <button
          type="button"
          onClick={() => ctl("reset")}
          aria-label="Reset view to Windsor"
          title="Back to Windsor"
        >
          <Icon name="pin" size={16} />
        </button>
        <button
          type="button"
          onClick={() => ctl("me")}
          aria-label="Use my location"
          title="Use my location"
        >
          <Icon name="target" size={16} />
        </button>
      </div>
    </section>
  );
}
