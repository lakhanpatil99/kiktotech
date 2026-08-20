"use client";

import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, FileText, Calendar } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { contentService } from "@/services";
import { Container, Section, Badge } from "@/components/ui";
import { GenerativeCover } from "@/components/ui/GenerativeCover";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { AsyncBoundary } from "@/components/feedback/AsyncBoundary";
import { EmptyState } from "@/components/feedback/states";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

function ReadNext({ current }: { current: BlogPost }) {
  const { data } = useAsync(() => contentService.getBlogPosts(), []);
  const others = (data ?? []).filter((p) => p.slug !== current.slug).slice(0, 2);
  if (others.length === 0) return null;

  return (
    <div className="mt-16 border-t border-line pt-12">
      <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-muted">Read next</h2>
      <StaggerGroup className="grid gap-6 sm:grid-cols-2">
        {others.map((post) => (
          <StaggerItem key={post.id} className="h-full">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <span className="relative w-28 flex-shrink-0 overflow-hidden">
                <GenerativeCover seed={post.slug} src={post.coverUrl || undefined} label={post.category} aspect="h-full" sizes="112px" className="transition-transform duration-500 group-hover:scale-110" />
              </span>
              <span className="flex flex-1 flex-col justify-center p-4">
                <Badge tone="neutral" className="w-fit">{post.category}</Badge>
                <span className="mt-2 line-clamp-2 font-bold leading-snug transition-colors group-hover:text-accent">{post.title}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted"><Clock className="h-3 w-3" /> {post.readingMinutes} min</span>
              </span>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

export function BlogDetailView({ slug }: { slug: string }) {
  const { data, status, error, reload } = useAsync(() => contentService.getBlogPost(slug), [slug]);
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* reading progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-accent to-electric"
        style={{ scaleX: scrollYProgress }}
      />

      <AsyncBoundary
        status={data === null && status === "success" ? "empty" : status}
        error={error}
        onRetry={reload}
        loading={
          <Container className="py-16">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="mt-6 h-72 w-full rounded-3xl" />
            <Skeleton className="mt-6 h-32 w-full" />
          </Container>
        }
        empty={
          <Container className="py-24">
            <EmptyState title="Article not found" icon={<FileText className="h-7 w-7" />} action={<Button href="/blog" variant="outline" size="sm">Back to blog</Button>} />
          </Container>
        }
      >
        {data && (
          <Section className="pt-10">
            <Container className="max-w-3xl">
              <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent">
                <ArrowLeft className="h-4 w-4" /> All articles
              </Link>

              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Badge className="mb-4">{data.category}</Badge>
                <h1 className="text-balance text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">{data.title}</h1>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-line py-4">
                  <span className="flex items-center gap-2.5">
                    <Avatar name={data.author} size={36} rounded="full" />
                    <span className="text-sm font-semibold text-primary-foreground/90">{data.author}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted"><Calendar className="h-4 w-4" /> {formatDate(data.publishedAt)}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted"><Clock className="h-4 w-4" /> {data.readingMinutes} min read</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <GenerativeCover seed={data.slug} src={data.coverUrl || undefined} label={data.title} aspect="aspect-[16/9]" className="mt-8 rounded-3xl border border-line" sizes="768px" />
              </motion.div>

              <article className="prose prose-invert mt-10 max-w-none">
                <p className="text-xl font-medium leading-relaxed text-primary-foreground/90">{data.excerpt}</p>
                <p className="mt-6 leading-relaxed text-muted">{data.content}</p>
              </article>

              {/* CTA */}
              <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 to-transparent p-7 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-bold">Want to be part of the story?</h3>
                  <p className="mt-1 text-sm text-muted">Join the community and start building with us.</p>
                </div>
                <Button href="/join" className="flex-shrink-0">Join the Community <ArrowRight className="h-4 w-4" /></Button>
              </div>

              <ReadNext current={data} />
            </Container>
          </Section>
        )}
      </AsyncBoundary>
    </>
  );
}
