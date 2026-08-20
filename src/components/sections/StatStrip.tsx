"use client";

import { useAsync } from "@/hooks/useAsync";
import { contentService } from "@/services";
import { CountUp, StaggerGroup, StaggerItem } from "@/components/motion";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

/** Self-contained stats grid (no negative-margin overlap). Safe on any page. */
export function StatStrip({ className }: { className?: string }) {
  const { data, status } = useAsync(() => contentService.getStats(), []);

  return (
    <div className={cn("glass-strong grid grid-cols-2 gap-6 rounded-3xl p-8 shadow-card md:grid-cols-4", className)}>
      {status !== "success" || !data
        ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2 text-center">
              <Skeleton className="mx-auto h-10 w-20" />
              <Skeleton className="mx-auto h-4 w-16" />
            </div>
          ))
        : (
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
  );
}
