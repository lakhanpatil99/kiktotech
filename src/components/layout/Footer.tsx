import Link from "next/link";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { footerNav, siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-900/60">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{siteConfig.tagline}.</p>
            <ul className="mt-5 space-y-2">
              {siteConfig.credentials.map((c) => (
                <li key={c} className="flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold">
                  <Check className="h-3.5 w-3.5 text-accent" /> {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary-foreground/60">Explore</h4>
            <ul className="space-y-2.5">
              {footerNav.explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary-foreground/60">Programs</h4>
            <ul className="space-y-2.5">
              {footerNav.programs.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary-foreground/60">Stay in touch</h4>
            <ul className="mb-5 space-y-2.5 text-sm text-muted">
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-accent">
                  <Mail className="h-4 w-4" /> {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {siteConfig.contact.location}
              </li>
            </ul>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm text-muted">© {new Date().getFullYear()} KICK To TECH Club, Pune. All rights reserved.</p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
