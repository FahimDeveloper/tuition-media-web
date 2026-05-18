import type { ReactNode } from "react";
import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import BrandLogo from "@/components/common/BrandLogo";
import { Link } from "react-router-dom";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-page relative z-1 p-6 sm:p-0">
      <div className="bg-page relative flex h-screen w-full flex-col justify-center sm:p-0 lg:flex-row">
        {children}
        <div className="bg-brand-950 hidden h-full w-full items-center lg:grid lg:w-1/2">
          <div className="relative z-1 flex items-center justify-center">
            <GridShape />
            <div className="flex max-w-xs flex-col items-center">
              <Link
                to="/"
                aria-label="TutoriumBD home"
                className="focus-visible:ring-brand-300 mb-4 block rounded-lg focus-visible:ring-2 focus-visible:outline-none"
              >
                <BrandLogo imgClassName="h-12 w-auto" width={231} height={48} />
              </Link>
              <p className="text-brand-100/72 text-center">
                Teacher access for TutoriumBD. Sign in or create your account to
                manage tuition opportunities.
              </p>
            </div>
          </div>
        </div>
        <div className="fixed right-6 bottom-6 z-50 hidden sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
