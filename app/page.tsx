import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Plan } from "@/components/plan";
import { Capabilities } from "@/components/capabilities";
import { Contact } from "@/components/contact";
import { Rail } from "@/components/rail";
import { TopBar } from "@/components/topbar";

export default function Page() {
  return (
    <>
      <a
        href="#work"
        className="bg-signal text-void sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>

      <TopBar />
      <Rail />

      <main>
        <Hero />
        <Work />
        <Plan />
        <Capabilities />
      </main>

      <Contact />
    </>
  );
}
