"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export function AboutCTA() {
  const reduced = useReducedMotionSafe();

  return (
    <Section className="!py-16 sm:!py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-accent/20 bg-gradient-to-b from-ink-800 to-ink-900 px-6 py-16 text-center sm:px-12 sm:py-20">
            {/* converging pathway */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              {[8, 24, 40, 60, 76, 92].map((x, i) => (
                <line key={i} x1={x} y1="100" x2="50" y2="42" stroke="#22e3d6" strokeWidth="0.12" opacity="0.4" />
              ))}
              {!reduced &&
                [0, 1, 2, 3].map((i) => (
                  <motion.circle
                    key={i}
                    r="0.5"
                    fill="#7ff5ec"
                    initial={{ opacity: 0 }}
                    animate={{ cx: [8 + i * 28, 50], cy: [100, 42], opacity: [0, 1, 0] }}
                    transition={{ duration: 3.5, delay: i * 0.7, repeat: Infinity, ease: "easeIn" }}
                  />
                ))}
            </svg>

            <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-[110px]" aria-hidden />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
                There&apos;s still a lot to build.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted">
                And we&apos;re just getting started. Come build the bridge with us.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Button href="/" size="lg">Explore Kick To Tech <ArrowRight className="h-4 w-4" /></Button>
                <Button href="/join" variant="outline" size="lg">Join the Journey</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
