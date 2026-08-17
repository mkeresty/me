"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll-triggered entrance. Deliberately small — a short rise and a
 * fade, once, never replayed. Anything larger competes with the hero.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{
        duration: reduced ? 0.2 : 0.66,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/** A hairline that draws itself in from the left as it enters view. */
export function RuleDraw({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`bg-rule h-px origin-left ${className}`}
      initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
      whileInView={reduced ? { opacity: 1 } : { scaleX: 1 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: reduced ? 0.2 : 1.1, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
