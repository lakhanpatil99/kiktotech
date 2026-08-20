import type { Variants, Transition } from "framer-motion";

/** Shared premium easing + durations (mirror CSS tokens). */
export const easePremium: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transitions = {
  fast: { duration: 0.16, ease: easePremium },
  base: { duration: 0.32, ease: easePremium },
  slow: { duration: 0.62, ease: easePremium },
} satisfies Record<string, Transition>;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: transitions.slow },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transitions.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: transitions.slow },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: transitions.slow },
};

/** Parent container that staggers children. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});
