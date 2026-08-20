import Image from "next/image";
import { Linkedin } from "lucide-react";
import { Container, Section, Badge } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/config/site";

export function Founder() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-primary/20 to-transparent p-8 sm:p-12 lg:p-16">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-tr from-accent to-electric opacity-30 blur-2xl" />
                  <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white/10 shadow-lift sm:h-56 sm:w-56">
                    <Image
                      src="/team/mayur-patil.png"
                      alt="Mayur Patil, Founder of Kick To Tech"
                      fill
                      sizes="224px"
                      className="object-cover"
                      style={{ objectPosition: "center 20%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                  <Badge>MSME Registered</Badge>
                  <Badge tone="neutral">MoU with JSPM University</Badge>
                </div>
                <blockquote className="mt-6 border-l-2 border-accent pl-5 text-2xl font-bold italic leading-tight text-primary-foreground/90 sm:text-3xl">
                  &ldquo;{siteConfig.founderQuote}&rdquo;
                </blockquote>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-accent">{siteConfig.founder.name}</h3>
                  <p className="text-muted">{siteConfig.founder.role}</p>
                  <a
                    href={siteConfig.founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] px-5 py-2.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    <Linkedin className="h-4 w-4" /> Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
