"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Profile } from "@/types";
import { authService } from "@/services";
import { createPermissions } from "@/services/permissions";

interface AuthContextValue {
  user: Profile | null;
  loading: boolean;
  permissions: ReturnType<typeof createPermissions>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (u: Profile | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * App-wide auth context. Talks ONLY to authService (mock now, Firebase later).
 * `permissions` shapes UI visibility — it is not a security boundary.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setUser(await authService.getCurrentUser());
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      permissions: createPermissions(user?.role),
      refresh,
      logout,
      setUser,
    }),
    [user, loading, refresh, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
