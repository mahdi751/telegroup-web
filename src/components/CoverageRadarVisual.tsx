import { motion } from "framer-motion";
import Icon from "./Icon";
import "./CoverageRadarVisual.css";

// Node ring radius must match the SVG glow-dot radius (170 of a 460 viewBox,
// centered at 230,230) so the icons sit exactly on top of the glow markers.
const RING_RADIUS_PCT = (170 / 460) * 100;
const CENTER_PCT = (230 / 460) * 100;

const industryNodes = [
  { icon: "construction", label: "Construction" },
  { icon: "commercial", label: "Commercial" },
  { icon: "residential", label: "Residential" },
  { icon: "manufacturing", label: "Industrial" },
  { icon: "retail", label: "Restaurant & Retail" },
  { icon: "automotive", label: "Auto Dealerships" },
  { icon: "events", label: "Special Events" },
  { icon: "government", label: "Municipal" },
];

const nodes = industryNodes.map((node, i) => {
  const angle = ((i * 45 - 90) * Math.PI) / 180;
  return {
    ...node,
    left: CENTER_PCT + Math.cos(angle) * RING_RADIUS_PCT,
    top: CENTER_PCT + Math.sin(angle) * RING_RADIUS_PCT,
  };
});

export default function CoverageRadarVisual() {
  return (
    <motion.div
      className="coverage-radar"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      aria-hidden="true"
    >
      <div className="coverage-radar__frame">
        <svg viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="crSweepGrad" cx="230" cy="230" r="210" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--cr-gold-bright)" stopOpacity="0.04" />
              <stop offset="100%" stopColor="var(--cr-gold-bright)" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          <circle cx="230" cy="230" r="210" className="cr-ring-outer" />
          <circle cx="230" cy="230" r="125" className="cr-ring-inner" />

          <g className="cr-sweep">
            <path
              d="M230,230 L168.6,29.2 A210,210 0 0 1 291.4,29.2 Z"
              fill="url(#crSweepGrad)"
            />
          </g>

          {nodes.map((_, i) => (
            <circle
              key={i}
              className={`cr-glow cr-glow--${i}`}
              cx={230 + Math.cos((((i * 45 - 90) * Math.PI) / 180)) * 170}
              cy={230 + Math.sin((((i * 45 - 90) * Math.PI) / 180)) * 170}
              r="30"
            />
          ))}

          <circle cx="230" cy="230" r="30" className="cr-hub-base" />
          <g className="cr-hub-icon" transform="translate(216,216)">
            <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </g>
        </svg>

        {nodes.map((n, i) => (
          <div
            key={n.label}
            className="cr-node-anchor"
            style={{ left: `${n.left}%`, top: `${n.top}%` }}
          >
            <motion.div
              className="cr-node"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.7 + i * 0.12,
                duration: 0.5,
                ease: [0.2, 1.6, 0.4, 1],
              }}
            >
              <span className="cr-node__icon">
                <Icon name={n.icon} size={17} />
              </span>
              <span className="cr-node__label">{n.label}</span>
            </motion.div>
          </div>
        ))}

      </div>

      <div className="coverage-radar__status">
        <span className="coverage-radar__dot" />
        8 INDUSTRIES · FULL COVERAGE
      </div>
    </motion.div>
  );
}
