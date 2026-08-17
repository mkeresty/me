"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/lib/content";
import { asset } from "@/lib/paths";

/**
 * Stays out of the way through the hero, then holds the name and a
 * résumé link within reach for the rest of the page.
 */
export function TopBar() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 320, 460], [0, 0, 1]);
  const pointerEvents = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));

  return (
    <motion.header
      style={{ opacity, pointerEvents }}
      className="border-rule bg-void/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3 sm:px-10 lg:px-16">
        <a
          href="#top"
          className="display-tight text-text hover:text-signal text-sm transition-colors"
        >
          Mason Keresty
        </a>

        <nav className="flex items-center gap-5 font-mono text-[0.6875rem] tracking-[0.1em] uppercase sm:gap-7">
          <a href="#work" className="text-dim hover:text-text hidden transition-colors sm:inline">
            Work
          </a>
          <a href="#plan" className="text-dim hover:text-text hidden transition-colors sm:inline">
            Experience
          </a>
          <a
            href={asset(profile.resume)}
            target="_blank"
            rel="noopener noreferrer"
            className="border-rule-lit text-text hover:border-signal hover:text-signal border px-3 py-1.5 transition-colors"
          >
            Résumé
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
