import { motion } from "framer-motion";
import Icon from "./Icon";

export default function HeroVisual() {
  return (
    <motion.div
      className="herovisual"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      aria-hidden="true"
    >
      <div className="herovisual__frame">
        <img
          src="/images/cctv-hero.jpg"
          alt=""
          className="herovisual__img"
          decoding="async"
        />
        <div className="herovisual__scan" />

        {/* Live badge */}
        <motion.div
          className="herovisual__live"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="herovisual__dot" /> LIVE · AI ANALYTICS
        </motion.div>

        {/* Detection boxes */}
        <motion.div
          className="herovisual__box herovisual__box--1"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <span className="herovisual__tag">MOTION DETECTED</span>
        </motion.div>
        <motion.div
          className="herovisual__box herovisual__box--2"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.25, duration: 0.5 }}
        >
          <span className="herovisual__tag herovisual__tag--gold">ACCESS · AUTHORIZED</span>
        </motion.div>

        {/* Floating detect card */}
        <motion.div
          className="herovisual__card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
        >
          <div className="herovisual__card-icon">
            <Icon name="eye" size={18} />
          </div>
          <div>
            <strong>Threat detected</strong>
            <span>Alert sent · 0.4s</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
