"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/lib/content";

const HeroField = dynamic(() => import("./hero-field"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  // One orchestrated page-load sequence, then the page stays still.
  const step = (i: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.3 : 0.9,
      delay: reduced ? 0 : 0.15 + i * 0.09,
      ease: EASE,
    },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 pb-20 sm:px-10 lg:px-16"
    >
      {/* Field */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="grid-field absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-full">
          <HeroField />
        </div>
        {/* Legibility wash behind the type, and a dissolve into the page. */}
        <div className="from-void/95 via-void/50 absolute inset-0 bg-gradient-to-r to-transparent" />
        <div className="from-void absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <motion.p {...step(0)} className="eyebrow flex items-center gap-2.5">
          <span className="bg-signal animate-pulse-dot size-1.5" aria-hidden />
          {profile.role}
        </motion.p>

        <h1 className="display-tight text-bright mt-7 text-[clamp(2.6rem,10.5vw,7.5rem)] leading-[0.86]">
          <motion.span {...step(1)} className="block">
            Mason
          </motion.span>
          <motion.span {...step(2)} className="block">
            Keresty
          </motion.span>
        </h1>

        <motion.div
          initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
          animate={reduced ? { opacity: 1 } : { scaleX: 1 }}
          transition={{ duration: reduced ? 0.3 : 1.2, delay: 0.5, ease: EASE }}
          className="via-signal/60 mt-9 h-px max-w-md origin-left bg-gradient-to-r from-transparent to-transparent"
          aria-hidden
        />

        <motion.p
          {...step(4)}
          className="text-mid mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-pretty sm:text-lg"
        >
          {profile.thesis}
        </motion.p>

        <motion.div
          {...step(5)}
          className="text-dim mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-xs"
        >
          <span>{profile.location}</span>
          <span className="bg-rule-lit h-3 w-px" aria-hidden />
          <span className="text-signal/70">{profile.region}</span>
          <span className="bg-rule-lit h-3 w-px" aria-hidden />
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-bright transition-colors duration-200"
          >
            {profile.email}
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="text-dim hover:text-signal absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.625rem] tracking-[0.2em] uppercase transition-colors sm:flex"
      >
        Selected work
        <span className="bg-rule-lit relative h-10 w-px overflow-hidden">
          <span className="bg-signal animate-sweep absolute inset-x-0 h-4" />
        </span>
      </motion.a>
    </section>
  );
}
