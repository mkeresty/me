"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/lib/content";
import { asset } from "@/lib/paths";
import { ThemeToggle } from "./theme";

/**
 * The bar itself — background, name, section links — only materialises
 * once you leave the hero. The résumé link and theme toggle stay
 * reachable the whole way down, including from the hero.
 */
export function TopBar() {
  const { scrollY } = useScroll();
  const chrome = useTransform(scrollY, [0, 320, 460], [0, 0, 1]);
  const chromeEvents = useTransform(chrome, (v) => (v > 0.5 ? "auto" : "none"));

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Background and hairline, faded in independently of the contents. */}
      <motion.div
        style={{ opacity: chrome }}
        className="border-rule bg-void/80 absolute inset-0 border-b backdrop-blur-md"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3 sm:px-10 lg:px-16">
        <motion.a
          href="#top"
          style={{ opacity: chrome, pointerEvents: chromeEvents }}
          className="display-tight text-text hover:text-signal text-sm transition-colors"
        >
          Mason Keresty
        </motion.a>

        <nav className="pointer-events-auto flex items-center gap-5 font-mono text-[0.6875rem] tracking-[0.1em] uppercase sm:gap-7">
          <motion.a
            href="#work"
            style={{ opacity: chrome, pointerEvents: chromeEvents }}
            className="text-dim hover:text-text hidden transition-colors sm:inline"
          >
            Work
          </motion.a>
          <motion.a
            href="#plan"
            style={{ opacity: chrome, pointerEvents: chromeEvents }}
            className="text-dim hover:text-text hidden transition-colors sm:inline"
          >
            Experience
          </motion.a>

          <a
            href={asset(profile.resume)}
            target="_blank"
            rel="noopener noreferrer"
            className="border-rule-lit text-text hover:border-signal hover:text-signal border px-3 py-1.5 transition-colors"
          >
            Résumé
          </a>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
