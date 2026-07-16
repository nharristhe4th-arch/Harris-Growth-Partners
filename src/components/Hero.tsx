"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

function HeroContent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
      // delayChildren syncs the stagger start with the IntroOverlay
      // wipe clearing (~0.9s), so the hero animates in right as it's
      // revealed rather than while still hidden behind the overlay.
      variants={staggerContainer(0.12, 0.9)}
    >
      <div className="max-w-3xl">
        <motion.p
          variants={fadeUp}
          className="text-sm font-medium uppercase tracking-[0.2em] text-accent"
        >
          Business Development for Local Service Companies
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-5xl sm:leading-tight"
        >
          {siteConfig.tagline}.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
        >
          I help service businesses find their best customers — built from
          experience actually running one.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-block rounded-sm bg-accent px-6 py-3 text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg hover:shadow-accent/30 active:translate-y-0"
          >
            Book a Consultation
          </a>
          <a
            href="#process"
            className="text-sm font-medium text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            See how it works
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Tracks scroll progress through the pinned section: 0 when it first
  // sticks, 1 once it's about to release. Drives a subtle zoom-out/fade
  // as the next section scrolls up over it — the same pinned-scrub
  // technique Apple's product pages use, just restrained (opacity/scale
  // only, no imagery).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Skip the pin entirely for reduced-motion — scrolling through extra
  // empty space with nothing visibly changing would just feel broken.
  if (shouldReduceMotion) {
    return (
      <section id="top">
        <HeroContent />
      </section>
    );
  }

  return (
    <section id="top" ref={containerRef} className="relative h-[180vh]">
      <motion.div
        style={{ opacity, scale, y }}
        className="sticky top-0 h-screen overflow-hidden"
      >
        <HeroContent />
      </motion.div>
    </section>
  );
}
