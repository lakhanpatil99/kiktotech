"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { mainNav } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { useAuth } from "@/components/providers";
import { Logo } from "@/components/layout/Logo";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Button } from "@/components/ui/Button";
import { easePremium } from "@/lib/motion";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled(10);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-premium",
        scrolled ? "border-b border-line bg-ink-900/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "text-accent" : "text-primary-foreground/80 hover:text-accent",
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-accent"
                    transition={{ duration: 0.3, ease: easePremium }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Button href="/internship/dashboard" variant="outline" size="sm">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Button>
              <button
                onClick={() => void logout()}
                className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-accent"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <Button href="/login" size="sm">
              Sign Up / Login
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-primary-foreground hover:bg-white/5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: easePremium }}
            className="overflow-hidden border-t border-line bg-ink-900/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                    isActive(pathname, item.href)
                      ? "bg-accent/10 text-accent"
                      : "text-primary-foreground/85 hover:bg-white/5",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-3">
                {user ? (
                  <>
                    <Button href="/internship/dashboard" variant="outline" onClick={() => setOpen(false)}>
                      Dashboard
                    </Button>
                    <Button variant="ghost" onClick={() => { setOpen(false); void logout(); }}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button href="/login" onClick={() => setOpen(false)}>
                    Sign Up / Login
                  </Button>
                )}
                <SocialLinks className="pt-2" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
