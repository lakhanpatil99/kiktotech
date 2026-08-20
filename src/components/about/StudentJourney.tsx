"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, GraduationCap, Hammer, Compass, TrendingUp, type LucideIcon } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { easePremium } from "@/lib/motion";

const stages: { n: string; label: string; desc: string; Icon: LucideIcon }[] = [
  { n: "01", label: "Discover", desc: "Find something worth learning.", Icon: Search },
  { n: "02", label: "Learn", desc: "Build the fundamentals.", Icon: GraduationCap },
  { n: "03", label: "Build", desc: "Turn knowledge into projects.", Icon: Hammer },
  { n: "04", label: "Experience", desc: "Get exposure through practical environments.", Icon: Compass },
  { n: "05", label: "Grow", desc: "Develop confidence, connections, and direction.", Icon: TrendingUp },
];

export function StudentJourney() {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 75%"] });
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  return (
    <Section className="!py-16 sm:!py-20">
      <Container>
        <SectionHeading
          eyebrow="The student journey"
          title="From curiosity to capability."
          description="Growth isn't a single leap. It's a series of steps — each one building on the last."
        />

        <div ref={ref} className="relative mt-12 sm:mt-14">
          {/* MOBILE — vertical rail of cards */}
          <div className="md:hidden">
            <div className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-px bg-line" aria-hidden />
            <motion.div className="absolute left-[27px] top-2 w-px bg-gradient-to-b from-accent to-electric" style={{ height: railHeight }} aria-hidden />
            <div className="space-y-4">
              {stages.map((s) => {
                const Icon = s.Icon;
                return (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: easePremium }}
                    className="relative flex items-start gap-5"
                  >
                    <span className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-accent/40 bg-ink-800 text-accent">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="flex-1 rounded-2xl border border-line bg-surface p-4">
                      <span className="font-mono text-xs text-accent/70">{s.n}</span>
                      <h3 className="text-lg font-semibold">{s.label}</h3>
                      <p className="mt-0.5 text-sm text-muted">{s.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* DESKTOP — connected cards */}
          <div className="hidden md:block">
            {/* connecting line through icon centres (col centres at 10%…90%) */}
            <div className="absolute left-[10%] right-[10%] top-9 h-px bg-line" aria-hidden />
            <motion.div className="absolute left-[10%] top-9 h-px bg-gradient-to-r from-accent to-electric shadow-glow" style={{ width: lineWidth }} aria-hidden />

            <div className="grid grid-cols-5 gap-4">
              {stages.map((s, i) => {
                const Icon = s.Icon;
                return (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: easePremium }}
                    className="group flex flex-col items-center"
                  >
                    <span className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-accent/40 bg-ink-800 text-accent shadow-glow transition-transform duration-300 group-hover:scale-105">
                      {!reduced && (
                        <motion.span
                          className="absolute inset-0 rounded-2xl border border-accent/40"
                          animate={{ scale: [1, 1.25], opacity: [0.45, 0] }}
                          transition={{ duration: 2.6, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                      <Icon className="h-7 w-7" />
                    </span>
                    <div className="mt-5 w-full rounded-2xl border border-line bg-surface p-5 text-center transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/40">
                      <span className="font-mono text-xs text-accent/70">{s.n}</span>
                      <h3 className="mt-1 text-lg font-semibold">{s.label}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
