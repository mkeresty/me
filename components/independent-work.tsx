import { Section } from "./section";
import { Reveal } from "./reveal";

const independentProjects = [
  {
    title: "Editora.sh",
    period: "2026—Present",
    kind: "collaborative editor · developer tooling · product",
    summary:
      "Building a developer-focused collaborative Markdown workspace that combines a polished document editor with realtime multiplayer editing, portable Markdown, and an architecture designed for optional Git-backed publishing.",
    details: [
      "Built the product end to end with Next.js, React, strict TypeScript, Tailwind, Tiptap/ProseMirror, PostgreSQL, Drizzle, and Neon-backed authentication.",
      "Implemented realtime multi-user editing with Yjs, including authenticated document rooms, presence and remote cursors, reconnect behavior, persisted collaboration state, and two-browser convergence tests.",
      "Designed Markdown as the canonical portable representation so documents can be edited collaboratively in Editora without a repository, while remaining straightforward to export or later map to GitHub-backed workflows.",
      "Created a keyboard-first editing experience with a centralized shortcut registry, command palette, quick document switching, focus mode, Markdown source view, autosave status, and developer-oriented workspace navigation.",
    ],
    stack: ["Next.js", "TypeScript", "Tiptap", "Yjs", "PostgreSQL", "Drizzle", "Neon"],
  },
  {
    title: "Linagee Name Registrar",
    period: "2022—2025",
    kind: "protocol research · reverse engineering · product",
    summary:
      "Rediscovered and reverse-engineered a forgotten Ethereum name registrar deployed in August 2015, then helped turn the dormant contract into a usable naming ecosystem and operated the surrounding infrastructure for several years.",
    details: [
      "Built tooling to inspect and decompile contracts from Ethereum's earliest blocks, leading to the discovery of a registrar deployed only days after the network launched.",
      "Reverse-engineered the original immutable contract and built the infrastructure and developer tooling needed to make it usable again, including name resolution and integrations around the protocol.",
      "Took the project from an obscure historical contract to a live system used at meaningful scale, with hundreds of thousands of names registered after rediscovery.",
      "Maintained the ecosystem for several years as usage evolved, gaining end-to-end experience taking an independent technical discovery from research through productization and long-term operation.",
    ],
    stack: ["Ethereum", "Solidity", "TypeScript", "Smart contracts", "Protocol tooling"],
  },
  {
    title: "Stampverse",
    period: "Independent project",
    kind: "blockchain data · marketplace · explorer",
    summary:
      "Built a marketplace and explorer for Bitcoin-native digital assets, spanning the data and product layers needed to turn on-chain activity into a searchable, usable application.",
    details: [
      "Worked across blockchain data ingestion and normalization, asset discovery, ownership state, search, and marketplace-facing product flows.",
      "Built the project as an end-to-end product rather than a standalone protocol experiment, combining backend data infrastructure with a user-facing explorer and marketplace.",
    ],
    stack: ["Bitcoin", "TypeScript", "Indexing", "Marketplace", "Explorer"],
  },
] as const;

export function IndependentWork() {
  return (
    <Section
      id="independent"
      label="Independent work"
      title="Things I took from an idea to a real system"
      meta="research · product · ownership"
      intro="Projects I pursued outside my day job — useful mostly because they forced me to own the whole problem, from the first technical question through something people could actually use."
    >
      <div className="border-rule border-t">
        {independentProjects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.04}>
            <article className="border-rule border-b py-10 md:py-14">
              <div className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-12">
                <div className="flex flex-col gap-4">
                  <div className="font-mono text-xs leading-relaxed">
                    <div className="text-text">{project.period}</div>
                  </div>
                  <div className="text-signal/70 font-mono text-[0.6875rem] tracking-wide">
                    {project.kind}
                  </div>
                  <ul className="mt-1 hidden lg:flex lg:flex-col lg:gap-1">
                    {project.stack.map((item) => (
                      <li key={item} className="text-dim font-mono text-[0.6875rem]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="display-tight text-bright text-[clamp(1.25rem,2.6vw,1.875rem)] leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-mid mt-5 max-w-2xl leading-relaxed text-pretty">
                    {project.summary}
                  </p>
                  <ul className="border-rule mt-7 max-w-3xl space-y-4 border-l pl-6">
                    {project.details.map((detail) => (
                      <li key={detail} className="text-text/85 relative text-[0.9375rem] leading-relaxed text-pretty">
                        <span className="bg-signal/50 absolute top-[0.6em] -left-6 h-px w-3" aria-hidden />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-2 lg:hidden">
                    {project.stack.map((item) => (
                      <li key={item} className="border-rule text-dim border px-2 py-1 font-mono text-[0.6875rem]">
                        {item}
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
