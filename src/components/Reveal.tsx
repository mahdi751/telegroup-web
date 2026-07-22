import { motion, type Variants } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  id?: string;
  as?: "div" | "li" | "section" | "article";
};

const build = (delay: number, y: number): Variants => ({
  hidden: {
    opacity: 0,
    y,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
});

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  id,
  as = "div",
}: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      id={id}
      className={className}
      variants={build(delay, y)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-60px" }}
      variants={{
        hidden: { transition: { staggerChildren: gap * 0.5, staggerDirection: -1 } },
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
