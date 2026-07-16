import { siteConfig } from "@/lib/site-config";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="max-w-3xl">
        {/* Delays start at ~900ms to sync with the IntroOverlay wipe
            clearing, so the hero staggers in right as it's revealed. */}
        <Reveal delay={900}>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Business Development for Local Service Companies
          </p>
        </Reveal>

        <Reveal delay={1000}>
          <h1 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-5xl sm:leading-tight">
            {siteConfig.tagline}.
          </h1>
        </Reveal>

        <Reveal delay={1100}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            I help service businesses find their best customers — built from
            experience actually running one.
          </p>
        </Reveal>

        <Reveal delay={1200}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-block rounded-sm bg-ink px-6 py-3 text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg hover:shadow-accent/20 active:translate-y-0"
            >
              Book a Consultation
            </a>
            <a
              href="#process"
              className="text-sm font-medium text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink"
            >
              See how it works
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
