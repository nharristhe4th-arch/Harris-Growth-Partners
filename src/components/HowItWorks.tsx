"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const steps = [
  {
    number: "01",
    title: "Business Intake & Goals",
    description:
      "We start with a working session on your business, current customers, and growth goals.",
  },
  {
    number: "02",
    title: "Market & ICP Research",
    description:
      "I research your market and define who your best-fit customers actually are.",
  },
  {
    number: "03",
    title: "Prospect List + Outreach Plan",
    description:
      "You get a verified prospect list and a complete outreach plan — scripts, cadence, tracking.",
  },
  {
    number: "04",
    title: "Delivered System, Ready to Run",
    description:
      "The system is yours to run — or I can help manage outreach on an ongoing basis.",
  },
];

export function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          className="max-w-2xl"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            A straightforward four-step process from first conversation to a
            working system.
          </p>
        </motion.div>

        {/* Steps animate in sequence (01 -> 02 -> 03 -> 04) via
            staggerChildren, reading as a guided walkthrough rather than
            four things appearing at once. */}
        <motion.ol
          className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.15)}
        >
          {steps.map((step) => (
            <motion.li
              key={step.number}
              variants={fadeUp}
              className="border-t border-ink/20 pt-5"
            >
              <span className="font-serif text-sm text-accent">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
