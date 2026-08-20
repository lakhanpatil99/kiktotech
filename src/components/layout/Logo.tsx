import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <Link href="/" className={cn("flex flex-shrink-0 items-center gap-2.5", className)} aria-label="Kick To Tech home">
      <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/90 shadow-glow">
        <Image src="/brand/logo.png" alt="Kick To Tech logo" width={36} height={36} className="h-8 w-8 object-contain" priority />
      </span>
      {showWordmark && (
        <span className="text-lg font-bold tracking-tight">
          KICK <span className="text-accent">To</span> TECH
        </span>
      )}
    </Link>
  );
}
