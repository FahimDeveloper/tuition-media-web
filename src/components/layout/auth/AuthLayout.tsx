import type {ReactNode} from 'react';
import GridShape from '@/components/common/GridShape';
import ThemeTogglerTwo from '@/components/common/ThemeTogglerTwo';
import BrandLogo from '@/components/common/BrandLogo';
import {Link} from 'react-router-dom';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({children}: AuthLayoutProps) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link
                to="/"
                aria-label="TutoriumBD home"
                className="mb-4 block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
              >
                <BrandLogo imgClassName="h-12 w-auto" width={231} height={48} />
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                Teacher access for TutoriumBD. Sign in or create your
                account to manage tuition opportunities.
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
