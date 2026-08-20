import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of use for the Kick To Tech website and programs.",
};

const sections = [
  { h: "Acceptance of terms", p: "By accessing kicktotech.in you agree to these terms. If you do not agree, please discontinue use of the site." },
  { h: "Programs & internships", p: "Program details, domains, duration, and fees are described on the relevant pages. Enrollment is subject to availability and confirmation." },
  { h: "Payments", p: "Program fees are processed via a secure payment provider. Payment status is confirmed server-side; a successful checkout does not by itself guarantee enrollment until verified." },
  { h: "Certificates", p: "Completion certificates are issued at the organization's discretion and can be verified publicly via the certificate verification page." },
  { h: "Content & conduct", p: "Community members are expected to engage respectfully. We may remove content or access that violates community standards." },
  { h: "Contact", p: `Questions about these terms can be sent to ${siteConfig.contact.email}.` },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" description="Please review the terms that govern your use of Kick To Tech." />
      <Section className="pt-6">
        <Container className="max-w-3xl">
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.h} className="rounded-2xl border border-line bg-surface p-7">
                <h2 className="text-xl font-bold text-accent">{s.h}</h2>
                <p className="mt-3 leading-relaxed text-muted">{s.p}</p>
              </div>
            ))}
            <p className="text-sm text-muted">Last updated: {new Date().getFullYear()}. This summary is provided for information and is not legal advice.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
