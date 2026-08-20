"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LayoutDashboard, GraduationCap, Users, ShieldCheck, User } from "lucide-react";
import { useAuth } from "@/components/providers";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Permission } from "@/services/permissions";

const links: { href: string; label: string; icon: typeof User; permission?: Permission }[] = [
  { href: "/internship/dashboard", label: "Dashboard", icon: LayoutDashboard, permission: "view_dashboard" },
  { href: "/internship/mentor", label: "Mentor", icon: Users, permission: "view_mentor" },
  { href: "/internship/faculty", label: "Faculty", icon: GraduationCap, permission: "view_faculty" },
  { href: "/admin", label: "Admin", icon: ShieldCheck, permission: "view_admin" },
  { href: "/profile", label: "Profile", icon: User },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { permissions } = useAuth();
  const visible = links.filter((l) => !l.permission || permissions.can(l.permission));

  return (
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col">
            {visible.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/profile" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex flex-shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-accent/10 text-accent" : "text-muted hover:bg-white/5 hover:text-primary-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" /> {label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </Container>
  );
}
