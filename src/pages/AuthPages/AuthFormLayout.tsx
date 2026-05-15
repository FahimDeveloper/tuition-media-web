import type { ReactNode } from "react";
import { Alert } from "antd";
import { Link } from "react-router-dom";

import { ChevronLeftIcon } from "@/icons";

type AuthFormLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
  footer: ReactNode;
  errorMessage?: string;
  maxWidth?: "md" | "2xl";
  scrollable?: boolean;
};

const maxWidthClasses: Record<NonNullable<AuthFormLayoutProps["maxWidth"]>, string> = {
  md: "max-w-md",
  "2xl": "max-w-2xl",
};

const getPanelClasses = (scrollable: boolean) =>
  [
    "flex w-full flex-1 flex-col px-6 py-10 sm:px-10 lg:px-12",
    scrollable ? "no-scrollbar overflow-y-auto" : "",
  ]
    .filter(Boolean)
    .join(" ");

export default function AuthFormLayout({
  children,
  title,
  description,
  footer,
  errorMessage,
  maxWidth = "md",
  scrollable = false,
}: AuthFormLayoutProps) {
  const widthClass = maxWidthClasses[maxWidth];

  return (
    <section className={getPanelClasses(scrollable)}>
      <div className={`mx-auto w-full ${widthClass}`}>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text-strong"
        >
          <ChevronLeftIcon className="size-5" />
          Back to Home
        </Link>
      </div>

      <div
        className={`mx-auto flex w-full flex-1 flex-col justify-center ${
          scrollable ? "pb-4" : ""
        } ${widthClass}`}
      >
        <header className="mb-6 sm:mb-8">
          <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-text-strong">
            {title}
          </h1>
          <p className="text-sm text-text-muted">{description}</p>
        </header>

        {errorMessage ? (
          <Alert
            type="error"
            showIcon
            message={errorMessage}
            className="mb-5! rounded-lg! border! border-red-200! bg-red-50/90! dark:border-red-500/30! dark:bg-red-500/12!"
          />
        ) : null}

        {children}

        <p className="mt-5 text-center text-sm font-normal text-text-muted sm:text-start">
          {footer}
        </p>
      </div>
    </section>
  );
}
