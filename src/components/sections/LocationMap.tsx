import { MapPin, Navigation } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/config/site";

// Real Kick To Tech location (Pune, Maharashtra).
const COORDS = { lat: 18.50358, lng: 73.874624 };
const EMBED_SRC = `https://maps.google.com/maps?q=${COORDS.lat},${COORDS.lng}&z=16&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${COORDS.lat},${COORDS.lng}`;

export function LocationMap() {
  return (
    <Section className="pt-4">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line bg-surface">
            {/* header strip */}
            <div className="flex flex-col gap-4 border-b border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <MapPin className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm text-muted">Find us in</p>
                  <p className="text-lg font-semibold">{siteConfig.contact.location}</p>
                  <p className="mt-0.5 text-sm text-muted">Reach out to invite us to your college or campus.</p>
                </div>
              </div>
              <Button href={DIRECTIONS_URL} external variant="outline" className="flex-shrink-0">
                <Navigation className="h-4 w-4" /> Get directions
              </Button>
            </div>

            {/* map */}
            <div className="relative aspect-[16/10] w-full sm:aspect-[21/8]">
              <iframe
                title="Kick To Tech location on Google Maps"
                src={EMBED_SRC}
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.2] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {/* subtle edge vignette so the light map blends into the dark UI */}
              <div className="pointer-events-none absolute inset-0 rounded-b-3xl shadow-[inset_0_0_60px_rgba(0,19,27,0.55)]" aria-hidden />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
