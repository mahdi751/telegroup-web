export const company = {
  name: "Telegroup Security",
  tagline: "The Power to Protect",
  positioning: "Protection, Engineered.",
  phone: "519-258-1888",
  phoneHref: "tel:+15192581888",
  email: "info@telegroup.ca",
  web: "www.telegroup.ca",
  address: {
    street: "2473 Ouellette Ave",
    city: "Windsor",
    region: "Ontario",
    postal: "N8X 1L5",
    country: "Canada",
  },
  region: "Windsor · Essex · Southwestern Ontario · Michigan",
  social: {
    facebook: "https://www.facebook.com/TelegroupCA",
    instagram: "https://www.instagram.com/telegroup_security",
  },
};

export const stats = [
  { value: "40+", label: "Years of heritage", sub: "in security & low-voltage work" },
  { value: "1,000+", label: "Projects completed", sub: "residential to industrial" },
  { value: "24/7", label: "Support & monitoring", sub: "options on every system" },
  { value: "1", label: "Accountable team", sub: "design through support" },
];

export type Solution = {
  slug: string;
  index: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  icon: string;
};

export const solutions: Solution[] = [
  {
    slug: "ai-surveillance",
    index: "01",
    title: "AI Surveillance Systems",
    short: "Intelligent camera systems with analytics, recognition, and real-time alerting.",
    description:
      "Cameras that do more than record. AI-driven analytics identify threats early, recognize plates and faces, and push alerts the moment something matters — so you respond in real time instead of reviewing footage after the fact.",
    features: [
      "License plate recognition",
      "Facial recognition options",
      "Remote viewing & mobile app",
      "Motion & event alerts",
      "3+ months of storage",
      "AI-powered threat detection",
    ],
    icon: "camera",
  },
  {
    slug: "access-control",
    index: "02",
    title: "Access Control & Intercom",
    short: "Managed entry across doors, gates, and elevators from a single platform.",
    description:
      "Control exactly who enters, where, and when. Manage staff, visitors, and vehicles across every entry point from one platform — with video intercom, remote release, and mobile credentials that scale with your building.",
    features: [
      "Mobile & fob access",
      "Video intercom systems",
      "Remote door release",
      "Multi-door management",
      "Visitor access control",
      "Elevator & gate integration",
    ],
    icon: "access",
  },
  {
    slug: "alarm-intrusion",
    index: "03",
    title: "Alarm & Intrusion Protection",
    short: "Detection engineered to alert the right people before damage is done.",
    description:
      "Intrusion detection tuned to your property — not a generic package. Motion, glass-break, and perimeter sensors trigger the right response instantly, with monitored options and panic features for high-risk areas.",
    features: [
      "Motion & glass-break sensors",
      "Indoor & outdoor sirens",
      "Instant alerts & notifications",
      "Panic button options",
      "Monitored response",
      "Perimeter protection",
    ],
    icon: "alarm",
  },
  {
    slug: "network-wifi",
    index: "04",
    title: "Network & Wi-Fi Infrastructure",
    short: "Enterprise-grade connectivity underpinning every system we deploy.",
    description:
      "Every camera, controller, and sensor depends on the network beneath it. We build reliable, high-performance infrastructure — structured cabling, switching, and coverage engineered to carry your entire technology stack without compromise.",
    features: [
      "Structured cabling",
      "Network switches & equipment",
      "Wi-Fi access point setup",
      "Multi-building connections",
      "Racks & cable management",
      "Testing & troubleshooting",
    ],
    icon: "network",
  },
  {
    slug: "smart-automation",
    index: "05",
    title: "Smart Automation",
    short: "Lighting, climate, audio, and security unified under one control layer.",
    description:
      "Bring lighting, climate, audio, locks, and cameras under one intelligent control layer. Scenes and schedules run automatically, and everything responds to a single app or your voice — for comfort and control that feels effortless.",
    features: [
      "Scenes & schedules",
      "Smart lock & camera integration",
      "Lighting & climate control",
      "Audio system integration",
      "App & voice control",
      "Automation rules",
    ],
    icon: "automation",
  },
  {
    slug: "low-voltage",
    index: "06",
    title: "Low-Voltage & Structured Cabling",
    short: "Clean, labeled, documented cabling — the backbone of reliable systems.",
    description:
      "The difference between a system that lasts and one that fails is what's behind the wall. We deliver clean, labeled, fully documented cabling — pre-wired for new construction and built with headroom for whatever you add next.",
    features: [
      "New-construction pre-wire",
      "Security & network cabling",
      "Rack build-out",
      "Cable testing & certification",
      "Labeling & documentation",
      "System expansion wiring",
    ],
    icon: "cable",
  },
  {
    slug: "mobile-towers",
    index: "07",
    title: "Mobile Camera Towers",
    short: "Rapid-deploy surveillance for sites without fixed infrastructure.",
    description:
      "Instant coverage where there's no power and no infrastructure. Solar-powered, rapid-deploy towers protect construction sites, yards, and events — with live remote viewing and the flexibility to relocate as the site changes.",
    features: [
      "Solar-powered options",
      "PTZ camera options",
      "Live remote viewing",
      "Motion & event alerts",
      "Recorded video storage",
      "Flexible relocation",
    ],
    icon: "tower",
  },
  {
    slug: "monitoring-support",
    index: "08",
    title: "Monitoring, Service & Support",
    short: "The relationship continues after commissioning — by design.",
    description:
      "We don't install and disappear. Ongoing monitoring, remote diagnostics, training, and maintenance keep your system performing for years — with responsive support that's there the moment you call.",
    features: [
      "24/7 monitoring options",
      "Remote diagnostics",
      "Team training",
      "Maintenance plans",
      "System adjustments",
      "Responsive support",
    ],
    icon: "support",
  },
];

export type Industry = {
  slug: string;
  title: string;
  headline: string;
  description: string;
  needs: string[];
  tags: string[];
  icon: string;
};

export const industries: Industry[] = [
  {
    slug: "commercial",
    title: "Commercial Properties",
    headline: "Built for business environments",
    description:
      "Offices, mixed-use, and professional buildings need systems that protect people and assets without slowing daily operations. We design around entrances, staff flow, and the access levels your business actually runs on.",
    needs: [
      "Security camera coverage",
      "Controlled entry for staff & visitors",
      "Alarm & intrusion protection",
      "Intercom & door release",
      "Network & Wi-Fi infrastructure",
      "Remote access & management",
      "Structured cabling",
      "Room to expand",
    ],
    tags: ["Offices", "Mixed-use", "Professional buildings"],
    icon: "commercial",
  },
  {
    slug: "construction",
    title: "Construction Sites",
    headline: "Built for active job sites",
    description:
      "Sites face theft, vandalism, and after-hours activity while infrastructure is still going in. We deploy rapidly, monitor around the clock, and relocate coverage as the project advances.",
    needs: [
      "Mobile camera tower rental",
      "Temporary surveillance systems",
      "PTZ camera coverage",
      "Remote live viewing",
      "Motion & event alerts",
      "Job-site access control",
      "After-hours monitoring",
      "Flexible relocation",
    ],
    tags: ["Mobile towers", "After-hours monitoring", "Material protection"],
    icon: "construction",
  },
  {
    slug: "warehouses",
    title: "Warehouses & Yards",
    headline: "Built for large spaces",
    description:
      "Wide-area sites need visibility across gates, loading areas, and storage zones. We engineer coverage that scales — controlling access, protecting assets, and eliminating blind spots across the full property.",
    needs: [
      "Wide-area camera coverage",
      "PTZ camera options",
      "License plate recognition",
      "Controlled gate & door access",
      "Alarm protection for key areas",
      "Network coverage at scale",
      "Inventory zone protection",
      "Scalable systems",
    ],
    tags: ["LPR at gates", "PTZ coverage", "Inventory zones"],
    icon: "warehouse",
  },
  {
    slug: "restaurants-retail",
    title: "Restaurants & Retail",
    headline: "Built for daily operations",
    description:
      "Retail and hospitality need protection that staff can live with every day. We design around customer areas, cash points, and kitchens — keeping the system simple while covering what matters.",
    needs: [
      "Security camera coverage",
      "Cash register monitoring",
      "Alarm & intrusion protection",
      "Audio & speaker options",
      "Remote viewing from phone",
      "Staff access control",
      "Inventory & storage protection",
      "Clean, low-disruption install",
    ],
    tags: ["Cash points", "Entrances", "Staff access"],
    icon: "retail",
  },
  {
    slug: "residential",
    title: "Residential & Multi-Unit",
    headline: "Built for homes & apartment living",
    description:
      "From single homes to apartment buildings, we build systems that are secure, manageable, and built around the way people live — with tenant access, video intercom, and coverage for common and parking areas.",
    needs: [
      "Home security cameras",
      "Alarm & intrusion protection",
      "Smart home automation",
      "Video doorbells & intercom",
      "Building access control",
      "Tenant & visitor access",
      "Parking & entrance coverage",
      "Smart parking gate entry",
    ],
    tags: ["Video intercom", "Tenant access", "Parking coverage"],
    icon: "residential",
  },
  {
    slug: "automotive-manufacturing",
    title: "Automotive & Manufacturing",
    headline: "Built for operational environments",
    description:
      "Production and service facilities have restricted zones, shift patterns, and shipping areas that all need control. We design systems around work areas, entrances, and the operations that keep the business running.",
    needs: [
      "Production-area coverage",
      "Shipping & receiving surveillance",
      "Smart door access control",
      "Employee entrance control",
      "Restricted-area protection",
      "Yard & parking coverage",
      "Alarm & intrusion protection",
      "Equipment & tool monitoring",
    ],
    tags: ["Production areas", "Shipping / receiving", "Employee access"],
    icon: "manufacturing",
  },
];

export const method = [
  {
    index: "01",
    title: "Assess",
    body: "We walk the property and map risks, entrances, blind spots, and operating patterns — before a single product is chosen.",
  },
  {
    index: "02",
    title: "Engineer",
    body: "The system is designed and specified around the site, with clean documentation and headroom built in for growth.",
  },
  {
    index: "03",
    title: "Deploy",
    body: "Clean installation: labeled cabling, organized racks, fully tested and commissioned to perform from day one.",
  },
  {
    index: "04",
    title: "Sustain",
    body: "Training, monitoring options, remote diagnostics, and responsive support — long after the invoice is settled.",
  },
];

export const assurance = [
  {
    title: "Licensed & Insured",
    body: "Fully licensed and insured for security and low-voltage work in Ontario.",
  },
  {
    title: "Certified Installers",
    body: "Manufacturer-trained and certified on the platforms we deploy.",
  },
  {
    title: "Documented Handover",
    body: "As-built documentation, labeling, and credentials on every project.",
  },
  {
    title: "Responsive by Standard",
    body: "Quotes within one business day; support that answers when you call.",
  },
];

export const whyUs = [
  {
    title: "Clean, Professional Work",
    body: "Clean cabling, proper equipment placement, and a finished result that looks as good as it performs.",
    icon: "shield",
  },
  {
    title: "Complete Technology Solutions",
    body: "Cameras, access, alarms, networking, automation, and low-voltage — engineered to work as one system.",
    icon: "grid",
  },
  {
    title: "Built Around Your Property",
    body: "Every project is planned around your layout, risks, blind spots, and future expansion.",
    icon: "target",
  },
  {
    title: "Reliable Support",
    body: "Setup, training, remote access, and system adjustments long after installation.",
    icon: "headset",
  },
  {
    title: "Long-Term Thinking",
    body: "Systems built to expand as your property or business grows and changes.",
    icon: "growth",
  },
  {
    title: "Family Values",
    body: "A family heritage spanning four decades. We treat every property like our own.",
    icon: "people",
  },
];

export const serviceAreas = [
  "Windsor & Essex County",
  "LaSalle",
  "Amherstburg",
  "Tecumseh",
  "Kingsville",
  "Leamington",
  "Belle River",
  "Chatham",
  "London",
  "Sarnia",
  "Michigan",
];

export const solutionImages: Record<string, string> = {
  "ai-surveillance": "/images/ai-surveillance.jpg",
  "access-control": "/images/access-control.jpg",
  "alarm-intrusion": "/images/alarm.webp",
  "network-wifi": "/images/network.jpg",
  "smart-automation": "/images/reliability.jpeg",
  "low-voltage": "/images/low-voltage.jpeg",
  "mobile-towers": "/images/cctv-hero.jpg",
  "monitoring-support": "/images/office-team.jpg",
};

export const industryImages: Record<string, string> = {
  commercial: "/images/commercial.jpg",
  construction: "/images/construction.jpg",
  warehouses: "/images/warehouses.webp",
  "restaurants-retail": "/images/restaurants.webp",
  residential: "/images/residential.webp",
  "automotive-manufacturing": "/images/manufacturing.jpg",
};

export const propertyTypes = [
  "Commercial Property",
  "Construction Site",
  "Warehouse / Yard",
  "Restaurant / Retail",
  "Residential / Multi-Unit",
  "Automotive / Manufacturing",
  "Other",
];
