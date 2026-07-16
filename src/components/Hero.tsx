"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <motion.div
        className="max-w-3xl"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={viewportOnce}
        // delayChildren syncs the stagger start with the IntroOverlay
        // wipe clearing (~0.9s), so the hero animates in right as it's
        // revealed rather than while still hidden behind the overlay.
        variants={staggerContainer(0.12, 0.9)}
      >
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
        </motion.div>
      </motion.div>
    </section>
  );
}
