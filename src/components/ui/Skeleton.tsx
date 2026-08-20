import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-xl", className)} aria-hidden />;
}

export function CardSkeleton() {
  return (
    <div className="glass rounded-3xl p-8">
      <Skeleton className="mb-4 h-12 w-12 rounded-2xl" />
      <Skeleton className="mb-3 h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-5/6" />
    </div>
  );
}
