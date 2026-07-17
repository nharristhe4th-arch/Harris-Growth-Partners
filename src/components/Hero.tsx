"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { PulseBeams, type BeamPath } from "@/components/ui/pulse-beams";

// Beam paths + gradient exactly as provided in the PulseBeams demo.
const heroBeams: BeamPath[] = [
  {
    path: "M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["0%", "0%", "200%"],
        x2: ["0%", "0%", "180%"],
        y1: ["80%", "0%", "0%"],
        y2: ["100%", "20%", "20%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 6.5, cy: 398.5, r: 6 },
      { cx: 269, cy: 220.5, r: 6 },
    ],
  },
  {
    path: "M568 200H841C846.523 200 851 195.523 851 190V40",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 851, cy: 34, r: 6.5 },
      { cx: 568, cy: 200, r: 6 },
    ],
  },
  {
    path: "M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 142, cy: 427, r: 6.5 },
      { cx: 425.5, cy: 274, r: 6 },
    ],
  },
  {
    path: "M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427",
    gradientConfig: {
      initial: { x1: "40%", x2: "50%", y1: "160%", y2: "180%" },
      animate: { x1: "0%", x2: "10%", y1: "-40%", y2: "-20%" },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 770, cy: 427, r: 6.5 },
      { cx: 493, cy: 274, r: 6 },
    ],
  },
  {
    path: "M380 168V17C380 11.4772 384.477 7 390 7H414",
    gradientConfig: {
      initial: { x1: "-40%", x2: "-10%", y1: "0%", y2: "20%" },
      animate: {
        x1: ["40%", "0%", "0%"],
        x2: ["10%", "0%", "0%"],
        y1: ["0%", "0%", "180%"],
        y2: ["20%", "20%", "200%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 420.5, cy: 6.5, r: 6 },
      { cx: 380, cy: 168, r: 6 },
    ],
  },
];

const heroGradientColors = {
  start: "#18CCFC",
  middle: "#6344F5",
  end: "#AE48FF",
};

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
        <PulseBeams beams={heroBeams} gradientColors={heroGradientColors} className="bg-slate-950">
          <HeroContent />
        </PulseBeams>
      </section>
    );
  }

  return (
    <section id="top" ref={containerRef} className="relative h-[180vh]">
      <motion.div
        style={{ opacity, scale, y }}
        className="sticky top-0 h-screen overflow-hidden"
      >
        <PulseBeams beams={heroBeams} gradientColors={heroGradientColors} className="bg-slate-950">
          <HeroContent />
        </PulseBeams>
      </motion.div>
    </section>
  );
}
