"use client";

import { Users } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { contentService } from "@/services";
import { Container, Section, SectionHeading } from "@/components/ui";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { AsyncBoundary } from "@/components/feedback/AsyncBoundary";
import { EmptyState } from "@/components/feedback/states";
import { TeamGrid } from "@/components/team/TeamGrid";

export function TeamSection({ limit }: { limit?: number }) {
  const { data, status, error, reload } = useAsync(() => contentService.getTeam(), []);
  const members = limit ? (data ?? []).slice(0, limit) : data ?? [];

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="People"
          title="Meet the team"
          description="The students and mentors building Kick To Tech. Tap any profile to learn more."
        />
        <div className="mt-14">
          <AsyncBoundary
            status={status}
            error={error}
            onRetry={reload}
            loading={
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            }
            empty={<EmptyState title="Team coming soon" icon={<Users className="h-7 w-7" />} />}
          >
            <TeamGrid members={members} />
          </AsyncBoundary>
        </div>
      </Container>
    </Section>
  );
}
