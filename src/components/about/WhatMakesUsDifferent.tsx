"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui";
import { easePremium } from "@/lib/motion";

const contrasts = [
  { theme: "Learning", traditional: "Learn concepts.", ours: "Learn, apply, and build something real." },
  { theme: "Networking", traditional: "Meet people.", ours: "Build meaningful relationships through shared work." },
  { theme: "Certificates", traditional: "Prove participation.", ours: "Build evidence through practical experience." },
  { theme: "Career prep", traditional: "Prepare for opportunities.", ours: "Experience the environment before the opportunity." },
];

export function WhatMakesUsDifferent() {
  return (
    <Section className="border-y border-line bg-ink-800/30 !py-16 sm:!py-20">
      <Container>
        <SectionHeading
          eyebrow="The difference"
          title="Not another student platform."
          description="We're building an environment around what happens between learning and opportunity."
        />

        <div className="mx-auto mt-10 max-w-4xl space-y-3">
          {contrasts.map((c, i) => (
            <motion.div
              key={c.theme}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: easePremium }}
              className="group grid overflow-hidden rounded-2xl border border-line bg-ink-900/60 sm:grid-cols-[1fr_auto_1fr]"
            >
              {/* traditional */}
              <div className="flex flex-col justify-center p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted/70">Traditional · {c.theme}</p>
                <p className="mt-1.5 text-base text-muted line-through decoration-muted/30">{c.traditional}</p>
              </div>

              {/* connector */}
              <div className="flex items-center justify-center border-y border-line bg-ink-800/40 px-2 py-2 sm:border-x sm:border-y-0">
                <span className="flex h-8 w-8 rotate-90 items-center justify-center rounded-full border border-accent/40 bg-ink-900 text-accent transition-transform duration-300 group-hover:translate-x-0.5 sm:rotate-0">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>

              {/* ours */}
              <div className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-accent/10 to-transparent p-5 transition-colors duration-300 group-hover:from-accent/15 sm:p-6">
                <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                <p className="relative text-[11px] font-bold uppercase tracking-widest text-accent">Kick To Tech</p>
                <p className="relative mt-1.5 text-base font-semibold text-primary-foreground">{c.ours}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
