"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { useAuth } from "@/components/providers";
import type { Permission } from "@/services/permissions";
import { Container } from "@/components/ui";
import { Button } from "@/components/ui/Button";

/**
 * Client-side gate for authenticated areas.
 *
 * IMPORTANT: This is UX only — it hides UI and redirects. It is NOT security.
 * Real access control is enforced server-side / by Firestore rules later.
 */
export function RequireAuth({
  children,
  permission,
}: {
  children: ReactNode;
  permission?: Permission;
}) {
  const { user, loading, permissions } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  if (loading || !user) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </Container>
    );
  }

  if (permission && !permissions.can(permission)) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-accent">
          <Lock className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Restricted area</h1>
        <p className="mt-2 max-w-md text-muted">
          Your account doesn&apos;t have access to this section. If you believe this is a mistake, contact an administrator.
        </p>
        <Button href="/internship/dashboard" variant="outline" className="mt-6">Go to your dashboard</Button>
      </Container>
    );
  }

  return <>{children}</>;
}
