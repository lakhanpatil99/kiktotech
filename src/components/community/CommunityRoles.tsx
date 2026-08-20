"use client";

import { GraduationCap, HeartHandshake, Building2, Briefcase, ArrowUpRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui";
import { StaggerGroup, StaggerItem } from "@/components/motion";

const roles: { Icon: LucideIcon; title: string; desc: string; action: string; href: string; color: string }[] = [
  { Icon: GraduationCap, title: "Students", desc: "Learn, build, participate, and collaborate on real projects with peers.", action: "Join as a student", href: "/join", color: "#22e3d6" },
  { Icon: HeartHandshake, title: "Mentors", desc: "Share knowledge, guide projects, and support the next generation.", action: "Become a mentor", href: "/collaborate", color: "#3b82f6" },
  { Icon: Building2, title: "College Partners", desc: "Create opportunities for your students through structured collaboration.", action: "Partner your college", href: "/collaborate", color: "#5ff0e6" },
  { Icon: Briefcase, title: "Industry Partners", desc: "Connect with emerging talent and real-world student projects.", action: "Work with us", href: "/collaborate", color: "#60a5fa" },
];

export function CommunityRoles() {
  return (
    <Section className="border-y border-line bg-ink-800/30">
      <Container>
        <SectionHeading eyebrow="Belonging" title="Find your place here." description="However you show up, there's a way to contribute and grow." />
        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2">
          {roles.map(({ Icon, title, desc, action, href, color }) => (
            <StaggerItem key={title} className="h-full">
              <Link
                href={href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-8 transition-all duration-300 ease-premium hover:-translate-y-1.5 hover:border-accent/40"
              >
                <span
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundColor: color }}
                  aria-hidden
                />
                <span
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}1f`, color }}
                >
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{desc}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  {action}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
