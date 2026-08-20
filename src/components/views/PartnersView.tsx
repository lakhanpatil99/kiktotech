"use client";

import { Handshake } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { contentService } from "@/services";
import { Container, Section } from "@/components/ui";
import { Skeleton } from "@/components/ui/Skeleton";
import { AsyncBoundary } from "@/components/feedback/AsyncBoundary";
import { EmptyState } from "@/components/feedback/states";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { PartnerLogo } from "@/components/ui/PartnerLogo";

const categoryLabels: Record<string, string> = {
  community: "Community Partners",
  academic: "Academic Partners",
  industry: "Industry Partners",
};

export function PartnersView() {
  const { data, status, error, reload } = useAsync(() => contentService.getPartners(), []);

  const grouped = (data ?? []).reduce<Record<string, typeof data>>((acc, p) => {
    (acc[p.category] ??= []).push(p);
    return acc;
  }, {});

  return (
    <Section className="pt-8">
      <Container>
        <AsyncBoundary
          status={status}
          error={error}
          onRetry={reload}
          loading={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-3xl" />
              ))}
            </div>
          }
          empty={<EmptyState title="Partners coming soon" icon={<Handshake className="h-7 w-7" />} />}
        >
          <div className="space-y-14">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-accent">
                  {categoryLabels[category] ?? category}
                </h2>
                <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {items?.map((p) => (
                    <StaggerItem key={p.id}>
                      <PartnerLogo partner={p} className="h-32" />
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            ))}
          </div>
        </AsyncBoundary>
      </Container>
    </Section>
  );
}
