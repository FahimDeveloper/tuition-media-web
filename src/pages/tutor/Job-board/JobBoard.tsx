import PageBreadcrumb from '@/components/layout/shared/PageBreadcrumb';
import PageMeta from '@/components/common/PageMeta';
import JobBoardCard from '@/components/layout/tutor/job-board/JobBoardCard';
import JobBoardSearchPanel from '@/components/layout/tutor/job-board/JobBoardSearchPanel';
import {tuitionMockListings} from '@/mocks/tuition/tuitionListings';
import {FiBriefcase, FiGrid, FiTrendingUp} from 'react-icons/fi';

const tuitions = tuitionMockListings;

export default function JobBoard() {
  const totalResults = tuitions.length;

  return (
    <>
      <PageMeta
        title="Job Board | TutoriumBD Dashboard"
        description="Browse available tuition opportunities from the TutoriumBD dashboard job board."
      />
      <div className="rounded-2xl border border-border bg-surface-elevated p-5 lg:p-6">
        <PageBreadcrumb pageTitle="Job Board" />

        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-border bg-surface-muted/70 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                  <FiBriefcase className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                    Active jobs
                  </p>
                  <p className="mt-1 text-2xl font-semibold leading-none text-text-strong">
                    {totalResults}
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-border bg-surface-muted/70 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                  <FiGrid className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                    Board view
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text-strong">
                    Compact dashboard cards
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-border bg-surface-muted/70 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                  <FiTrendingUp className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                    Status
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text-strong">
                    Latest jobs in one place
                  </p>
                </div>
              </div>
            </article>
          </section>

          <JobBoardSearchPanel />

          <section>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {tuitions.map((tuition) => (
                <JobBoardCard key={tuition.id} tuition={tuition} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
