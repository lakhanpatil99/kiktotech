"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { Compass, BookOpen, Hammer, Users, Sparkles, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { easePremium } from "@/lib/motion";

const stages: { label: string; Icon: LucideIcon }[] = [
  { label: "Learn", Icon: BookOpen },
  { label: "Build", Icon: Hammer },
  { label: "Connect", Icon: Users },
  { label: "Experience", Icon: Compass },
  { label: "Opportunity", Icon: Sparkles },
];

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.09, ease: easePremium } }),
};

export function AboutHero() {
  const reduced = useReducedMotionSafe();
  const isMobile = useIsMobile();

  return (
    <section className="relative overflow-hidden pb-4 pt-16 sm:pt-20">
      {/* ambient */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[42rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/10 blur-[150px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:44px_44px]" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span custom={0} variants={reveal} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-accent">
            About Kick To Tech
          </motion.span>

          <motion.h1 custom={1} variants={reveal} initial="hidden" animate="show"
            className="mx-auto mt-6 max-w-[900px] text-balance text-[2.5rem] font-bold leading-[1.0] tracking-tight sm:text-[3.25rem] lg:text-[4.25rem]">
            Building the bridge between <span className="text-primary-foreground">potential</span> and{" "}
            <span className="text-gradient">opportunity.</span>
          </motion.h1>

          <motion.p custom={2} variants={reveal} initial="hidden" animate="show"
            className="mx-auto mt-6 max-w-[680px] text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Kick To Tech exists to make the path from learning to real-world opportunity clearer,
            more practical, and more accessible for students.
          </motion.p>
        </div>

        {/* PATHWAY — progression, not a network */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: easePremium }}
          className="relative mx-auto mt-12 max-w-3xl sm:mt-14"
        >
          <div className="flex flex-col items-stretch md:flex-row md:items-center">
            {stages.map((s, i) => {
              const Icon = s.Icon;
              return (
                <Fragment key={s.label}>
                  <div className="flex flex-shrink-0 flex-row items-center gap-4 md:w-[92px] md:flex-col md:gap-3">
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.12, ease: easePremium }}
                      className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-ink-800 text-accent sm:h-14 sm:w-14"
                    >
                      {!reduced && (
                        <motion.span
                          className="absolute inset-0 rounded-2xl border border-accent/40"
                          animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                        />
                      )}
                      <Icon className="h-6 w-6" />
                      <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                        {i + 1}
                      </span>
                    </motion.span>
                    <span className="text-sm font-bold">{s.label}</span>
                  </div>

                  {i < stages.length - 1 && (
                    <div className="relative ml-[31px] h-8 w-px flex-shrink-0 md:ml-0 md:mt-8 md:h-px md:w-auto md:flex-1">
                      <span className="absolute inset-0 bg-gradient-to-b from-accent/50 to-electric/25 md:bg-gradient-to-r" />
                      {!reduced && (
                        <motion.span
                          className="absolute h-1.5 w-1.5 rounded-full bg-accent shadow-glow md:top-1/2 md:-translate-y-1/2"
                          style={isMobile ? { left: "50%", x: "-50%" } : { top: "50%" }}
                          animate={isMobile ? { top: ["0%", "100%"], opacity: [0, 1, 0] } : { left: ["0%", "100%"], opacity: [0, 1, 0] }}
                          transition={{ duration: 2.4, delay: i * 0.5, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
                        />
                      )}
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
