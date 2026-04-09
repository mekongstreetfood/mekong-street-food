"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const ringCount = 4;

export function SuccessBurst() {
  return (
    <div className="relative flex h-40 w-full items-center justify-center">
      {Array.from({ length: ringCount }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border-2 border-accent"
          initial={{ width: 48, height: 48, opacity: 0.85 }}
          animate={{
            width: 160 + i * 48,
            height: 160 + i * 48,
            opacity: 0,
          }}
          transition={{
            duration: 0.9,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 18 }}
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-secondary shadow-[0_0_40px_rgba(255,0,60,0.55)]"
      >
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.12, type: "spring", stiffness: 500, damping: 22 }}
        >
          <Check className="h-10 w-10 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>
    </div>
  );
}
