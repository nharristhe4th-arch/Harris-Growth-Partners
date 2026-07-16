"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Problem() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          className="grid gap-12 md:grid-cols-2"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.15)}
        >
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl leading-snug tracking-tight sm:text-4xl"
          >
            Finding customers shouldn&apos;t be the hardest part of the job.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="space-y-6 text-lg leading-relaxed text-ink-soft"
          >
            <p>
              Running a service business is hard enough — scheduling crews,
              managing quality, keeping customers happy. But consistent lead
              generation is usually the piece that gets neglected, simply
              because most owners don&apos;t have the time, or a real system,
              to do it properly. That gap is where growth stalls.
            </p>
            <p>
              I know because I&apos;ve lived it. I founded and run{" "}
              <span className="font-medium text-ink">Squeegee Guys</span>, a
              window cleaning company — and built this agency around the
              outbound systems I had to build to keep my own pipeline full.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
