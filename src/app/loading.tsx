import { Container } from "@/components/ui";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="py-24">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-4 h-6 w-96 max-w-full" />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-56" />
        ))}
      </div>
    </Container>
  );
}
