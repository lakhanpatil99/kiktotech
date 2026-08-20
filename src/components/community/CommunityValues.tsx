import { Container, Section } from "@/components/ui";
import { StaggerGroup, StaggerItem } from "@/components/motion";

const values = [
  { k: "01", title: "Build together", desc: "We share knowledge instead of gatekeeping it." },
  { k: "02", title: "Learn by doing", desc: "Real skills come from real practice, not passive theory." },
  { k: "03", title: "People first", desc: "Relationships matter as much as technology." },
  { k: "04", title: "Create opportunities", desc: "Everyone deserves a path to participate and grow." },
];

export function CommunityValues() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="inline-block rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
              Our code
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-[1.1] sm:text-4xl">
              What we <span className="text-gradient">believe in</span>
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">
              A small set of principles that shape how the community shows up for each other.
            </p>
          </div>

          <StaggerGroup className="divide-y divide-line border-t border-line">
            {values.map((v) => (
              <StaggerItem key={v.k}>
                <div className="group flex items-baseline gap-6 py-6 transition-colors">
                  <span className="font-mono text-sm text-accent/60">{v.k}</span>
                  <div>
                    <h3 className="text-xl font-bold transition-colors group-hover:text-accent sm:text-2xl">{v.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted">{v.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </Section>
  );
}
