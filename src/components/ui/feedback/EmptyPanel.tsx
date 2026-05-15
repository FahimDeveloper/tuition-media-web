import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiArrowLeft, FiInbox } from "react-icons/fi";

type EmptyPanelProps = {
  title?: string;
  description?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  icon?: IconType;
  className?: string;
};

export default function EmptyPanel({
  title = "No data found",
  description = "There is nothing to show here yet.",
  actionLabel,
  onAction,
  icon: Icon = FiInbox,
  className = "",
}: EmptyPanelProps) {
  return (
    <div
      role="status"
      className={`border-border bg-surface-muted/70 rounded-2xl border p-5 ${className}`}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="border-border bg-surface-elevated text-text-muted mb-4 inline-flex size-12 items-center justify-center rounded-full border">
          <Icon size={22} aria-hidden="true" />
        </span>

        <h2 className="text-text-strong text-xl font-semibold">{title}</h2>

        {description ? (
          <p className="text-text-muted mt-2 max-w-xl text-sm leading-6">
            {description}
          </p>
        ) : null}

        {onAction && actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className="bg-brand-600 text-text-on-brand hover:bg-brand-700 focus:ring-brand-400 focus:ring-offset-surface-elevated mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <FiArrowLeft size={16} aria-hidden="true" />
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
