import Link from "next/link";
import { GraduationCap, Building2, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { StaggerGroup, StaggerItem } from "@/components/motion";

const audiences = [
  {
    Icon: GraduationCap,
    title: "For Colleges",
    desc: "Partner with us for structured workshops, hackathons, and placement support. Build a lasting infrastructure for industry engagement.",
    href: "/collaborate",
    cta: "Partner With Us",
  },
  {
    Icon: Building2,
    title: "For Companies",
    desc: "Access skilled, filtered student talent through our execution network. Hire from a pool proven through hands-on challenges.",
    href: "/collaborate",
    cta: "Hire Talent",
  },
];

export function Audience() {
  return (
    <Section>
      <Container>
        <StaggerGroup className="grid gap-6 md:grid-cols-2">
          {audiences.map(({ Icon, title, desc, href, cta }) => (
            <StaggerItem key={title}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-12">
                <Icon className="absolute -right-4 -top-4 h-32 w-32 text-white/[0.03] transition-transform duration-500 group-hover:scale-110" />
                <div className="relative">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold sm:text-3xl">{title}</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-muted">{desc}</p>
                  <Link
                    href={href}
                    className="mt-8 inline-flex items-center gap-2 font-bold text-accent transition-transform duration-300 group-hover:translate-x-1"
                  >
                    {cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
