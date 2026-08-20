"use client";

import { useEffect } from "react";
import { RotateCcw, Home } from "lucide-react";
import { Container } from "@/components/ui";
import { Button } from "@/components/ui/Button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // In production this would report to an error-tracking service.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-400/10 text-red-300">
        <RotateCcw className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-2xl font-bold sm:text-3xl">Something went wrong</h1>
      <p className="mt-3 max-w-md text-muted">
        An unexpected error occurred. You can try again, or head back to safety.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={reset}><RotateCcw className="h-4 w-4" /> Try again</Button>
        <Button href="/" variant="outline" size="lg"><Home className="h-4 w-4" /> Back home</Button>
      </div>
    </Container>
  );
}
