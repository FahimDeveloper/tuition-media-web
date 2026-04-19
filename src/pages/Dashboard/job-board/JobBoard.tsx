import PageBreadcrumb from '@/components/layout/dashboard/shared/PageBreadcrumb';
import PageMeta from '@/components/common/PageMeta';

export default function JobBoard() {
  return (
    <div>
      <PageMeta
        title="Job Board Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="min-h-full rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/3 xl:px-10 xl:py-12">
        <PageBreadcrumb pageTitle="Blank Page" />
        <div className="mx-auto w-full max-w-157.5 text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Card Title Here
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Start putting content on grids or panels, you can also use different
            combinations of grids.Please check out the dashboard and other pages
          </p>
        </div>
      </div>
    </div>
  );
}
