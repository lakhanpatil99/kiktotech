"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { easePremium } from "@/lib/motion";

const chapters = [
  {
    n: "01",
    label: "The gap",
    title: "Learning rarely meets real practice.",
    desc: "Students absorb concepts in classrooms but often struggle to find practical ways to apply them to real work.",
  },
  {
    n: "02",
    label: "The realization",
    title: "Education alone wasn't the missing piece.",
    desc: "What students needed just as much was exposure, guidance, practice, and access to real opportunities.",
  },
  {
    n: "03",
    label: "The beginning",
    title: "Kick To Tech connects learning with opportunity.",
    desc: "A student-focused initiative built around practical learning and meaningful connections.",
  },
];

export function OriginStory() {
  return (
    <Section className="!py-16 sm:!py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="mb-3 inline-block rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent">
            Why Kick To Tech
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Learning needs a bridge to reality.</h2>
        </Reveal>

        <div className="mt-10 border-t border-line">
          {chapters.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: easePremium }}
              className="grid items-center gap-3 border-b border-line py-7 sm:grid-cols-[3.5rem_minmax(0,15rem)_minmax(0,1fr)] sm:gap-8 sm:py-8"
            >
              <span className="font-mono text-2xl font-bold text-accent/40 sm:text-3xl">{c.n}</span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted">{c.label}</p>
                <h3 className="mt-1 text-lg font-semibold leading-snug sm:text-xl">{c.title}</h3>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
