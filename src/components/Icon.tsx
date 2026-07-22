type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

// Brand glyphs render as filled shapes rather than stroked outlines.
const filledIcons = new Set(["facebook"]);

const paths: Record<string, JSX.Element> = {
  camera: (
    <>
      <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.7l1-1.6h5.6l1 1.6h1.7A2.5 2.5 0 0 1 19 8.5v9A2.5 2.5 0 0 1 16.5 20h-11A2.5 2.5 0 0 1 3 17.5z" />
      <circle cx="11" cy="12.5" r="3.4" />
      <path d="M21 9v7" />
    </>
  ),
  access: (
    <>
      <rect x="4" y="3" width="12" height="18" rx="2" />
      <circle cx="12.5" cy="12" r="1.6" />
      <path d="M12.5 13.6V16" />
      <path d="M19 8v8" />
    </>
  ),
  alarm: (
    <>
      <path d="M12 3a6 6 0 0 0-6 6c0 4-1.5 5.5-2 6h16c-.5-.5-2-2-2-6a6 6 0 0 0-6-6z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v4M12 11 5 17M12 11l7 6" />
    </>
  ),
  automation: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h12v-9" />
      <path d="M12 19v-4" />
      <circle cx="12" cy="12.5" r="1.4" />
    </>
  ),
  cable: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M10 7h.01M7 17h.01M10 17h.01" />
    </>
  ),
  tower: (
    <>
      <path d="M12 3v18" />
      <path d="M6 21 12 6l6 15" />
      <path d="M8 15h8M9.5 11h5" />
      <circle cx="12" cy="4.5" r="1.5" />
    </>
  ),
  support: (
    <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M20 19a5 5 0 0 1-5 4h-3" />
    </>
  ),
  commercial: (
    <>
      <rect x="4" y="3" width="10" height="18" rx="1" />
      <path d="M14 8h6v13h-6" />
      <path d="M7 7h.01M11 7h.01M7 11h.01M11 11h.01M7 15h.01M11 15h.01M17 12h.01M17 16h.01" />
    </>
  ),
  construction: (
    <>
      <path d="M4 21h16" />
      <path d="M6 21V8l9-3v3" />
      <path d="M6 8 3 6.5 15 3l3 1.5" />
      <path d="M15 8h3v13" />
      <path d="M9 12h.01M9 16h.01M12 12h.01M12 16h.01" />
    </>
  ),
  warehouse: (
    <>
      <path d="M3 21V9l9-5 9 5v12" />
      <path d="M7 21v-8h10v8" />
      <path d="M7 15h10" />
    </>
  ),
  retail: (
    <>
      <path d="M4 8h16l-1 12H5z" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </>
  ),
  residential: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <rect x="10" y="14" width="4" height="6" />
    </>
  ),
  manufacturing: (
    <>
      <path d="M3 21V10l6 4V10l6 4V6l6 3v12z" />
      <path d="M7 21v-4M12 21v-4M17 21v-4" />
    </>
  ),
  automotive: (
    <>
      <path d="M5 17h14l-1.5-4.5H6.5z" />
      <circle cx="7.5" cy="17" r="2" />
      <circle cx="16.5" cy="17" r="2" />
      <path d="M3 13h18" />
    </>
  ),
  events: (
    <>
      <path d="M12 3v18" />
      <path d="M6 21 12 6l6 15" />
      <circle cx="12" cy="4.5" r="1.5" />
    </>
  ),
  government: (
    <>
      <path d="M4 21V10l8-5 8 5v11" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  ),
  headset: (
    <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
    </>
  ),
  growth: (
    <>
      <path d="M4 19h16" />
      <path d="M4 19V9M9 19v-6M14 19v-9M19 19V5" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M3 20v-1a5 5 0 0 1 10 0v1" />
      <path d="M15 20v-1a4 4 0 0 1 6-3.4" />
    </>
  ),
  phone: (
    <>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M4 12l5 5L20 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  bolt: <path d="M13 3 4 14h7l-1 7 9-11h-7z" />,
  facebook: (
    <path d="M13.5 21v-7h2.4l.4-2.9h-2.8V9.3c0-.85.24-1.43 1.45-1.43H16.8V5.28c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9v2.04H8.3V14h2.42v7z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.8" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.7" cy="7.3" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5" />
    </>
  ),
  moon: (
    <path d="M20.6 13.4A8.2 8.2 0 1 1 10.6 3.4a6.6 6.6 0 0 0 10 10z" />
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
};

export default function Icon({ name, size = 24, className }: IconProps) {
  const filled = filledIcons.has(name);
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.shield}
    </svg>
  );
}
