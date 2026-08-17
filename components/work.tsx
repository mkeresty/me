import { projects } from "@/lib/content";
import { Section } from "./section";
import { Reveal } from "./reveal";

export function Work() {
  return (
    <Section
      id="work"
      label="Selected work"
      title="Five things I built and still stand behind"
      meta={`${projects.length} builds · 2024—2026`}
      intro="Most of this runs inside a compliance boundary, so there are no live links. What follows is how each system actually works."
    >
      <div className="border-rule border-t">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.04}>
            <article className="group border-rule relative border-b py-10 md:py-14">
              {/* Left edge marker — the only thing that moves on hover.
                  It sits out in the gutter so the content stays aligned
                  with every other section rather than indenting on hover. */}
              <span
                className="bg-signal absolute top-0 -left-4 h-full w-px origin-top scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 sm:-left-7"
                aria-hidden
              />

              <div className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-12">
                {/* Spec column */}
                <div className="flex flex-col gap-4">
                  <div className="font-mono text-xs leading-relaxed">
                    <div className="text-text">{p.org}</div>
                    <div className="text-dim">{p.period}</div>
                  </div>
                  <div className="text-signal/70 font-mono text-[0.6875rem] tracking-wide">
                    {p.kind}
                  </div>
                  <ul className="mt-1 hidden flex-wrap gap-x-3 gap-y-1.5 lg:flex lg:flex-col lg:gap-1">
                    {p.stack.map((s) => (
                      <li key={s} className="text-dim font-mono text-[0.6875rem]">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Body column */}
                <div>
                  <h3 className="display-tight text-bright text-[clamp(1.25rem,2.6vw,1.875rem)] leading-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                    {p.title}
                  </h3>

                  <p className="text-mid mt-5 max-w-2xl leading-relaxed text-pretty">
                    {p.summary}
                  </p>

                  <ul className="border-rule mt-7 max-w-3xl space-y-4 border-l pl-6">
                    {p.details.map((d) => (
                      <li
                        key={d}
                        className="text-text/85 relative text-[0.9375rem] leading-relaxed text-pretty"
                      >
                        <span
                          className="bg-signal/50 absolute top-[0.6em] -left-6 h-px w-3"
                          aria-hidden
                        />
                        {d}
                      </li>
                    ))}
                  </ul>

                  {/* Stack folds under the body on narrow screens. */}
                  <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-2 lg:hidden">
                    {p.stack.map((s) => (
                      <li
                        key={s}
                        className="border-rule text-dim border px-2 py-1 font-mono text-[0.6875rem]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
