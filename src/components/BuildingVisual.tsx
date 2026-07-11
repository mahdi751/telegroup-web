import { motion } from "framer-motion";
import "./BuildingVisual.css";

export default function BuildingVisual() {
  return (
    <motion.div
      className="building-visual"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      aria-hidden="true"
    >
      <div className="building-visual__frame">
        <svg viewBox="0 0 560 460" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bvFovGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--bv-gold-bright)" stopOpacity=".55" />
              <stop offset="100%" stopColor="var(--bv-gold-bright)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Building wireframe */}
          <path className="bv-wire" d="M120,400 L120,180 L330,120 L330,340 Z" />
          <path className="bv-wire" d="M330,120 L470,160 L470,380 L330,340" />
          <path className="bv-wire" d="M120,400 L330,340 M470,380 L330,340" />
          <path className="bv-wire bv-wire--thin" d="M120,255 L330,195 L470,235 M120,330 L330,270 L470,310" />
          <path className="bv-wire" d="M150,172 L330,120 L455,155 L455,140 L330,105 L150,157 Z" />
          <path className="bv-wire" d="M195,392 L195,332 L245,318 L245,378 Z" />
          <path className="bv-wire bv-wire--thin" d="M220,386 L220,326" />
          <path
            className="bv-wire bv-wire--thin"
            d="M145,270 L175,262 L175,300 L145,308 Z M205,254 L235,246 L235,284 L205,292 Z M265,238 L295,230 L295,268 L265,276 Z"
          />
          <path
            className="bv-wire bv-wire--thin"
            d="M145,196 L175,188 L175,226 L145,234 Z M205,180 L235,172 L235,210 L205,218 Z M265,164 L295,156 L295,194 L265,202 Z"
          />
          <path
            className="bv-wire bv-wire--thin"
            d="M355,200 L395,212 L395,248 L355,236 Z M415,218 L450,228 L450,262 L415,252 Z"
          />
          <path
            className="bv-wire bv-wire--thin"
            d="M355,275 L395,287 L395,323 L355,311 Z M415,293 L450,303 L450,337 L415,327 Z"
          />
          <path className="bv-wire bv-wire--thin" d="M60,412 L520,412" />

          <path className="bv-pulse-line" d="M120,400 L120,180 L330,120 L470,160 L470,380 L330,340 L120,400" />

          {/* Camera 1 : top-left corner */}
          <circle className="bv-ring bv-ring--1" cx="120" cy="180" r="10" />
          <g className="bv-device bv-device--cam1">
            <g transform="translate(104,162)">
              <path className="bv-fov bv-fov--1" d="M6,6 L70,-16 L70,30 Z" />
              <line x1="14" y1="16" x2="18" y2="20" className="bv-bracket" />
              <rect x="-2" y="-1" width="22" height="11" rx="2.5" className="bv-body" transform="rotate(-18 9 5)" />
              <circle cx="18" cy="0" r="3" className="bv-body" />
              <circle className="bv-rec" cx="1" cy="2" r="1.8" />
            </g>
          </g>
          <line className="bv-leader bv-leader--1" x1="96" y1="150" x2="60" y2="118" />
          <text className="bv-label bv-label--1" x="10" y="112">AI CAMERA — LIVE</text>

          {/* Camera 2 : top-right corner */}
          <circle className="bv-ring bv-ring--2" cx="470" cy="160" r="10" />
          <g className="bv-device bv-device--cam2">
            <g transform="translate(462,142) scale(-1,1)">
              <path className="bv-fov bv-fov--2" d="M6,6 L70,-16 L70,30 Z" />
              <line x1="14" y1="16" x2="18" y2="20" className="bv-bracket" />
              <rect x="-2" y="-1" width="22" height="11" rx="2.5" className="bv-body" transform="rotate(-18 9 5)" />
              <circle cx="18" cy="0" r="3" className="bv-body" />
              <circle className="bv-rec" cx="1" cy="2" r="1.8" />
            </g>
          </g>
          <line className="bv-leader bv-leader--1" x1="484" y1="132" x2="516" y2="104" />
          <text className="bv-label bv-label--1" x="452" y="96">AI CAMERA — LIVE</text>

          {/* Camera 3 : roof deck */}
          <circle className="bv-ring bv-ring--3" cx="330" cy="105" r="10" />
          <g className="bv-device bv-device--cam3">
            <g transform="translate(318,84)">
              <path className="bv-fov bv-fov--3" d="M6,10 L64,34 L48,64 Z" />
              <line x1="12" y1="14" x2="12" y2="21" className="bv-bracket" />
              <path d="M2,10 A10,10 0 0 1 22,10 Z" className="bv-body" />
              <rect x="0" y="-1" width="24" height="4" rx="2" className="bv-body" />
              <circle className="bv-rec" cx="12" cy="6" r="1.8" />
            </g>
          </g>
          <line className="bv-leader bv-leader--1" x1="340" y1="80" x2="352" y2="52" />
          <text className="bv-label bv-label--1" x="238" y="44">360° FACIAL RECOGNITION CAMERA</text>

          {/* Wi-Fi access point : roof */}
          <circle className="bv-ring bv-ring--5" cx="208" cy="132" r="10" />
          <g className="bv-device bv-device--wifi">
            <g transform="translate(196,112)">
              <path className="bv-wsig bv-wsig--1" d="M5,12 A9,9 0 0 1 19,12" />
              <path className="bv-wsig bv-wsig--2" d="M0,7 A15,15 0 0 1 24,7" />
              <path className="bv-wsig bv-wsig--3" d="M-5,2 A21,21 0 0 1 29,2" />
              <line x1="12" y1="24" x2="12" y2="32" className="bv-mast" />
              <ellipse cx="12" cy="20" rx="11" ry="4.5" className="bv-body" />
              <circle cx="12" cy="19" r="2" className="bv-body-dot" />
            </g>
          </g>
          <line className="bv-leader bv-leader--4" x1="194" y1="118" x2="146" y2="92" />
          <text className="bv-label bv-label--4" x="8" y="88">WI-FI ACCESS POINT</text>

          {/* Intercom : at the door */}
          <circle className="bv-ring bv-ring--4" cx="172" cy="352" r="12" />
          <g className="bv-device bv-device--intercom">
            <g transform="translate(156,326)">
              <rect x="0" y="0" width="30" height="52" rx="4" className="bv-body" />
              <rect x="5" y="6" width="20" height="24" rx="2" className="bv-screen" />
              <g className="bv-face-outline">
                <circle cx="15" cy="15" r="4.5" />
                <path d="M8.5,27 Q15,20 21.5,27" />
              </g>
              <line className="bv-scanline" x1="6" y1="8" x2="24" y2="8" />
              <g className="bv-face-ok">
                <circle cx="24" cy="9" r="4" className="bv-face-ok-circle" />
                <path d="M22.2,9 L23.5,10.4 L26,7.6" className="bv-face-ok-check" />
              </g>
              <line x1="7" y1="36" x2="23" y2="36" className="bv-grille" />
              <line x1="7" y1="39" x2="23" y2="39" className="bv-grille" />
              <circle cx="15" cy="46" r="2.6" className="bv-btn" />
            </g>
          </g>
          <line className="bv-leader bv-leader--2" x1="150" y1="380" x2="96" y2="404" />
          <text className="bv-label bv-label--2" x="6" y="418">FACIAL RECOGNITION INTERCOM</text>

          {/* Speaker 1 */}
          <g className="bv-device bv-device--spk1">
            <g transform="translate(388,252)">
              <circle className="bv-wave bv-wave--w1" cx="7" cy="7" r="10" />
              <circle className="bv-wave bv-wave--w2" cx="7" cy="7" r="10" />
              <circle cx="7" cy="7" r="7" className="bv-body" />
              <circle cx="7" cy="7" r="2.6" className="bv-btn" />
            </g>
          </g>

          {/* Speaker 2 */}
          <g className="bv-device bv-device--spk2">
            <g transform="translate(250,300)">
              <circle className="bv-wave bv-wave--w3" cx="7" cy="7" r="10" />
              <circle className="bv-wave bv-wave--w1" cx="7" cy="7" r="10" />
              <circle cx="7" cy="7" r="7" className="bv-body" />
              <circle cx="7" cy="7" r="2.6" className="bv-btn" />
            </g>
          </g>
          <line className="bv-leader bv-leader--3" x1="268" y1="316" x2="310" y2="392" />
          <text className="bv-label bv-label--3" x="288" y="406">INDOOR AUDIO — ARMED</text>
        </svg>

        <div className="building-visual__status">
          <span className="building-visual__dot" />
          SYSTEM ONLINE · MONITORING
        </div>
      </div>
    </motion.div>
  );
}
