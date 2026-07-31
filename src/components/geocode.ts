/* ============================================================
   Address search — free OpenStreetMap providers, no key needed.

   Photon powers the typeahead; Nominatim is the precise fallback
   for a raw submitted string. Both are community-run: keep calls
   debounced and low-volume.

   To move to a paid provider later, implement `suggest` against it
   and leave the rest of the component untouched.
   ============================================================ */

export type Suggestion = {
  lng: number;
  lat: number;
  primary: string;
  secondary: string;
  rank: number;
};

/* Bias results toward Windsor and the surrounding service area. */
const BIAS = { lat: 42.3, lon: -83.03 };
const NA_BBOX = "-141,24,-52,60";

const RANK: Record<string, number> = {
  house: 0,
  street: 1,
  locality: 2,
  city: 3,
  county: 4,
  state: 5,
};

export async function suggest(
  q: string,
  signal?: AbortSignal
): Promise<Suggestion[]> {
  const url =
    "https://photon.komoot.io/api/?q=" +
    encodeURIComponent(q) +
    `&limit=10&lang=en&lat=${BIAS.lat}&lon=${BIAS.lon}&zoom=12&bbox=${NA_BBOX}`;

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`photon ${res.status}`);
  const data = await res.json();

  const seen = new Set<string>();

  return (data.features || [])
    .filter((f: any) =>
      ["CA", "US"].includes((f.properties?.countrycode || "").toUpperCase())
    )
    .map((f: any) => {
      const p = f.properties || {};
      const primary =
        [p.housenumber, p.name || p.street].filter(Boolean).join(" ") ||
        p.name ||
        p.street ||
        p.city ||
        "";
      /* Photon repeats the city as the name for city-level hits — don't
         render "Leamington, Leamington, Ontario". */
      const locality = p.city || p.county;
      const secondary = [
        locality && locality !== primary ? locality : null,
        p.state,
        p.country === "United States of America" ? "USA" : p.country,
      ]
        .filter(Boolean)
        .join(", ");
      return {
        lng: f.geometry.coordinates[0],
        lat: f.geometry.coordinates[1],
        primary: primary || secondary,
        secondary: primary ? secondary : "",
        rank: RANK[p.type] ?? 3,
      } as Suggestion;
    })
    .filter((s: Suggestion) => {
      if (!s.primary) return false;
      const key = `${s.primary}|${s.secondary}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a: Suggestion, b: Suggestion) => a.rank - b.rank)
    .slice(0, 6);
}

/** Resolve a raw typed string when the user submits without picking. */
export async function geocode(
  q: string,
  signal?: AbortSignal
): Promise<{ lng: number; lat: number; name: string } | null> {
  try {
    const hits = await suggest(q, signal);
    if (hits.length) {
      const h = hits[0];
      return {
        lng: h.lng,
        lat: h.lat,
        name: h.primary + (h.secondary ? `, ${h.secondary}` : ""),
      };
    }
  } catch {
    /* fall through to Nominatim */
  }

  try {
    const url =
      "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1" +
      "&countrycodes=ca,us&addressdetails=1&q=" +
      encodeURIComponent(q);
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal,
    });
    const data = await res.json();
    if (!data?.length) return null;
    return { lng: +data[0].lon, lat: +data[0].lat, name: data[0].display_name };
  } catch {
    return null;
  }
}

/** "2473 Ouellette Ave, Windsor, ON" -> "Windsor" */
export function cityFrom(label: string) {
  const parts = (label || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!parts.length) return "your area";
  return /\d/.test(parts[0]) && parts.length > 1 ? parts[1] : parts[0];
}
