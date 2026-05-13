import {
  JobBoardState,
  useTuitionJobBoard,
} from "@/components/common/job-board";
import TuitionCard from "@/pages/tuition-jobs/components/TuitionCard";
import TuitionSearchBar from "@/pages/tuition-jobs/components/TuitionSearchBar";
import { MdOutlineManageSearch } from "react-icons/md";

const Tuition = () => {
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

  if (isLoading) {
    return (
      <JobBoardState
        title="Loading tuitions..."
        wrapperClassName="bg-page px-4 py-20 sm:px-6 lg:px-8"
      />
    );
  }

  if (isError) {
    return (
      <JobBoardState
        title="Unable to load tuitions"
        description={
          errorMessage ||
          "Please try again later. The tuition listings could not be loaded."
        }
        wrapperClassName="bg-page px-4 py-20 sm:px-6 lg:px-8"
      />
    );
  }

  return (
    <section className="from-brand-50 via-page to-page dark:from-surface-strong dark:via-page dark:to-page relative overflow-hidden bg-linear-to-b py-20 transition-colors duration-300 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-[radial-gradient(circle_at_top_left,rgba(102,153,207,0.22),transparent_50%),radial-gradient(circle_at_top_right,rgba(63,114,175,0.16),transparent_45%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="border-brand-100 bg-surface-elevated/82 text-text-strong shadow-theme-xs mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium backdrop-blur">
              <MdOutlineManageSearch className="text-primary dark:text-brand-300 text-lg" />
              {totalResults} tuition{" "}
              {totalResults === 1 ? "listing" : "listings"} available
            </p>
          </div>
        </div>

        {/* Search / Filter Panel */}
        <TuitionSearchBar onSearch={handleSearch} onFilter={handleFilter} />

        {/* Listings */}
        <div className="mt-12">
          {isFetching ? (
            <p className="text-text-muted mb-4 text-sm">Updating listings...</p>
          ) : null}

          {tuitions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tuitions.map((tuition) => (
                <TuitionCard key={tuition.id} tuition={tuition} />
              ))}
            </div>
          ) : (
            <JobBoardState
              title="No tuition found"
              description="There are no open tuition listings available right now."
              wrapperClassName="bg-page px-4 py-20 sm:px-6 lg:px-8"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Tuition;
