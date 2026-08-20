"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";

/** Single wrapper for all client-side providers. */
export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { useAuth } from "./AuthProvider";
