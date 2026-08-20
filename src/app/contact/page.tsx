import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { LocationMap } from "@/components/sections/LocationMap";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kick To Tech — for collaboration, college partnerships, or general questions.",
};

const details = [
  { Icon: Mail, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { Icon: Phone, label: "Phone", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}` },
  { Icon: MapPin, label: "Location", value: siteConfig.contact.location },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk" description="Whether you're a student, a college, or a company — we'd love to hear from you." />
      <Section className="pt-6">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              {details.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">{label}</p>
                    {href ? (
                      <a href={href} className="text-lg font-semibold transition-colors hover:text-accent">{value}</a>
                    ) : (
                      <p className="text-lg font-semibold">{value}</p>
                    )}
                  </div>
                </div>
              ))}
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="mb-4 text-sm text-muted">Follow along</p>
                <SocialLinks />
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </Section>
      <LocationMap />
    </>
  );
}
