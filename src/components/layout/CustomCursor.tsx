"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const spring = { damping: 28, stiffness: 380, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduce = () => setReduceMotion(mqReduce.matches);
    syncReduce();
    mqReduce.addEventListener("change", syncReduce);

    const mq = window.matchMedia("(pointer: coarse)");
    const updateCoarse = () => setCoarse(mq.matches);
    updateCoarse();
    mq.addEventListener("change", updateCoarse);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      document.documentElement.style.setProperty(
        "--cursor-x",
        `${e.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--cursor-y",
        `${e.clientY}px`
      );
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.body.addEventListener("mouseleave", leave);
    document.body.addEventListener("mouseenter", enter);

    return () => {
      mqReduce.removeEventListener("change", syncReduce);
      mq.removeEventListener("change", updateCoarse);
      window.removeEventListener("mousemove", move);
      document.body.removeEventListener("mouseleave", leave);
      document.body.removeEventListener("mouseenter", enter);
    };
  }, [x, y]);

  if (coarse || reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x, y }}
      aria-hidden
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-transparent shadow-[0_0_24px_rgba(255,0,60,0.55),0_0_48px_rgba(255,138,0,0.25)] transition-opacity duration-200"
        style={{
          width: 36,
          height: 36,
          opacity: visible ? 1 : 0,
        }}
      />
    </motion.div>
  );
}
