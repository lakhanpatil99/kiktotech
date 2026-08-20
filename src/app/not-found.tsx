import Link from "next/link";
import { Home, Compass } from "lucide-react";
import { Container } from "@/components/ui";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="relative">
        <span className="text-[8rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_rgba(34,227,214,0.5)] sm:text-[12rem]">
          404
        </span>
        <Compass className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-accent" />
      </div>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">This page took a wrong turn</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" size="lg"><Home className="h-4 w-4" /> Back home</Button>
        <Button href="/contact" variant="outline" size="lg">Contact support</Button>
      </div>
    </Container>
  );
}
