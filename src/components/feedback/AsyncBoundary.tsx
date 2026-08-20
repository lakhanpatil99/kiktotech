import type { ReactNode } from "react";
import type { AsyncStatus } from "@/types";
import { EmptyState, ErrorState } from "./states";

/**
 * Declaratively renders the correct UI for an async state.
 * Every dynamic feature routes through this so loading/empty/error are never
 * forgotten.
 */
export function AsyncBoundary({
  status,
  loading,
  empty,
  error,
  onRetry,
  children,
}: {
  status: AsyncStatus;
  loading: ReactNode;
  empty?: ReactNode;
  error?: string | null;
  onRetry?: () => void;
  children: ReactNode;
}) {
  if (status === "loading" || status === "idle") return <>{loading}</>;
  if (status === "error") return <ErrorState message={error ?? undefined} onRetry={onRetry} />;
  if (status === "empty") return <>{empty ?? <EmptyState />}</>;
  return <>{children}</>;
}
