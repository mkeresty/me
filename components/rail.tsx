"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "plan", label: "Experience" },
  { id: "capabilities", label: "Capabilities" },
  { id: "contact", label: "Contact" },
] as const;

export function Rail() {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (n): n is HTMLElement => n !== null,
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Whichever tracked section currently covers the middle of the
        // viewport wins; ties go to the one further down the page.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="group fixed top-1/2 left-5 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col gap-4">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className="flex items-center gap-3 py-0.5"
              >
                <span
                  className={`h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? "bg-signal w-7" : "bg-rule-lit w-3.5 group-hover:w-5"
                  }`}
                  aria-hidden
                />
                {/* The tick alone carries the active state; labels stay
                    hidden until the rail is hovered so they never crowd
                    the headline beside them. */}
                <span
                  className={`font-mono text-[0.625rem] tracking-[0.16em] uppercase opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                    isActive ? "text-text" : "text-dim"
                  }`}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
