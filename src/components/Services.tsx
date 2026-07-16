"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TargetIcon, ListIcon, SignalIcon } from "./icons";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const services = [
  {
    icon: TargetIcon,
    title: "Market & ICP Research",
    description:
      "Before you spend a dollar on outreach, you need to know exactly who to target. I research your market and define the specific industries, business types, and customer profiles most likely to convert — so effort goes where it pays off.",
  },
  {
    icon: ListIcon,
    title: "Prospect List Building",
    description:
      "Verified decision-maker contacts — not scraped, outdated junk lists. Every prospect list is built and checked by hand, matched to the ICP we define together.",
  },
  {
    icon: SignalIcon,
    title: "Outreach Strategy & Systems",
    description:
      "Email and call scripts, contact cadences, and simple tracking systems built to actually get used — designed for real-world consistency, not complexity.",
  },
];

export function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          className="max-w-2xl"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
            What I do
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Three pieces, built to work together as one system.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
        >
          {services.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={fadeUp} className="h-full">
              {/* Hover lift lives on its own element so it doesn't fight
                  the scroll-reveal transition above for the same
                  transitioned properties. */}
              <div className="group h-full rounded-2xl border border-line bg-surface/70 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-black/30">
                <Icon className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-6 font-serif text-xl">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
