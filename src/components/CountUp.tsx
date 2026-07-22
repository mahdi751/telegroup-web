import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

type CountUpProps = {
  value: string;
  duration?: number;
};

function parseValue(value: string) {
  const match = value.match(/[\d,]+/);
  if (!match) return { prefix: "", number: 0, suffix: "", hasNumber: false };
  const numberStr = match[0];
  const start = match.index ?? 0;
  return {
    prefix: value.slice(0, start),
    number: parseInt(numberStr.replace(/,/g, ""), 10),
    suffix: value.slice(start + numberStr.length),
    hasNumber: true,
  };
}

export default function CountUp({ value, duration = 1.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const { prefix, number, suffix, hasNumber } = parseValue(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!hasNumber) return;
    if (!inView) {
      setDisplay(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(number);
      return;
    }
    const controls = animate(0, number, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, number, hasNumber, duration]);

  if (!hasNumber) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
