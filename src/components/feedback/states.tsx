import type { ReactNode } from "react";
import { Inbox, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyState({
  title = "Nothing here yet",
  description,
  icon,
  action,
}: {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="glass flex flex-col items-center rounded-3xl px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-accent">
        {icon ?? <Inbox className="h-7 w-7" />}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({
  message = "We couldn't load this right now.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="glass flex flex-col items-center rounded-3xl px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-400/10 text-red-300">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold">Something went wrong</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

export function SuccessState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center rounded-3xl px-6 py-10 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>}
    </div>
  );
}
