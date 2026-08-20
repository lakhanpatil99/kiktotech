"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Clock, FileText, ArrowRight, ArrowUpRight, PenLine } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { contentService } from "@/services";
import { Container, Section, Badge } from "@/components/ui";
import { GenerativeCover } from "@/components/ui/GenerativeCover";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { AsyncBoundary } from "@/components/feedback/AsyncBoundary";
import { EmptyState } from "@/components/feedback/states";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { formatDate, cn } from "@/lib/utils";
import { easePremium } from "@/lib/motion";

export function BlogView() {
  const { data, status, error, reload } = useAsync(() => contentService.getBlogPosts(), []);
  const [active, setActive] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set((data ?? []).map((p) => p.category)))],
    [data],
  );
  const posts = (data ?? []).filter((p) => active === "All" || p.category === active);
  const [featured, ...rest] = posts;

  return (
    <Section className="pt-4">
      <Container>
        <AsyncBoundary
          status={status}
          error={error}
          onRetry={reload}
          loading={
            <div className="space-y-8">
              <CardSkeleton />
              <div className="grid gap-6 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
              </div>
            </div>
          }
          empty={<EmptyState title="No posts yet" icon={<FileText className="h-7 w-7" />} description="New articles are on the way." />}
        >
          {/* category filter */}
          {categories.length > 2 && (
            <div className="mb-10 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  aria-pressed={active === c}
                  className={cn(
                    "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    active === c
                      ? "border-accent text-accent"
                      : "border-line text-muted hover:border-accent/40 hover:text-primary-foreground",
                  )}
                >
                  {active === c && (
                    <motion.span
                      layoutId="blog-filter"
                      className="absolute inset-0 rounded-full bg-accent/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          )}

          {/* FEATURED — editorial split */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easePremium }}
            >
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-[2rem] border border-line bg-surface transition-all duration-300 hover:border-accent/40 hover:shadow-lift lg:grid-cols-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                  <GenerativeCover seed={featured.slug} src={featured.coverUrl || undefined} label={featured.title} aspect="h-full" sizes="(max-width:1024px) 100vw, 50vw" className="transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink-900/50 to-transparent lg:bg-gradient-to-r" />
                  <div className="absolute left-5 top-5 flex gap-2">
                    <Badge>Featured</Badge>
                    <Badge tone="neutral">{featured.category}</Badge>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <h2 className="text-2xl font-bold leading-tight transition-colors group-hover:text-accent sm:text-3xl lg:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-pretty leading-relaxed text-muted">{featured.excerpt}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
                    <span className="font-semibold text-primary-foreground/80">{featured.author}</span>
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.readingMinutes} min read</span>
                  </div>
                  <span className="mt-7 inline-flex items-center gap-2 font-semibold text-accent">
                    Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* MORE STORIES */}
          <div className="mt-14">
            {rest.length > 0 && (
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-muted">More stories</h3>
            )}
            <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <StaggerItem key={post.id} className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift"
                  >
                    <div className="relative overflow-hidden">
                      <GenerativeCover seed={post.slug} src={post.coverUrl || undefined} label={post.title} aspect="aspect-[16/10]" sizes="(max-width:768px) 100vw, 33vw" className="transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/70 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4 text-accent" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <Badge tone="neutral" className="w-fit">{post.category}</Badge>
                      <h3 className="mt-3 text-lg font-bold leading-snug transition-colors group-hover:text-accent">{post.title}</h3>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{post.excerpt}</p>
                      <div className="mt-4 flex items-center gap-3 border-t border-line pt-4 text-xs text-muted">
                        <span>{formatDate(post.publishedAt)}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readingMinutes} min</span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}

              {/* Contribute CTA keeps the grid balanced (real, not filler content) */}
              {posts.length > 0 && (
                <StaggerItem className="h-full">
                  <Link
                    href="/contact"
                    className="group flex h-full min-h-[280px] flex-col items-start justify-center gap-4 rounded-3xl border border-dashed border-accent/30 bg-gradient-to-br from-accent/10 via-transparent to-transparent p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent transition-transform group-hover:scale-110">
                      <PenLine className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-bold leading-snug">Have a story to share?</h3>
                    <p className="text-sm text-muted">Students and mentors from the community can contribute articles and learnings.</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      Get in touch <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </StaggerItem>
              )}
            </StaggerGroup>

            {!featured && (
              <EmptyState title="No posts in this category" icon={<FileText className="h-7 w-7" />} />
            )}
          </div>
        </AsyncBoundary>
      </Container>
    </Section>
  );
}
