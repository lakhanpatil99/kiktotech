import type { Metadata } from "next";
import { Building2, GraduationCap, Users2, Rocket } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section, SectionHeading } from "@/components/ui";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { CollaborateForm } from "@/components/forms/CollaborateForm";

export const metadata: Metadata = {
  title: "Collaborate",
  description: "Partner with Kick To Tech — companies, colleges, and communities working together to build student talent.",
};

const types = [
  { Icon: Building2, title: "Companies", desc: "Hire filtered student talent, sponsor events, and run hiring drives." },
  { Icon: GraduationCap, title: "Colleges", desc: "MoU-based workshops, hackathons, and placement support for your students." },
  { Icon: Users2, title: "Communities", desc: "Co-host events and cross-pollinate audiences and expertise." },
  { Icon: Rocket, title: "Organizations", desc: "Structured, outcome-focused engagement tailored to your goals." },
];

export default function CollaboratePage() {
  return (
    <>
      <PageHeader eyebrow="Partnerships" title="Let's build together" description="A professional collaboration track for companies, colleges, communities, and organizations." />

      <Section className="pt-8">
        <Container>
          <SectionHeading eyebrow="Who we work with" title="Ways to collaborate" />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {types.map(({ Icon, title, desc }) => (
              <StaggerItem key={title} className="h-full">
                <div className="h-full rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40">
                  <Icon className="mb-5 h-8 w-8 text-accent" />
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mx-auto mt-16 max-w-2xl">
            <SectionHeading eyebrow="Get started" title="Tell us about your organization" />
            <div className="mt-10">
              <CollaborateForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
