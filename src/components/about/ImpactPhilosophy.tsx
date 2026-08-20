"use client";

import { motion } from "framer-motion";
import { Container, Section, SectionHeading } from "@/components/ui";
import { easePremium } from "@/lib/motion";

const pillars = [
  { k: "Access", line: "Making opportunities easier to discover.", i: "01" },
  { k: "Exposure", line: "Giving students environments where they can experience real-world work.", i: "02" },
  { k: "Confidence", line: "Helping students move from \u201cI want to learn this\u201d to \u201cI can build this.\u201d", i: "03" },
];

export function ImpactPhilosophy() {
  return (
    <Section className="!py-16 sm:!py-20">
      <Container>
        <SectionHeading
          eyebrow="Impact"
          title="What impact actually means to us."
          description="We don't measure ourselves only in numbers. We measure it in what changes for a student."
        />

        <div className="mt-10 space-y-1">
          {pillars.map((p, idx) => (
            <motion.div
              key={p.k}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: easePremium }}
              className="group grid items-baseline gap-2 border-b border-line py-7 last:border-0 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-10"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-accent/60">{p.i}</span>
                <h3 className="text-3xl font-bold leading-none tracking-tight text-gradient sm:text-4xl">
                  {p.k}
                </h3>
              </div>
              <p className="text-pretty text-base leading-relaxed text-muted transition-colors duration-300 group-hover:text-primary-foreground/90 sm:text-lg">
                {p.line}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
