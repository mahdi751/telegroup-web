import { motion } from "framer-motion";
import "./LiveMonitorVisual.css";

interface LiveMonitorVisualProps {
  videoSrc: string;
  label?: string;
}

export default function LiveMonitorVisual({
  videoSrc,
  label = "LIVE · ON SITE",
}: LiveMonitorVisualProps) {
  return (
    <motion.div
      className="live-monitor"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      aria-hidden="true"
    >
      <div className="live-monitor__frame">
        <video className="live-monitor__video" autoPlay muted loop playsInline>
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="live-monitor__scan" />

        <div className="live-monitor__live">
          <span className="live-monitor__dot" /> {label}
        </div>
      </div>
    </motion.div>
  );
}
