import { type ReactNode } from "react";
import { PackageOpen } from "lucide-react";
import Button from "./ui/Button";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div
        className="mb-4"
        style={{ color: "var(--muted)" }}
      >
        {icon ?? <PackageOpen size={48} strokeWidth={1.5} />}
      </div>

      <h3
        className="mb-2 text-lg font-semibold"
        style={{ color: "var(--foreground)" }}
      >
        {title}
      </h3>

      {message && (
        <p
          className="mb-6 max-w-sm text-sm"
          style={{ color: "var(--muted)" }}
        >
          {message}
        </p>
      )}

      {actionLabel && onAction && (
        <Button onClick={onAction} className="w-auto px-8">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
