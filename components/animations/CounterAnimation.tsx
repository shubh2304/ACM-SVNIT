"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface CounterAnimationProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
}

export default function CounterAnimation({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  label,
}: CounterAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !countRef.current) return;
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (countRef.current) countRef.current.textContent = String(end);
      return;
    }

    const startTime = performance.now();
    const startValue = 0;

    function animate(currentTime: number) {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      const current = Math.round(startValue + (end - startValue) * eased);

      if (countRef.current) {
        countRef.current.textContent = String(current);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="font-syne font-black text-4xl md:text-5xl text-text-primary mb-2">
        <span className="gradient-text">{prefix}</span>
        <span ref={countRef}>0</span>
        <span className="gradient-text">{suffix}</span>
      </div>
      <div className="text-text-muted text-sm font-medium">{label}</div>
    </motion.div>
  );
}
