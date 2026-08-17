import type { ReactNode } from "react";
import { Reveal, RuleDraw } from "./reveal";

export function Section({
  id,
  label,
  title,
  meta,
  intro,
  children,
}: {
  id: string;
  label: string;
  title: string;
  meta?: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-24 sm:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <RuleDraw className="mb-10" />

        <Reveal>
          <header className="mb-14 md:mb-20">
            <div className="flex items-baseline justify-between gap-6">
              <span className="eyebrow flex items-center gap-2.5">
                <span className="bg-signal animate-pulse-dot size-1.5" aria-hidden />
                {label}
              </span>
              {meta && (
                <span className="text-dim font-mono text-[0.6875rem] tracking-wide">
                  {meta}
                </span>
              )}
            </div>

            <h2 className="display-tight text-bright mt-6 text-[clamp(1.75rem,4.5vw,3rem)] leading-[0.95]">
              {title}
            </h2>

            {intro && (
              <p className="text-mid mt-5 max-w-2xl text-base leading-relaxed text-balance">
                {intro}
              </p>
            )}
          </header>
        </Reveal>

        {children}
      </div>
    </section>
  );
}
