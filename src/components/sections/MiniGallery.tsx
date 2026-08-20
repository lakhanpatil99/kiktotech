"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { contentService } from "@/services";
import { Container, Section, SectionHeading } from "@/components/ui";
import { Skeleton } from "@/components/ui/Skeleton";
import { AsyncBoundary } from "@/components/feedback/AsyncBoundary";
import { EmptyState } from "@/components/feedback/states";
import { StaggerGroup, StaggerItem } from "@/components/motion";

/** A compact, real-photo community strip that links to the full gallery. */
export function MiniGallery({ count = 6 }: { count?: number }) {
  const { data, status, error, reload } = useAsync(() => contentService.getGallery(), []);

  return (
    <Section className="pt-0">
      <Container>
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <SectionHeading align="left" eyebrow="In the room" title="Moments from the community" className="mx-0" />
          <Link href="/gallery" className="inline-flex flex-shrink-0 items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all">
            View full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10">
          <AsyncBoundary
            status={status}
            error={error}
            onRetry={reload}
            loading={
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {Array.from({ length: count }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[4/3]" />
                ))}
              </div>
            }
            empty={<EmptyState title="No photos yet" icon={<Images className="h-7 w-7" />} />}
          >
            <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {data?.slice(0, count).map((item) => (
                <StaggerItem key={item.id}>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width:640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-900/85 via-ink-900/10 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="text-xs font-semibold">{item.title}</span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </AsyncBoundary>
        </div>
      </Container>
    </Section>
  );
}
