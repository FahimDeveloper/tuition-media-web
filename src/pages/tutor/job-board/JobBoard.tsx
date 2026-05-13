import PageBreadcrumb from "@/components/layout/shared/PageBreadcrumb";
import PageMeta from "@/components/common/PageMeta";
import JobBoardCard from "@/pages/tutor/job-board/components/JobBoardCard";
import JobBoardSearchPanel from "@/pages/tutor/job-board/components/JobBoardSearchPanel";
import { tuitionMockListings } from "@/mocks/tuition/tuitionListings";
import { FiBriefcase, FiGrid, FiTrendingUp } from "react-icons/fi";

const tuitions = tuitionMockListings;

export default function JobBoard() {
  const totalResults = tuitions.length;

  return (
    <>
      <PageMeta
        title="Job Board | TutoriumBD Dashboard"
        description="Browse available tuition opportunities from the TutoriumBD dashboard job board."
      />
      <div className="border-border bg-surface-elevated rounded-2xl border p-5 lg:p-6">
        <PageBreadcrumb pageTitle="Job Board" />

        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-3">
            <article className="border-border bg-surface-muted/70 rounded-2xl border p-4">
              <div className="flex items-start gap-3">
                <div className="bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300 flex h-11 w-11 items-center justify-center rounded-xl">
                  <FiBriefcase className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-text-muted text-xs font-semibold tracking-[0.12em] uppercase">
                    Active jobs
                  </p>
                  <p className="text-text-strong mt-1 text-2xl leading-none font-semibold">
                    {totalResults}
                  </p>
                </div>
              </div>
            </article>

            <article className="border-border bg-surface-muted/70 rounded-2xl border p-4">
              <div className="flex items-start gap-3">
                <div className="bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300 flex h-11 w-11 items-center justify-center rounded-xl">
                  <FiGrid className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-text-muted text-xs font-semibold tracking-[0.12em] uppercase">
                    Board view
                  </p>
                  <p className="text-text-strong mt-1 text-sm font-semibold">
                    Compact dashboard cards
                  </p>
                </div>
              </div>
            </article>

            <article className="border-border bg-surface-muted/70 rounded-2xl border p-4">
              <div className="flex items-start gap-3">
                <div className="bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300 flex h-11 w-11 items-center justify-center rounded-xl">
                  <FiTrendingUp className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-text-muted text-xs font-semibold tracking-[0.12em] uppercase">
                    Status
                  </p>
                  <p className="text-text-strong mt-1 text-sm font-semibold">
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
