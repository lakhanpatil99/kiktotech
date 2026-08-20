"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ShieldCheck, Building2, Users, Rocket, type LucideIcon } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui";
import { easePremium } from "@/lib/motion";

/**
 * Verified milestones only — sourced from siteConfig.credentials, real stats,
 * and the real internship program. No fabricated dates or achievements.
 */
const milestones: { phase: string; title: string; desc: string; Icon: LucideIcon }[] = [
  { phase: "Origin", title: "A student community forms", desc: "Kick To Tech starts as a Pune student tech community built around practical, hands-on learning.", Icon: Sparkles },
  { phase: "Recognition", title: "MSME registered", desc: "The initiative is formally recognized as an MSME — a foundation to build on.", Icon: ShieldCheck },
  { phase: "Partnership", title: "MoU with JSPM University", desc: "A formal college partnership creates structured opportunities for students.", Icon: Building2 },
  { phase: "Community", title: "1000+ student network", desc: "The community grows into a 1000+ member network across workshops and events.", Icon: Users },
  { phase: "Programs", title: "Project-first internship", desc: "A 5-week internship launches across Python, Java, Cybersecurity, and Data Analytics.", Icon: Rocket },
];

export function AboutTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section className="border-y border-line bg-ink-800/30 !py-16 sm:!py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="mb-3 inline-block rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent">
              Our journey
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we&apos;re building it.</h2>
            <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted">
              Milestones that mark the steady, verifiable progress of the community.
            </p>
          </div>

          <div ref={ref} className="relative">
          <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-line sm:left-[23px]" aria-hidden />
          <motion.div
            className="absolute left-[19px] top-2 w-px bg-gradient-to-b from-accent to-electric shadow-glow sm:left-[23px]"
            style={{ height: lineHeight }}
            aria-hidden
          />

          <div className="space-y-5">
            {milestones.map((m, i) => {
              const Icon = m.Icon;
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: easePremium }}
                  className="relative flex items-start gap-5 sm:gap-6"
                >
                  <span className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-accent/40 bg-ink-800 text-accent sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40 sm:p-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">{m.phase}</span>
                    <h3 className="mt-1 text-lg font-bold sm:text-xl">{m.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted">{m.desc}</p>
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
