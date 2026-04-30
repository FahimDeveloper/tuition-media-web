import GridShape from '@/components/common/GridShape';
import PageMeta from '@/components/common/PageMeta';
import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="React.js 404 Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js 404 Dashboard page for TailAdmin - React.js Admin Dashboard Template"
      />
      <div className="relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-page p-6">
        <GridShape />
        <div className="mx-auto w-full max-w-60.5 text-center sm:max-w-118">
          <h1 className="mb-8 text-title-md font-bold text-text-strong xl:text-title-2xl">
            ERROR
          </h1>

          <img src="/images/error/404.svg" alt="404" className="dark:hidden" />
          <img
            src="/images/error/404-dark.svg"
            alt="404"
            className="hidden dark:block"
          />

          <p className="mb-6 mt-10 text-base text-text-muted sm:text-lg">
            We can&apos;t seem to find the page you are looking for!
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-surface-elevated px-5 py-3.5 text-sm font-medium text-text-strong shadow-theme-xs transition-colors hover:bg-brand-50 hover:text-brand-700"
          >
            Back to Home Page
          </Link>
        </div>

        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} - TutoriumBD
        </p>
      </div>
    </>
  );
}
