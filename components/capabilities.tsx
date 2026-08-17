import { capabilities, credentials } from "@/lib/content";
import { Section } from "./section";
import { Reveal } from "./reveal";

export function Capabilities() {
  const total = capabilities.reduce((n, c) => n + c.items.length, 0);

  return (
    <Section
      id="capabilities"
      label="Capabilities"
      title="What I reach for"
      meta={`${total} across ${capabilities.length} domains`}
      intro="Listed by what I have shipped with, not what I have read about."
    >
      <div className="border-rule border-t">
        {capabilities.map((c, i) => (
          <Reveal key={c.domain} delay={i * 0.03}>
            <div className="border-rule grid gap-4 border-b py-8 lg:grid-cols-[16rem_1fr] lg:gap-12">
              <div>
                <h3 className="display-tight text-bright text-base">{c.domain}</h3>
                <p className="text-dim mt-2 max-w-xs text-sm leading-relaxed text-pretty">
                  {c.lead}
                </p>
              </div>

              <ul className="flex flex-wrap items-baseline gap-x-1 gap-y-2 self-center">
                {c.items.map((item, j) => (
                  <li key={item} className="flex items-baseline">
                    <span className="text-text/80 hover:text-signal font-mono text-[0.8125rem] transition-colors duration-200">
                      {item}
                    </span>
                    {j < c.items.length - 1 && (
                      <span className="text-rule-lit mx-2 select-none" aria-hidden>
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Credentials */}
      <Reveal delay={0.08}>
        <div className="mt-16 grid gap-px sm:grid-cols-3">
          {credentials.map((c) => (
            <div key={c.label} className="border-rule bg-surface/40 border p-6">
              <p className="eyebrow">{c.label}</p>
              <p className="text-bright mt-4 font-mono text-sm leading-snug">{c.primary}</p>
              <p className="text-dim mt-2 text-sm leading-relaxed text-pretty">{c.secondary}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
