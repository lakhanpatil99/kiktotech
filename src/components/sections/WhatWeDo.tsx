import { Target, Building2, Briefcase } from "lucide-react";
import { Container, Section, SectionHeading, Card } from "@/components/ui";
import { StaggerGroup, StaggerItem } from "@/components/motion";

const pillars = [
  {
    Icon: Target,
    title: "Talent Development",
    desc: "Workshops, hackathons, and coding challenges that turn learning into real capability.",
  },
  {
    Icon: Building2,
    title: "College Partnerships",
    desc: "MoU-based, structured industry engagement built to last beyond a single event.",
  },
  {
    Icon: Briefcase,
    title: "Company Connect",
    desc: "Placement pipelines, sponsored events, and hiring drives with filtered student talent.",
  },
];

export function WhatWeDo() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Infrastructure between education and employability"
          description="We're building the connective tissue that helps students become industry-ready and helps industry find proven talent."
        />
        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map(({ Icon, title, desc }) => (
            <StaggerItem key={title}>
              <Card interactive className="h-full">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{desc}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
