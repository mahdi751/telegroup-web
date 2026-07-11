import { motion } from "framer-motion";
import Icon from "./Icon";
import { stats } from "../data/site";
import "./HeritageVisual.css";

export default function HeritageVisual() {
  const heritage = stats[0];
  const projects = stats[1];

  return (
    <motion.div
      className="heritage-visual"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      aria-hidden="true"
    >
      <div className="heritage-visual__frame">
        <svg viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg">
          {/* rotating compass ring */}
          <g className="hv-compass">
            <circle cx="230" cy="230" r="204" className="hv-compass-ring" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 230 + Math.cos(angle) * 196;
              const y1 = 230 + Math.sin(angle) * 196;
              const x2 = 230 + Math.cos(angle) * 210;
              const y2 = 230 + Math.sin(angle) * 210;
              return (
                <line
                  key={i}
                  className="hv-tick"
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                />
              );
            })}
          </g>

          {/* static grounding ring */}
          <circle cx="230" cy="230" r="160" className="hv-ring-static" />

          {/* radar pings */}
          <circle className="hv-ping hv-ping--1" cx="230" cy="230" r="46" />
          <circle className="hv-ping hv-ping--2" cx="230" cy="230" r="46" />

          {/* shield emblem */}
          <g className="hv-shield" transform="translate(158,158) scale(6)">
            <path
              className="hv-shield-outline"
              d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"
            />
            <path className="hv-shield-check" d="M9 12l2 2 4-4" />
          </g>

          {/* timeline */}
          <line className="hv-timeline" x1="76" y1="404" x2="384" y2="404" />
          <circle className="hv-node hv-node--1" cx="76" cy="404" r="5" />
          <circle className="hv-node hv-node--2" cx="384" cy="404" r="5" />
          <circle className="hv-pulse-dot" cx="76" cy="404" r="3.5" />
          <text className="hv-year hv-year--1" x="76" y="428">EST. 1984</text>
          <text className="hv-year hv-year--2" x="384" y="428">TODAY</text>
        </svg>

        <motion.div
          className="hv-card hv-card--tr"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <div className="hv-card__icon">
            <Icon name={heritage.icon} size={18} />
          </div>
          <div>
            <strong>{heritage.value}</strong>
            <span>{heritage.label}</span>
          </div>
        </motion.div>

        <motion.div
          className="hv-card hv-card--bl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6 }}
        >
          <div className="hv-card__icon">
            <Icon name={projects.icon} size={18} />
          </div>
          <div>
            <strong>{projects.value}</strong>
            <span>{projects.label}</span>
          </div>
        </motion.div>

        <div className="heritage-visual__status">
          <span className="heritage-visual__dot" />
          FAMILY-OWNED · ONE ACCOUNTABLE TEAM
        </div>
      </div>
    </motion.div>
  );
}
