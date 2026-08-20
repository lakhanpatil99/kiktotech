"use client";

import { Container, Section, SectionHeading } from "@/components/ui";
import { StaggerGroup, StaggerItem } from "@/components/motion";

const beliefs = [
  { n: "01", title: "Practice beats theory", desc: "Learning becomes valuable the moment students can apply it to something real." },
  { n: "02", title: "Access creates opportunity", desc: "Good opportunities shouldn't depend only on who a student already happens to know." },
  { n: "03", title: "Community multiplies growth", desc: "People progress faster when they learn with — and from — others around them." },
  { n: "04", title: "Evidence matters more than participation", desc: "Projects and real experience prove far more than a record of showing up." },
];

export function BeliefSystem() {
  return (
    <Section className="border-y border-line bg-ink-800/30 !py-16 sm:!py-20">
      <Container>
        <SectionHeading
          align="left"
          eyebrow="Philosophy"
          title="What we believe."
          description="A small set of convictions that shape every decision we make."
          className="mx-0"
        />

        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2">
          {beliefs.map((b) => (
            <StaggerItem key={b.n} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-accent/40 hover:shadow-card sm:p-7">
                <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                <div className="relative flex items-center gap-3">
                  <span className="font-mono text-lg font-bold text-accent/60">{b.n}</span>
                  <span className="h-px w-8 bg-accent/40 transition-all duration-300 group-hover:w-12" />
                </div>
                <h3 className="relative mt-4 text-xl font-semibold leading-snug transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                  {b.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted">{b.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
