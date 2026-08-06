import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";

type ErrorPanelProps = {
  title?: string;
  description?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: IconType;
  icon?: IconType;
  className?: string;
};

export default function ErrorPanel({
  title = "Something went wrong",
  description = "Please try again later.",
  actionLabel,
  onAction,
  actionIcon: ActionIcon = FiArrowLeft,
  icon: Icon = FiAlertTriangle,
  className = "",
}: ErrorPanelProps) {
  return (
    <div
      role="alert"
      className={`border-error-200 bg-error-50 dark:border-error-500/20 dark:bg-error-500/10 rounded-2xl border p-5 ${className}`}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="bg-error-100 text-error-700 dark:bg-error-500/15 dark:text-error-300 mb-4 inline-flex size-12 items-center justify-center rounded-full">
          <Icon size={22} aria-hidden="true" />
        </span>

        <h2 className="text-error-700 dark:text-error-300 text-xl font-semibold">
          {title}
        </h2>

        {description ? (
          <p className="text-text-muted mt-2 max-w-xl text-sm leading-6">
            {description}
          </p>
        ) : null}

        {onAction && actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className="bg-error-600 hover:bg-error-700 focus:ring-error-400 mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <ActionIcon size={16} aria-hidden="true" />
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
