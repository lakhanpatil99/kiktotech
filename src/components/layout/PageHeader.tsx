import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** Consistent hero band for interior pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden pb-6 pt-16 sm:pt-24", className)}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <Container className="relative">
        <Reveal className="max-w-3xl">
          {eyebrow && (
            <span className="mb-3 inline-block rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
              {eyebrow}
            </span>
          )}
          <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
