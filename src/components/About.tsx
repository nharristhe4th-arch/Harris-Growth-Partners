"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          className="grid gap-12 rounded-2xl border border-line bg-surface/70 p-8 backdrop-blur-md sm:p-12 md:grid-cols-[1fr_2fr]"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.15)}
        >
          <motion.div variants={fadeUp}>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              About
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight">
              {siteConfig.founderName}
            </h2>
            <p className="mt-2 text-ink-soft">Founder, {siteConfig.name}</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="space-y-6 text-lg leading-relaxed text-ink-soft"
          >
            <p>
              I&apos;m a finance student at the College of Charleston and the
              founder of{" "}
              <span className="font-medium text-ink">Squeegee Guys</span>, a
              window cleaning company I built from the ground up.
            </p>
            <p>
              Running that business meant confronting a problem most service
              business owners know well: the work itself isn&apos;t the hard
              part — finding a steady stream of the right customers is.
              Solving that for my own company is what led me to build{" "}
              {siteConfig.name}: a way to bring the same market research and
              outbound systems I rely on to other owners facing the same
              problem.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
