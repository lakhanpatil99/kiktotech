"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Code2,
  HeartHandshake,
  FolderGit2,
  CalendarDays,
  Building2,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface Stage {
  id: string;
  label: string;
  Icon: LucideIcon;
  color: string;
  desc: string;
}

const STAGES: Stage[] = [
  { id: "students", label: "Students", Icon: GraduationCap, color: "#22e3d6", desc: "It starts with curious students who want to grow beyond the classroom." },
  { id: "skills", label: "Skills", Icon: Code2, color: "#5ff0e6", desc: "Workshops and hands-on learning turn curiosity into real, practical skills." },
  { id: "mentors", label: "Mentors", Icon: HeartHandshake, color: "#22e3d6", desc: "Mentors and peers guide the journey, sharing knowledge instead of gatekeeping it." },
  { id: "projects", label: "Projects", Icon: FolderGit2, color: "#3b82f6", desc: "Skills get applied on real projects, hackathons, and community challenges." },
  { id: "events", label: "Events", Icon: CalendarDays, color: "#5ff0e6", desc: "Events and meetups create momentum and connect people across the network." },
  { id: "companies", label: "Companies", Icon: Building2, color: "#60a5fa", desc: "Industry and college partners open doors to real-world opportunities." },
  { id: "careers", label: "Careers", Icon: Rocket, color: "#22e3d6", desc: "The path leads to internships, opportunities, and career-ready confidence." },
];

export function CommunityFlow() {
  const reduced = useReducedMotionSafe();
  const isMobile = useIsMobile();
  const [active, setActive] = useState<number | null>(null);

  const current = active ?? 0;

  return (
    <Section className="relative overflow-hidden border-y border-line bg-ink-800/30">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[130px]" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow="The pathway"
          title="One network. Many paths."
          description="Every journey through Kick To Tech is connected — from a first workshop to a real career."
        />

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="flex flex-col items-stretch md:flex-row md:items-start">
            {STAGES.map((s, i) => {
              const on = active === i;
              const near = active !== null && Math.abs(active - i) === 1;
              const dim = active !== null && !on && !near;
              const Icon = s.Icon;
              return (
                <Fragment key={s.id}>
                  {/* stage node */}
                  <div className="flex flex-shrink-0 flex-row items-center gap-4 md:w-[76px] md:flex-col md:gap-3">
                    <motion.button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      animate={{ scale: on ? 1.12 : dim ? 0.94 : 1, opacity: dim ? 0.5 : 1 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border bg-ink-800 outline-none transition-colors"
                      style={{ borderColor: on ? s.color : "rgba(255,255,255,0.1)", color: s.color, boxShadow: on ? `0 0 22px ${s.color}55` : undefined }}
                      aria-label={s.label}
                    >
                      {!reduced && on && (
                        <motion.span
                          className="absolute inset-0 rounded-2xl border"
                          style={{ borderColor: s.color }}
                          animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                          transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                      <Icon className="h-7 w-7" />
                    </motion.button>
                    <span className={cn("text-sm font-bold transition-colors md:text-center md:text-xs", on ? "text-accent" : dim ? "text-muted" : "text-primary-foreground")}>
                      {s.label}
                    </span>
                  </div>

                  {/* connector */}
                  {i < STAGES.length - 1 && (
                    <div className="relative ml-[31px] h-8 w-px flex-shrink-0 md:ml-0 md:mt-8 md:h-px md:w-auto md:flex-1">
                      <span className="absolute inset-0 bg-gradient-to-b from-accent/50 to-electric/30 md:bg-gradient-to-r" />
                      {!reduced && (
                        <motion.span
                          className="absolute h-1.5 w-1.5 rounded-full bg-accent shadow-glow md:top-1/2 md:-translate-y-1/2"
                          style={isMobile ? { left: "50%", x: "-50%" } : { top: "50%" }}
                          animate={isMobile ? { top: ["0%", "100%"], opacity: [0, 1, 0] } : { left: ["0%", "100%"], opacity: [0, 1, 0] }}
                          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
                        />
                      )}
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>

          {/* description panel */}
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-auto mt-14 max-w-xl rounded-2xl border border-line bg-surface p-6 text-center"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-accent">{STAGES[current].label}</p>
            <p className="mt-2 text-pretty leading-relaxed text-primary-foreground/90">{STAGES[current].desc}</p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
