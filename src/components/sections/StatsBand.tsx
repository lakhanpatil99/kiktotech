"use client";

import { useAsync } from "@/hooks/useAsync";
import { contentService } from "@/services";
import { CountUp } from "@/components/motion";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { Container } from "@/components/ui";
import { Skeleton } from "@/components/ui/Skeleton";

export function StatsBand() {
  const { data, status } = useAsync(() => contentService.getStats(), []);

  return (
    <Container className="relative -mt-8 sm:-mt-12">
      <div className="glass-strong grid grid-cols-2 gap-6 rounded-3xl p-8 shadow-card md:grid-cols-4">
        {status !== "success" && !data
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2 text-center">
                <Skeleton className="mx-auto h-10 w-20" />
                <Skeleton className="mx-auto h-4 w-16" />
              </div>
            ))
          : null}
        {data && (
          <StaggerGroup className="contents">
            {data.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <div className="text-4xl font-extrabold text-gradient sm:text-5xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-sm font-medium text-muted">{s.label}</div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </Container>
  );
}
