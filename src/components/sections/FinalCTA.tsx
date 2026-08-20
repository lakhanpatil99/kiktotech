import { Users, Handshake, GraduationCap } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCTA() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-accent/20 bg-gradient-to-br from-accent/15 via-electric/10 to-transparent px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
            <div className="relative">
              <h2 className="text-balance text-3xl font-bold sm:text-4xl md:text-5xl">
                Ready to get involved?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-muted">
                Join our community, partner with us, or invite us to your college to start building the future together.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/join" size="lg">
                  <Users className="h-4 w-4" /> Join Community
                </Button>
                <Button href="/collaborate" variant="outline" size="lg">
                  <Handshake className="h-4 w-4" /> Become a Partner
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  <GraduationCap className="h-4 w-4" /> Invite Us to Your College
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
