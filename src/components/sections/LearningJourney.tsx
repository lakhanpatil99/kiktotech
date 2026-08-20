"use client";

import { motion } from "framer-motion";
import { ClipboardList, Rocket, GraduationCap, Award, type LucideIcon } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui";
import { easePremium } from "@/lib/motion";

const steps: { Icon: LucideIcon; title: string; desc: string; week: string }[] = [
  { Icon: ClipboardList, title: "Register & onboard", desc: "Pick your domain, complete a quick registration, and meet your cohort.", week: "Week 1" },
  { Icon: Rocket, title: "Build with mentors", desc: "Work through guided, project-first learning with industry mentorship.", week: "Weeks 2–4" },
  { Icon: GraduationCap, title: "Ship your project", desc: "Complete a real project that demonstrates job-ready skills.", week: "Week 5" },
  { Icon: Award, title: "Get certified", desc: "Earn a verifiable completion certificate you can share with employers.", week: "Finish" },
];

export function LearningJourney() {
  return (
    <Section className="border-y border-line bg-ink-800/30">
      <Container>
        <SectionHeading eyebrow="How it works" title="Your 5-week learning journey" description="A clear path from sign-up to a verifiable certificate." />

        <div className="relative mt-16">
          {/* connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:block" aria-hidden />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map(({ Icon, title, desc, week }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: easePremium }}
                className="relative"
              >
                <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/40 bg-ink-800 text-accent shadow-glow lg:mx-0">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {i + 1}
                  </span>
                </div>
                <div className="mt-5 text-center lg:text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">{week}</span>
                  <h3 className="mt-1 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
