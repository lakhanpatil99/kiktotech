import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        <Icon className="h-5 w-5 text-accent" />
      </div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function ProgressCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-semibold text-accent">{value}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
        <div className="h-full rounded-full bg-gradient-to-r from-accent to-electric transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}

const statusTones: Record<string, string> = {
  active: "bg-emerald-400/12 text-emerald-300 border-emerald-400/30",
  pending: "bg-amber-400/12 text-amber-300 border-amber-400/30",
  completed: "bg-accent/12 text-accent border-accent/30",
  inactive: "bg-white/5 text-muted border-line",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize", statusTones[status] ?? statusTones.inactive)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function Timeline({ items }: { items: { title: string; date: string; done?: boolean }[] }) {
  return (
    <ol className="relative space-y-5 pl-6">
      <span className="absolute left-[7px] top-1 h-[calc(100%-0.5rem)] w-px bg-line" />
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className={cn("absolute -left-6 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border", it.done ? "border-accent bg-accent" : "border-line bg-ink-800")} />
          <p className="text-sm font-medium">{it.title}</p>
          <p className="text-xs text-muted">{it.date}</p>
        </li>
      ))}
    </ol>
  );
}

export function DashboardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
