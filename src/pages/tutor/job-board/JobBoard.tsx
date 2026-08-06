import { Skeleton } from "antd";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { useTuitionJobBoard } from "@/components/common/job-board";
import { EmptyPanel, ErrorPanel } from "@/components/ui/feedback";
import JobBoardCard from "@/pages/tutor/job-board/components/JobBoardCard";
import JobBoardSearchPanel from "@/pages/tutor/job-board/components/JobBoardSearchPanel";
import { FiBriefcase, FiGrid, FiTrendingUp } from "react-icons/fi";

const TUITION_LOAD_ERROR =
  "Please try again later. The tuition listings could not be loaded.";

export default function JobBoard() {
  const {
    tuitions,
    totalResults,
    isLoading,
    isFetching,
    isError,
    errorMessage,
    handleSearch,
    handleFilter,
  } = useTuitionJobBoard();

  const stats = [
    {
      label: "Active jobs",
      value: totalResults,
      icon: FiBriefcase,
      valueClassName: "text-2xl leading-none",
    },
    {
      label: "Board view",
      value: "Compact dashboard cards",
      icon: FiGrid,
      valueClassName: "text-sm",
    },
    {
      label: "Status",
      value: "Latest jobs in one place",
      icon: FiTrendingUp,
      valueClassName: "text-sm",
    },
  ];

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
            {stats.map(({ label, value, icon: Icon, valueClassName }) => (
              <article
                key={label}
                className="border-border bg-surface-muted/70 rounded-2xl border p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300 flex h-11 w-11 items-center justify-center rounded-xl">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <div>
                    <p className="text-text-muted text-xs font-semibold tracking-[0.12em] uppercase">
                      {label}
                    </p>
                    <p
                      className={`text-text-strong mt-1 font-semibold ${valueClassName}`}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <JobBoardSearchPanel
            onSearch={handleSearch}
            onFilter={handleFilter}
          />

          <section>
            {isLoading ? (
              <JobBoardListSkeleton />
            ) : isError ? (
              <ErrorPanel
                title="Unable to load tuitions"
                description={errorMessage || TUITION_LOAD_ERROR}
                className="bg-surface-muted/70 py-10 shadow-none"
              />
            ) : (
              <>
                {isFetching ? (
                  <p
                    role="status"
                    aria-live="polite"
                    className="text-text-muted mb-4 text-sm"
                  >
                    Updating listings...
                  </p>
                ) : null}

                {tuitions.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                    {tuitions.map((tuition) => (
                      <JobBoardCard key={tuition.id} tuition={tuition} />
                    ))}
                  </div>
                ) : (
                  <EmptyPanel
                    icon={FiBriefcase}
                    title="No tuition found"
                    description="There are no open tuition listings available right now."
                    className="py-10"
                  />
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

function JobBoardListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border-border bg-surface-muted/70 rounded-2xl border p-4"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <Skeleton.Input active size="small" className="!h-5 !w-28" />
              <Skeleton.Input active className="!mt-3 !h-6 !w-full" />
            </div>

            <Skeleton.Button
              active
              size="small"
              className="!h-8 !w-20 !rounded-full"
            />
          </div>

          <div className="space-y-3">
            <Skeleton.Input active size="small" className="!w-44" />
            <Skeleton.Input active size="small" className="!w-36" />
            <Skeleton.Input active size="small" className="!w-52" />
          </div>

          <div className="border-border mt-5 border-t pt-4">
            <div className="flex items-center justify-between gap-4">
              <Skeleton.Input active size="small" className="!w-28" />
              <Skeleton.Button active className="!h-10 !w-28 !rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
