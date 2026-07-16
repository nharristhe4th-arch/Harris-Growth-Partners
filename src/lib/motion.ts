// Shared scroll-reveal variants for whileInView animations across the
// homepage. Kept to opacity/y only (translateY under the hood) so
// nothing here forces layout — cheap to animate on scroll.
import type { Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function staggerContainer(
  staggerChildren = 0.12,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

// Standard viewport trigger: fire once, a bit before the section is
// fully in view, so it doesn't feel late.
export const viewportOnce = { once: true, amount: 0.2 } as const;
