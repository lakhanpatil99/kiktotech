import type { Metadata } from "next";
import { MessageCircle, Users, Rocket, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section, Card } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Join the Community",
  description: "Become part of Pune's student tech community — workshops, hackathons, mentorship, and opportunities.",
};

const benefits = [
  { Icon: Users, title: "A real network", desc: "Connect with 1000+ students, mentors, and industry professionals." },
  { Icon: Rocket, title: "Hands-on growth", desc: "Workshops, hackathons, and challenges that build genuine skills." },
  { Icon: MessageCircle, title: "Direct guidance", desc: "Mentorship, placement help, and internship pathways." },
];

export default function JoinPage() {
  return (
    <>
      <PageHeader eyebrow="Community" title="Join Kick To Tech" description="Learn, build, and grow alongside a vibrant community of student developers and creators in Pune.">
        <Button href={siteConfig.social.whatsapp} external size="lg">
          <MessageCircle className="h-4 w-4" /> Join our WhatsApp community <ArrowRight className="h-4 w-4" />
        </Button>
      </PageHeader>

      <Section className="pt-8">
        <Container>
          <StaggerGroup className="grid gap-6 md:grid-cols-3">
            {benefits.map(({ Icon, title, desc }) => (
              <StaggerItem key={title} className="h-full">
                <Card interactive className="h-full">
                  <Icon className="mb-5 h-8 w-8 text-accent" />
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>
    </>
  );
}
