import { roles, type Op, type Role } from "@/lib/content";
import { Section } from "./section";
import { Reveal } from "./reveal";

const OP: Record<Op, { glyph: string; word: string; text: string; edge: string; tint: string }> = {
  add: {
    glyph: "+",
    word: "built",
    text: "text-signal",
    edge: "bg-signal",
    tint: "group-hover/row:bg-signal/[0.04]",
  },
  change: {
    glyph: "~",
    word: "changed",
    text: "text-amber",
    edge: "bg-amber",
    tint: "group-hover/row:bg-amber/[0.04]",
  },
  destroy: {
    glyph: "−",
    word: "removed",
    text: "text-rose",
    edge: "bg-rose",
    tint: "group-hover/row:bg-rose/[0.04]",
  },
};

function tally(role: Role) {
  const add = role.changes.filter((c) => c.op === "add").length;
  const change = role.changes.filter((c) => c.op === "change").length;
  const destroy = role.changes.filter((c) => c.op === "destroy").length;
  return { add, change, destroy };
}

export function Plan() {
  const total = roles.reduce((n, r) => n + r.changes.length, 0);

  return (
    <Section
      id="plan"
      label="Experience"
      title="Six years, as a plan"
      meta={`${roles.length} roles · ${total} changes`}
      intro="Every role, grouped by what it actually did to the system: what got built, what got changed, and what got taken away. The last one is usually the hardest to earn."
    >
      {/* Legend — makes the notation self-explaining. */}
      <Reveal>
        <ul className="text-dim mb-10 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[0.6875rem]">
          {(Object.keys(OP) as Op[]).map((op) => (
            <li key={op} className="flex items-center gap-2">
              <span className={`${OP[op].text} w-2 text-center`}>{OP[op].glyph}</span>
              <span className="tracking-[0.14em] uppercase">{OP[op].word}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="space-y-16 md:space-y-20">
        {roles.map((role, i) => {
          const t = tally(role);
          return (
            <Reveal key={`${role.org}-${role.title}`} delay={i * 0.03}>
              <div className="border-rule bg-surface/40 border">
                {/* Role header */}
                <header className="border-rule flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b px-5 py-4 sm:px-7">
                  <h3 className="font-mono text-sm">
                    <span className="text-bright">{role.org}</span>
                    <span className="text-dim mx-2">/</span>
                    <span className="text-text">{role.title}</span>
                  </h3>
                  <p className="text-dim font-mono text-xs">
                    {role.period}
                    <span className="mx-2 opacity-40">·</span>
                    {role.place}
                  </p>
                </header>

                {/* Changes */}
                <ul className="py-2">
                  {role.changes.map((c) => {
                    const style = OP[c.op];
                    return (
                      <li
                        key={c.resource}
                        className={`group/row relative flex gap-3 px-5 py-3 transition-colors duration-200 sm:gap-4 sm:px-7 ${style.tint}`}
                      >
                        <span
                          className={`${style.edge} absolute top-0 left-0 h-full w-px scale-y-0 opacity-70 transition-transform duration-300 group-hover/row:scale-y-100`}
                          aria-hidden
                        />
                        <span
                          className={`${style.text} mt-px shrink-0 font-mono text-sm leading-6 select-none`}
                          aria-hidden
                        >
                          {style.glyph}
                        </span>
                        <span className="sr-only">{style.word}:</span>
                        <div className="min-w-0">
                          <code className="text-text font-mono text-[0.8125rem] break-words">
                            {c.resource}
                          </code>
                          <p className="text-mid mt-1.5 max-w-3xl text-sm leading-relaxed text-pretty">
                            {c.detail}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* The payoff line. */}
                <footer className="border-rule text-dim border-t px-5 py-3.5 font-mono text-xs sm:px-7">
                  Plan:{" "}
                  <span className="text-signal">{t.add} to add</span>
                  {", "}
                  <span className="text-amber">{t.change} to change</span>
                  {", "}
                  <span className="text-rose">{t.destroy} to destroy</span>.
                </footer>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
