import Image from "next/image";
import { Linkedin, Quote } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/config/site";
import { team } from "@/data/mock/team";

export function FounderLetter() {
  const founder = team.find((m) => m.id === "mayur-patil");
  if (!founder) return null;

  return (
    <Section className="!py-16 sm:!py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          {/* portrait */}
          <Reveal>
            <div className="relative mx-auto max-w-xs">
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/20 to-electric/10 blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-line">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={founder.photo ?? "/brand/logo.png"}
                    alt={founder.name}
                    fill
                    sizes="340px"
                    className="object-cover"
                    style={{ objectPosition: founder.objectPosition }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* letter */}
          <Reveal>
            <span className="inline-block rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
              Why we started
            </span>
            <Quote className="mt-5 h-9 w-9 text-accent/40" />
            <p className="mt-3 text-balance text-2xl font-bold leading-snug sm:text-3xl">
              &ldquo;{siteConfig.founderQuote}&rdquo;
            </p>
            <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted">{founder.bio}</p>

            <div className="mt-7 flex items-center gap-4">
              <div>
                <p className="text-lg font-bold text-accent">{founder.name}</p>
                <p className="text-sm text-muted">{siteConfig.founder.role}</p>
              </div>
              {founder.linkedin && (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${founder.name} on LinkedIn`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A66C2] text-white transition-transform hover:-translate-y-0.5"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
