"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { UserPlus, Users, Hammer, TrendingUp, type LucideIcon } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui";
import { easePremium } from "@/lib/motion";

const steps: { n: string; Icon: LucideIcon; title: string; desc: string }[] = [
  { n: "01", Icon: UserPlus, title: "Join", desc: "Create your profile and become part of the network in minutes." },
  { n: "02", Icon: Users, title: "Connect", desc: "Meet students, mentors, speakers, and collaborators who build like you." },
  { n: "03", Icon: Hammer, title: "Build", desc: "Join workshops, hackathons, projects, and challenges — learn by doing." },
  { n: "04", Icon: TrendingUp, title: "Grow", desc: "Turn community experience into skills, opportunities, and a career." },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Participation" title="One community. Many ways to grow." description="Four simple steps from joining to building a career." />

        <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          {/* track */}
          <div className="absolute left-6 top-2 h-[calc(100%-1rem)] w-px bg-line sm:left-8" aria-hidden />
          {/* animated progress line */}
          <motion.div
            className="absolute left-6 top-2 w-px bg-gradient-to-b from-accent to-electric sm:left-8"
            style={{ height: lineHeight }}
            aria-hidden
          />

          <div className="space-y-10">
            {steps.map(({ n, Icon, title, desc }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: easePremium }}
                className="relative flex items-start gap-6 pl-0 sm:gap-8"
              >
                <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-accent/40 bg-ink-800 text-accent shadow-glow sm:h-16 sm:w-16">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-accent/70">{n}</span>
                    <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
                  </div>
                  <p className="mt-2 max-w-lg leading-relaxed text-muted">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
