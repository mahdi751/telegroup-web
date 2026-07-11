import { motion } from "framer-motion";
import Icon from "./Icon";
import "./SystemHubVisual.css";

const nodes = [
  { icon: "camera", label: "AI Surveillance", left: 50, top: 9.3 },
  { icon: "access", label: "Access Control", left: 84.6, top: 37.4 },
  { icon: "alarm", label: "Alarms", left: 71.5, top: 83 },
  { icon: "network", label: "Networking", left: 28.5, top: 83 },
  { icon: "cable", label: "Low-Voltage", left: 15.4, top: 37.4 },
];

const spokes = [
  "M240,215 L240,40",
  "M240,215 L406,161",
  "M240,215 L343,357",
  "M240,215 L137,357",
  "M240,215 L74,161",
];

export default function SystemHubVisual() {
  return (
    <motion.div
      className="system-hub"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      aria-hidden="true"
    >
      <div className="system-hub__frame">
        <svg viewBox="0 0 480 430" xmlns="http://www.w3.org/2000/svg">
          <g className="sh-compass">
            <circle cx="240" cy="215" r="196" className="sh-compass-ring" />
          </g>

          {spokes.map((d, i) => (
            <path key={i} className={`sh-spoke sh-spoke--${i}`} d={d} />
          ))}
          {spokes.map((_, i) => (
            <circle key={i} className={`sh-packet sh-packet--${i}`} r="3.2" />
          ))}

          <circle className="sh-ping sh-ping--1" cx="240" cy="215" r="40" />
          <circle className="sh-ping sh-ping--2" cx="240" cy="215" r="40" />
          <circle className="sh-hub-base" cx="240" cy="215" r="40" />

          <g className="sh-shield" transform="translate(214,189) scale(2.2)">
            <path
              className="sh-shield-outline"
              d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"
            />
            <path className="sh-shield-check" d="M9 12l2 2 4-4" />
          </g>
        </svg>

        {nodes.map((n, i) => (
          <div
            key={n.label}
            className="sh-node-anchor"
            style={{ left: `${n.left}%`, top: `${n.top}%` }}
          >
            <motion.div
              className="sh-node"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.9 + i * 0.22,
                duration: 0.5,
                ease: [0.2, 1.6, 0.4, 1],
              }}
            >
              <span className="sh-node__ring" />
              <span className="sh-node__icon">
                <Icon name={n.icon} size={17} />
              </span>
              <span className="sh-node__label">{n.label}</span>
            </motion.div>
          </div>
        ))}

        <div className="system-hub__status">
          <span className="system-hub__dot" />
          EIGHT CAPABILITIES · ONE SYSTEM
        </div>
      </div>
    </motion.div>
  );
}
