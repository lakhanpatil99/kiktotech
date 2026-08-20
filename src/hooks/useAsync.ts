"use client";

import { useCallback, useEffect, useState } from "react";
import type { AsyncStatus } from "@/types";

interface UseAsyncState<T> {
  data: T | null;
  status: AsyncStatus;
  error: string | null;
  reload: () => void;
}

/**
 * Generic async data hook that drives the loading/success/empty/error UI
 * states every dynamic feature must handle. Treats empty arrays as "empty".
 */
export function useAsync<T>(
  fn: () => Promise<T>,
  deps: unknown[] = [],
): UseAsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<AsyncStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    setError(null);

    fn()
      .then((result) => {
        if (!active) return;
        setData(result);
        const isEmpty = Array.isArray(result) && result.length === 0;
        setStatus(isEmpty ? "empty" : "success");
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Something went wrong.");
        setStatus("error");
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  return { data, status, error, reload };
}
