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
    <div className="relative z-1 bg-page p-6 sm:p-0">
      <div className="relative flex h-screen w-full flex-col justify-center bg-page sm:p-0 lg:flex-row">
        {children}
        <div className="hidden h-full w-full items-center bg-brand-950 lg:grid lg:w-1/2">
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
              <p className="text-center text-brand-100/72">
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
