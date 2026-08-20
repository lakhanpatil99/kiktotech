import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { TeamGrid } from "@/components/team/TeamGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { team } from "@/data/mock/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the students and mentors building Kick To Tech — the people behind Pune's student tech community.",
};

export default function TeamPage() {
  const featured = team.filter((m) => m.featured);
  const rest = team.filter((m) => !m.featured);

  return (
    <>
      {/* Compact hero (local to Team — shared PageHeader left untouched) */}
      <section className="relative overflow-hidden pb-2 pt-16 sm:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" aria-hidden />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <span className="inline-block rounded-full border border-line bg-surface px-3 py-1 text-[12px] font-bold uppercase tracking-[0.12em] text-accent">
              People
            </span>
            <h1 className="mt-4 text-balance text-[2.1rem] font-bold leading-[1.02] tracking-tight sm:text-[2.75rem] lg:text-[3.25rem]">
              The people behind Kick To Tech
            </h1>
            <p className="mt-4 max-w-[640px] text-pretty text-base leading-relaxed text-muted sm:text-lg">
              A student-led team of founders, leads, and research assistants building the bridge
              between education and employability.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <Container>
          {featured.length > 0 && (
            <div className="mb-16 sm:mb-20">
              <h2 className="mb-6 text-[12px] font-bold uppercase tracking-[0.12em] text-accent">Leadership</h2>
              <TeamGrid members={featured} tone="lead" />
            </div>
          )}
          <h2 className="mb-6 text-[12px] font-bold uppercase tracking-[0.12em] text-accent">Core team</h2>
          <TeamGrid members={rest} tone="core" />
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
