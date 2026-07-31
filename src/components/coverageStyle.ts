import type { StyleSpecification } from "maplibre-gl";

/* OpenFreeMap serves OpenMapTiles-schema vector tiles, free and keyless. */
const TILES = "https://tiles.openfreemap.org/planet";
const GLYPHS = "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf";

type Palette = {
  bg: string;
  water: string;
  land: string;
  park: string;
  roadMinor: string;
  roadMajor: string;
  roadCasing: string;
  motorway: string;
  motorwayCasing: string;
  boundary: string;
  building: [string, string, string];
  label: string;
  labelHalo: string;
};

const DARK: Palette = {
  bg: "#07080a",
  water: "#080f1a",
  land: "#0d0e11",
  park: "#0d1512",
  roadMinor: "#191a1f",
  roadMajor: "#2a2b31",
  roadCasing: "#0b0c0e",
  motorway: "#3a3b43",
  motorwayCasing: "#0b0c0e",
  boundary: "rgba(214,169,84,0.24)",
  building: ["#141519", "#1d1f25", "#2b2e37"],
  label: "#8b8d94",
  labelHalo: "rgba(0,0,0,0.85)",
};

const LIGHT: Palette = {
  bg: "#e9e6de",
  water: "#c2d5e4",
  land: "#f1efe9",
  park: "#dce7d3",
  roadMinor: "#ffffff",
  roadMajor: "#ffffff",
  roadCasing: "#d5d0c5",
  motorway: "#f3dca6",
  motorwayCasing: "#d8bd82",
  boundary: "rgba(176,134,47,0.42)",
  building: ["#e6e2d9", "#d7d2c6", "#c3bdaf"],
  label: "#4a4d55",
  labelHalo: "rgba(255,255,255,0.92)",
};

export const palette = (theme: "light" | "dark") =>
  theme === "dark" ? DARK : LIGHT;

/**
 * Colours for everything we draw on top of the basemap. Gold-on-dark needs to
 * be light and luminous; the same gold on the light basemap disappears, so the
 * light set drops to a deep bronze and leans on opacity instead of glow.
 */
export type Overlay = {
  arcGlow: string;
  arcCore: string;
  arcGlowOpacity: number;
  arcCoreOpacity: number;
  city: string;
  flow: string;
  pulse: string;
  hq: string;
  zoneFill: string;
  zoneLine: string;
  zoneOpacity: Record<"core" | "regional" | "cross-border", number>;
};

const OVERLAY_DARK: Overlay = {
  arcGlow: "#d6a954",
  arcCore: "#e6c680",
  arcGlowOpacity: 0.16,
  arcCoreOpacity: 0.45,
  city: "#e6c680",
  flow: "#f6e6c2",
  pulse: "#e6c680",
  hq: "#d6a954",
  zoneFill: "#d6a954",
  zoneLine: "#e6c680",
  zoneOpacity: { core: 0.16, regional: 0.09, "cross-border": 0.055 },
};

const OVERLAY_LIGHT: Overlay = {
  arcGlow: "#a87f2a",
  arcCore: "#7a5c16",
  arcGlowOpacity: 0.22,
  arcCoreOpacity: 0.62,
  city: "#6d5316",
  flow: "#4a3708",
  pulse: "#8a6a20",
  hq: "#b8892f",
  zoneFill: "#b0862f",
  zoneLine: "#8a6a20",
  zoneOpacity: { core: 0.2, regional: 0.12, "cross-border": 0.07 },
};

export const overlay = (theme: "light" | "dark") =>
  theme === "dark" ? OVERLAY_DARK : OVERLAY_LIGHT;

export function buildStyle(theme: "light" | "dark"): StyleSpecification {
  const c = palette(theme);

  return {
    version: 8,
    glyphs: GLYPHS,
    sources: {
      om: { type: "vector", url: `${TILES}` },
    },
    layers: [
      { id: "bg", type: "background", paint: { "background-color": c.bg } },
      {
        id: "landcover",
        type: "fill",
        source: "om",
        "source-layer": "landcover",
        paint: { "fill-color": c.land, "fill-opacity": 0.6 },
      },
      {
        id: "park",
        type: "fill",
        source: "om",
        "source-layer": "park",
        paint: { "fill-color": c.park, "fill-opacity": 0.7 },
      },
      {
        id: "water",
        type: "fill",
        source: "om",
        "source-layer": "water",
        paint: { "fill-color": c.water },
      },
      {
        id: "waterway",
        type: "line",
        source: "om",
        "source-layer": "waterway",
        paint: { "line-color": c.water, "line-width": 1.4 },
      },
      {
        id: "boundary",
        type: "line",
        source: "om",
        "source-layer": "boundary",
        filter: ["<=", ["get", "admin_level"], 4],
        paint: {
          "line-color": c.boundary,
          "line-width": 1,
          "line-dasharray": [3, 2],
        },
      },
      {
        id: "road-minor",
        type: "line",
        source: "om",
        "source-layer": "transportation",
        minzoom: 11,
        filter: ["in", ["get", "class"], ["literal", ["minor", "service", "path"]]],
        paint: {
          "line-color": c.roadMinor,
          "line-width": ["interpolate", ["linear"], ["zoom"], 11, 0.4, 16, 2.4],
          "line-opacity": theme === "dark" ? 0.9 : 0.75,
        },
      },
      {
        id: "road-major-casing",
        type: "line",
        source: "om",
        "source-layer": "transportation",
        minzoom: 9,
        filter: ["in", ["get", "class"], ["literal", ["primary", "secondary", "tertiary", "trunk"]]],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": c.roadCasing,
          "line-width": ["interpolate", ["linear"], ["zoom"], 9, 1.4, 16, 7.5],
          "line-opacity": 0.9,
        },
      },
      {
        id: "road-major",
        type: "line",
        source: "om",
        "source-layer": "transportation",
        filter: ["in", ["get", "class"], ["literal", ["primary", "secondary", "tertiary", "trunk"]]],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": c.roadMajor,
          "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.5, 16, 5],
        },
      },
      {
        id: "motorway-casing",
        type: "line",
        source: "om",
        "source-layer": "transportation",
        minzoom: 6,
        filter: ["==", ["get", "class"], "motorway"],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": c.motorwayCasing,
          "line-width": ["interpolate", ["linear"], ["zoom"], 6, 1.6, 16, 9.5],
          "line-opacity": 0.9,
        },
      },
      {
        id: "motorway",
        type: "line",
        source: "om",
        "source-layer": "transportation",
        filter: ["==", ["get", "class"], "motorway"],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": c.motorway,
          "line-width": ["interpolate", ["linear"], ["zoom"], 6, 0.6, 16, 6.5],
          "line-opacity": 0.95,
        },
      },
      {
        id: "buildings-3d",
        type: "fill-extrusion",
        source: "om",
        "source-layer": "building",
        minzoom: 13.5,
        paint: {
          "fill-extrusion-color": [
            "interpolate",
            ["linear"],
            ["coalesce", ["get", "render_height"], 8],
            0,
            c.building[0],
            40,
            c.building[1],
            120,
            c.building[2],
          ],
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            13.5,
            0,
            15,
            ["coalesce", ["get", "render_height"], ["get", "height"], 9],
          ],
          "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
          "fill-extrusion-opacity": 0.95,
          "fill-extrusion-vertical-gradient": true,
        },
      },
      {
        id: "place-label",
        type: "symbol",
        source: "om",
        "source-layer": "place",
        filter: ["in", ["get", "class"], ["literal", ["city", "town"]]],
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Noto Sans Regular"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 6, 10, 12, 14],
          "text-letter-spacing": 0.08,
          "text-transform": "uppercase",
          "text-max-width": 8,
        },
        paint: {
          "text-color": c.label,
          "text-halo-color": c.labelHalo,
          "text-halo-width": 1.3,
        },
      },
    ],
  } as StyleSpecification;
}
