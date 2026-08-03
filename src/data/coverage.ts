/* ============================================================
   Coverage zones, service tiers, and the Security Snapshot
   ============================================================ */

import { boundaries } from "./boundaries";

export const HQ = {
  lng: -83.0275,
  lat: 42.2793,
  label: "Telegroup Security",
  sub: "2473 Ouellette Ave, Windsor",
};

/** The reveal starts tight on the office… */
export const INTRO_VIEW = {
  center: [HQ.lng, HQ.lat] as [number, number],
  zoom: 16.2,
  pitch: 60,
  bearing: -18,
};

/** …then pulls back to where the coverage zones and reach arcs actually read. */
export const HOME_VIEW = {
  center: [-82.75, 42.35] as [number, number],
  zoom: 8.1,
  pitch: 38,
  bearing: -8,
};

/**
 * Cities we monitor into — the arcs radiating from Windsor.
 * [label, lng, lat]
 */
export const monitoredCities: [string, number, number][] = [
  ["Detroit", -83.046, 42.331],
  ["Chatham", -82.191, 42.404],
  ["Sarnia", -82.407, 42.975],
  ["London", -81.246, 42.983],
  ["Toronto", -79.383, 43.653],
  ["Ottawa", -75.697, 45.421],
  ["Montreal", -73.567, 45.501],
  ["Grand Rapids", -85.668, 42.963],
  ["Chicago", -87.63, 41.878],
  ["Cleveland", -81.694, 41.499],
  ["Columbus", -82.999, 39.961],
  ["Buffalo", -78.878, 42.886],
];

/**
 * Quadratic Bézier between two points, bowed perpendicular to the run so the
 * arcs read as reach rather than straight rulings.
 */
export function arcBetween(
  a: [number, number],
  b: [number, number],
  segments = 54
): [number, number][] {
  const [ax, ay] = a;
  const [bx, by] = b;
  const dx = bx - ax;
  const dy = by - ay;
  const d = Math.hypot(dx, dy) || 1;

  /* Perpendicular, always bowed the same way so they fan consistently. */
  let px = -dy / d;
  let py = dx / d;
  if (py < 0) {
    px = -px;
    py = -py;
  }

  const lift = Math.min(d * 0.16, 5);
  const cx = (ax + bx) / 2 + px * lift;
  const cy = (ay + by) / 2 + py * lift;

  const out: [number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const u = 1 - t;
    out.push([
      u * u * ax + 2 * u * t * cx + t * t * bx,
      u * u * ay + 2 * u * t * cy + t * t * by,
    ]);
  }
  return out;
}

/** Nothing outside North America is reachable. */
export const NA_BOUNDS: [[number, number], [number, number]] = [
  [-168, 12],
  [-50, 74],
];

export type TierId = "core" | "regional" | "cross-border";

export type Zone = {
  id: TierId;
  name: string;
  /**
   * Outer rings of the real administrative outline (see ./boundaries).
   * A zone can be several disjoint parts, hence an array of rings.
   */
  rings: [number, number][][];
};

/* Checked most-specific first, so the order here matters:
   Essex sits inside Southwestern Ontario. */
export const zones: Zone[] = [
  { id: 'core', name: 'Windsor–Essex', rings: boundaries.core },
  { id: 'regional', name: 'Southwestern Ontario', rings: boundaries.regional },
  { id: 'cross-border', name: 'Michigan', rings: boundaries['cross-border'] },
];

export type Tier = {
  id: TierId;
  verdict: string;
  blurb: string;
  services: string[];
};

export const tiers: Record<TierId, Tier> = {
  core: {
    id: "core",
    verdict: "Full service",
    blurb: "Design, installation, service, and monitoring, our home territory.",
    services: [
      "AI Surveillance Systems",
      "Access Control & Intercom",
      "Alarm & Intrusion Protection",
      "Network & Low-Voltage Infrastructure",
      "Monitoring, Service & Support",
    ],
  },
  regional: {
    id: "regional",
    verdict: "Full install & service",
    blurb:
      "We deploy across Southwestern Ontario on a project basis, with the same engineering and documentation.",
    services: [
      "AI Surveillance Systems",
      "Access Control & Intercom",
      "Network & Low-Voltage Infrastructure",
      "Mobile Camera Towers",
      "Remote Monitoring & Support",
    ],
  },
  "cross-border": {
    id: "cross-border",
    verdict: "Systems, towers & monitoring",
    blurb:
      "Cross-border deployments for multi-site operators, with remote monitoring and support.",
    services: [
      "AI Surveillance Systems",
      "Mobile Camera Towers",
      "Remote Monitoring & Support",
    ],
  },
};

/** The services legend rendered beside the map. */
export const legend = [
  {
    id: "core" as const,
    title: "Windsor–Essex",
    body: "Full design, installation, service and monitoring.",
  },
  {
    id: "regional" as const,
    title: "Southwestern Ontario",
    body: "Project deployments with full engineering and handover.",
  },
  {
    id: "cross-border" as const,
    title: "Michigan & cross-border",
    body: "Systems, mobile towers and remote monitoring.",
  },
];

/* ---------------- Security Snapshot ---------------- */

export type Question = { key: string; q: string; opts: string[] };

export const questions: Question[] = [
  {
    key: "type",
    q: "What are we protecting?",
    opts: [
      "Commercial property",
      "Construction site",
      "Industrial or warehouse",
      "Residential or multi-family",
      "Restaurant or retail",
      "Municipal or public facility",
    ],
  },
  {
    key: "concern",
    q: "Biggest concern right now?",
    opts: [
      "Break-ins and theft",
      "Vandalism and loitering",
      "After-hours blind spots",
      "Equipment and inventory",
      "Controlling who gets in",
    ],
  },
  {
    key: "hours",
    q: "When is it most exposed?",
    opts: ["Overnight", "Weekends", "Around the clock", "During business hours"],
  },
];

export type Plan = {
  name: string;
  line: string;
  items: [string, string][];
  note: string;
};

export function recommend(
  answers: Record<string, string>,
  tier: TierId,
  city: string
): Plan {
  const { type = "", concern = "", hours = "" } = answers;
  const empty = /Overnight|Weekends|Around the clock/.test(hours);

  if (tier === "cross-border") {
    return {
      name: "Cross-Border Site Package",
      line: "Deployable wherever your sites are",
      items: [
        ["AI Surveillance Systems", "Analytics and recognition that flag events as they happen."],
        ["Mobile Camera Towers", "Solar, rapid-deploy coverage with no fixed infrastructure needed."],
        ["Remote Monitoring & Support", "Live viewing and remote diagnostics from Windsor."],
      ],
      note: "Full on-site installation is based in Windsor–Essex. Ask us about multi-site project deployments in your area.",
    };
  }

  if (/Construction/.test(type)) {
    return {
      name: "Rapid-Deploy Site Protection",
      line: `Built for active sites in ${city}`,
      items: [
        ["Mobile Camera Towers", "Solar-powered coverage the day the site opens, no power, no trenching."],
        ["AI Surveillance Systems", "Motion and event alerts the moment something moves after hours."],
        [
          empty ? "Monitoring, Service & Support" : "Access Control & Intercom",
          empty
            ? "Eyes on the site through the hours nobody is there."
            : "Control who reaches the trailer, the gate, and the materials.",
        ],
      ],
      note: "Towers relocate as the site changes. Every deployment starts with a free site walk.",
    };
  }

  if (/Industrial|warehouse/i.test(type)) {
    return {
      name: "Perimeter & Yard Program",
      line: `Engineered around how ${city} sites actually operate`,
      items: [
        ["AI Surveillance Systems", "Perimeter, yard and dock coverage with analytics that cut false alarms."],
        ["Access Control & Intercom", "Gates, docks and restricted areas managed from one platform."],
        ["Network & Low-Voltage Infrastructure", "Labeled, documented cabling built with headroom to expand."],
      ],
      note: "Designed around shift patterns, vehicle flow, and the areas that carry real loss.",
    };
  }

  if (/Residential|multi-family/i.test(type)) {
    return {
      name: "Multi-Family Coverage",
      line: "Built around residents, not just the building",
      items: [
        ["Access Control & Intercom", "Managed entry across doors, gates, elevators and parking."],
        ["AI Surveillance Systems", "Common areas, entries and garages covered and searchable."],
        ["Monitoring, Service & Support", "Responsive support so the system stays trusted and used."],
      ],
      note: "Documented handover and training for your property management team.",
    };
  }

  if (/Restaurant|retail/i.test(type)) {
    return {
      name: "Retail Loss & Safety Package",
      line: "Protecting the floor, the till, and the back door",
      items: [
        ["AI Surveillance Systems", "Point-of-sale, floor and stockroom coverage with searchable events."],
        ["Alarm & Intrusion Protection", "Detection that alerts the right people before damage is done."],
        [
          /who gets in/i.test(concern) ? "Access Control & Intercom" : "Monitoring, Service & Support",
          /who gets in/i.test(concern)
            ? "Staff-only areas controlled and logged."
            : "After-hours monitoring options on the whole system.",
        ],
      ],
      note: "Sized to your footprint and the hours that carry the most risk.",
    };
  }

  if (/Municipal|public/i.test(type)) {
    return {
      name: "Public-Sector System",
      line: "Documented, compliant, and built to be handed over",
      items: [
        ["Access Control & Intercom", "Public entrances and restricted staff areas, managed and logged."],
        ["AI Surveillance Systems", "Coverage that meets accountability and retention requirements."],
        ["Network & Low-Voltage Infrastructure", "Clean, documented infrastructure across multiple sites."],
      ],
      note: "Full documentation package and remote management on handover.",
    };
  }

  if (/business hours/i.test(hours)) {
    return {
      name: "Daytime Presence & Control",
      line: "Deterrence while the doors are open",
      items: [
        ["AI Surveillance Systems", "Cameras over your highest-risk zones, with recognition and alerting."],
        ["Access Control & Intercom", "Managed entry so the right people reach the right areas."],
        ["Monitoring, Service & Support", "Training and responsive support after commissioning."],
      ],
      note: "Engineered around your operating pattern, not a stock equipment package.",
    };
  }

  return {
    name: "After-Hours Watch",
    line: `Coverage for the hours nobody is at the ${city} site`,
    items: [
      ["AI Surveillance Systems", "Detection as it happens, not footage reviewed the next morning."],
      ["Alarm & Intrusion Protection", "Verified alerts that reach the right people immediately."],
      ["Monitoring, Service & Support", "24/7 monitoring options and remote diagnostics."],
    ],
    note: "One accountable team from design through long-term support.",
  };
}

/* ---------------- geometry ---------------- */

/** Ray-casting point-in-polygon. */
export function pointInRing(p: [number, number], ring: [number, number][]) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const hits = yi > p[1] !== yj > p[1];
    if (hits && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function zoneFor(p: [number, number]): TierId | null {
  for (const z of zones) {
    if (z.rings.some((ring) => pointInRing(p, ring))) return z.id;
  }
  return null;
}

export function inNorthAmerica(p: [number, number]) {
  return (
    p[0] >= NA_BOUNDS[0][0] &&
    p[0] <= NA_BOUNDS[1][0] &&
    p[1] >= NA_BOUNDS[0][1] &&
    p[1] <= NA_BOUNDS[1][1]
  );
}
