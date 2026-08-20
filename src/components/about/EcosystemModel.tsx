"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, HeartHandshake, Rocket, type LucideIcon } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { easePremium } from "@/lib/motion";

const layers: { label: string; desc: string; Icon: LucideIcon; color: string }[] = [
  { label: "Students", desc: "Curious learners who want to grow beyond the classroom.", Icon: GraduationCap, color: "#22e3d6" },
  { label: "Learning experiences", desc: "Workshops, projects, and challenges that turn ideas into skills.", Icon: BookOpen, color: "#5ff0e6" },
  { label: "Mentors + industry", desc: "Guidance and real-world context from people who've done the work.", Icon: HeartHandshake, color: "#3b82f6" },
  { label: "Real opportunities", desc: "Exposure, internships, and confidence that open real doors.", Icon: Rocket, color: "#60a5fa" },
];

export function EcosystemModel() {
  const reduced = useReducedMotionSafe();

  return (
    <Section className="!py-16 sm:!py-20">
      <Container>
        <SectionHeading
          eyebrow="Operating model"
          title="How the ecosystem works."
          description="Value doesn't move in one direction. Students grow — then help the next ones grow too."
        />

        <div className="mx-auto mt-10 max-w-2xl">
          {/* rendered top → bottom, but light flows upward to show value returning */}
          {layers.map((l, i) => {
            const Icon = l.Icon;
            return (
              <Fragment key={l.label}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: easePremium }}
                  className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:border-accent/40"
                >
                  <span
                    className="pointer-events-none absolute -left-10 top-1/2 h-32 w-40 -translate-y-1/2 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: l.color }}
                    aria-hidden
                  />
                  <span
                    className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${l.color}1f`, color: l.color }}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="relative">
                    <h3 className="text-lg font-bold sm:text-xl">{l.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{l.desc}</p>
                  </div>
                  <span className="relative ml-auto font-mono text-xs text-muted/50">{`0${i + 1}`}</span>
                </motion.div>

                {/* connector with upward-flowing light */}
                {i < layers.length - 1 && (
                  <div className="relative mx-auto h-10 w-px">
                    <span className="absolute inset-0 bg-gradient-to-b from-line to-accent/40" />
                    {!reduced && (
                      <motion.span
                        className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-glow"
                        animate={{ top: ["100%", "0%"], opacity: [0, 1, 0] }}
                        transition={{ duration: 2.2, delay: i * 0.5, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
                      />
                    )}
                  </div>
                )}
              </Fragment>
            );
          })}

          <p className="mt-8 text-center text-sm text-muted">
            <span className="text-accent">Light flows upward</span> — the students we support today become the mentors and builders of tomorrow.
          </p>
        </div>
      </Container>
    </Section>
  );
}
