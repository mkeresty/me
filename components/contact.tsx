import { profile } from "@/lib/content";
import { asset } from "@/lib/paths";
import { Reveal, RuleDraw } from "./reveal";

/** github.com/mkeresty — derived so the label can't drift from the href. */
const display = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const LINKS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false },
  { label: "GitHub", value: display(profile.github), href: profile.github, external: true },
  { label: "LinkedIn", value: display(profile.linkedin), href: profile.linkedin, external: true },
  { label: "Résumé", value: "PDF", href: asset(profile.resume), external: true },
];

export function Contact() {
  return (
    <footer id="contact" className="scroll-mt-24 px-6 pt-24 pb-16 sm:px-10 md:pt-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <RuleDraw className="mb-10" />

        <Reveal>
          <p className="eyebrow flex items-center gap-2.5">
            <span className="bg-signal animate-pulse-dot size-1.5" aria-hidden />
            Contact
          </p>

          <h2 className="display-tight text-bright mt-6 max-w-3xl text-[clamp(1.75rem,5vw,3.25rem)] leading-[0.98] text-balance">
            Building something that has to be right?
          </h2>

          <p className="text-mid mt-6 max-w-xl leading-relaxed text-pretty">
            I&rsquo;m drawn to work where correctness is checkable and someone has to prove
            it — AI systems with real evaluation, security platforms, regulated
            infrastructure. If that sounds like your problem, get in touch.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="border-rule mt-14 border-t">
            {LINKS.map((l) => (
              <li key={l.label} className="border-rule border-b">
                <a
                  href={l.href}
                  {...(l.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-baseline justify-between gap-6 py-5"
                >
                  <span className="display-tight text-text group-hover:text-signal text-lg transition-all duration-300 group-hover:translate-x-1 sm:text-xl">
                    {l.label}
                  </span>
                  <span className="text-dim group-hover:text-text truncate font-mono text-xs transition-colors duration-300">
                    {l.value}
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="text-dim mt-16 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.6875rem]">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="text-dim/70">
            Next.js · React Three Fiber · deployed to GitHub Pages
          </span>
        </div>
      </div>
    </footer>
  );
}
