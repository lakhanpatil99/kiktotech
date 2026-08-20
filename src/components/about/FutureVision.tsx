"use client";

import { motion } from "framer-motion";
import { Container, Section, SectionHeading } from "@/components/ui";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { easePremium } from "@/lib/motion";

const horizons = [
  "Deeper, more practical learning experiences",
  "Stronger student–industry connections",
  "Broader access to mentorship",
  "More project-based, real-world exposure",
  "A scalable ecosystem for every student",
];

export function FutureVision() {
  const reduced = useReducedMotionSafe();

  return (
    <Section className="relative overflow-hidden border-y border-line !py-16 sm:!py-20">
      {/* cinematic horizon backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/10 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-64 w-[60rem] -translate-x-1/2 rounded-[100%] bg-accent/10 blur-[120px]" />
      </div>

      {/* receding pathway */}
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 w-full opacity-70" viewBox="0 0 100 60" preserveAspectRatio="xMidYMax slice" aria-hidden>
        {/* perspective grid lines converging to a vanishing point */}
        {[10, 25, 40, 60, 75, 90].map((x, i) => (
          <line key={i} x1={x} y1="60" x2="50" y2="14" stroke="#22e3d6" strokeWidth="0.15" opacity="0.35" />
        ))}
        {[20, 30, 42, 54].map((y, i) => (
          <line key={`h${i}`} x1="0" y1={y} x2="100" y2={y} stroke="#22e3d6" strokeWidth="0.1" opacity="0.18" />
        ))}
        {/* particles moving toward the horizon */}
        {!reduced &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              r="0.5"
              fill="#7ff5ec"
              initial={{ opacity: 0 }}
              animate={{ cx: [50 + (i - 1) * 20, 50], cy: [60, 15], opacity: [0, 1, 0] }}
              transition={{ duration: 4, delay: i * 1.2, repeat: Infinity, ease: "easeIn" }}
            />
          ))}
        <circle cx="50" cy="14" r="1" fill="#22e3d6" />
      </svg>

      <Container className="relative">
        <SectionHeading
          eyebrow="The road ahead"
          title="Where we're going."
          description="We're early — and that's the point. The most important work is still ahead of us."
        />

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="flex flex-wrap justify-center gap-3">
            {horizons.map((h, i) => (
              <motion.span
                key={h}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: easePremium }}
                className="rounded-full border border-accent/25 bg-ink-800/70 px-4 py-2 text-sm text-primary-foreground/90 backdrop-blur"
              >
                {h}
              </motion.span>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
