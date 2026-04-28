import type {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {MdArrowRightAlt} from 'react-icons/md';

export type DashboardStatCardProps = {
  value: string | number;
  description: string;
  icon: ReactNode;
  action?: {
    label: string;
    to: string;
  };
  className?: string;
};

export default function DashboardStatCard({
  value,
  description,
  icon,
  action,
  className = '',
}: DashboardStatCardProps) {
  return (
    <article
      className={`flex h-full flex-col rounded-2xl border border-border bg-surface-elevated p-4 shadow-theme-sm sm:p-5 lg:p-6 ${className}`}
    >
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-500/20 sm:h-14 sm:w-14">
            <div className="absolute inset-x-2 top-2 h-4 rounded-full bg-success-100/80 blur-sm dark:bg-success-500/10" />
            <span className="relative z-10 [&_svg]:h-6 [&_svg]:w-6 sm:[&_svg]:h-7 sm:[&_svg]:w-7">
              {icon}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-3xl font-semibold leading-none text-text-strong sm:text-4xl lg:text-[2.75rem]">
              {value}
            </p>
          </div>
        </div>

        <p className="text-sm leading-6 text-text-muted sm:text-base">
          {description}
        </p>
      </div>

      {action ? (
        <div className="mt-5 flex">
          <Link
            to={action.to}
            className="inline-flex items-center gap-2 rounded-full px-1 py-1 text-sm font-semibold text-brand-700 transition-colors duration-200 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 dark:text-brand-300 dark:hover:text-brand-200 sm:ml-auto"
          >
            <span>{action.label}</span>
            <MdArrowRightAlt className="h-5 w-5 shrink-0" />
          </Link>
        </div>
      ) : null}
    </article>
  );
}
