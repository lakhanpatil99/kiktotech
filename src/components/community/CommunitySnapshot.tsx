"use client";

import { Users, GraduationCap, Handshake, Building2, type LucideIcon } from "lucide-react";
import { CountUp } from "@/components/motion";
import { Container } from "@/components/ui";
import { StaggerGroup, StaggerItem } from "@/components/motion";

// Real figures preserved from the legacy site (no invented numbers).
const snapshot: { value: number; suffix: string; label: string; Icon: LucideIcon; color: string }[] = [
  { value: 1000, suffix: "+", label: "Community members", Icon: Users, color: "#22e3d6" },
  { value: 230, suffix: "+", label: "Students engaged", Icon: GraduationCap, color: "#5ff0e6" },
  { value: 4, suffix: "+", label: "Partner organizations", Icon: Handshake, color: "#3b82f6" },
  { value: 2, suffix: "+", label: "College MoUs", Icon: Building2, color: "#60a5fa" },
];

export function CommunitySnapshot() {
  return (
    <Container>
      <StaggerGroup className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {snapshot.map(({ value, suffix, label, Icon, color }) => (
          <StaggerItem key={label}>
            <div className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-accent/40 sm:p-6">
              {/* corner glow */}
              <span
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                style={{ backgroundColor: color }}
                aria-hidden
              />
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${color}1f`, color }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="mt-4 text-3xl font-extrabold tracking-tight text-gradient sm:text-4xl">
                <CountUp value={value} suffix={suffix} />
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-widest text-muted">{label}</div>
              <span className="mt-4 block h-px w-full bg-gradient-to-r from-accent/40 via-line to-transparent" />
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Container>
  );
}
