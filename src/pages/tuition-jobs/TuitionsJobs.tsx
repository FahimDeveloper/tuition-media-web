import {
  ListingPageSkeleton,
  EmptyPanel,
  ErrorPanel,
} from "@/components/ui/feedback";
import { useTuitionJobBoard } from "@/components/common/job-board";
import TuitionCard from "@/pages/tuition-jobs/components/TuitionCard";
import TuitionSearchBar from "@/pages/tuition-jobs/components/TuitionSearchBar";
import { FiRefreshCw } from "react-icons/fi";
import { MdOutlineManageSearch } from "react-icons/md";

const PAGE_SECTION_CLASS =
  "from-brand-50 via-page to-page dark:from-surface-strong dark:via-page dark:to-page relative overflow-hidden bg-linear-to-b py-20 transition-colors duration-300 sm:py-24";

const PAGE_CONTAINER_CLASS = "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const BACKGROUND_DECORATION_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-[radial-gradient(circle_at_top_left,rgba(102,153,207,0.22),transparent_50%),radial-gradient(circle_at_top_right,rgba(63,114,175,0.16),transparent_45%)]";

type TuitionListingsProps = {
  tuitions: ReturnType<typeof useTuitionJobBoard>["tuitions"];
  isFetching: boolean;
};

type TuitionHeaderProps = {
  totalResults: number;
};

function TuitionPageShell({ children }: { children: React.ReactNode }) {
  return (
    <section className={PAGE_SECTION_CLASS}>
      <div className={BACKGROUND_DECORATION_CLASS} aria-hidden="true" />

      <div className={PAGE_CONTAINER_CLASS}>{children}</div>
    </section>
  );
}

function TuitionHeader({ totalResults }: TuitionHeaderProps) {
  const listingLabel = totalResults === 1 ? "listing" : "listings";

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <p className="border-brand-100 bg-surface-elevated/82 text-text-strong shadow-theme-xs inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium backdrop-blur">
        <MdOutlineManageSearch className="text-primary dark:text-brand-300 text-lg" />
        {totalResults} tuition {listingLabel} available
      </p>
    </div>
  );
}

function TuitionListings({ tuitions, isFetching }: TuitionListingsProps) {
  if (!tuitions.length) {
    return (
      <EmptyPanel
        icon={MdOutlineManageSearch}
        title="No tuition listings found"
        description="There are no open tuition listings available right now. Try adjusting your search or filters."
        className="py-12"
      />
    );
  }

  return (
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tuitions.map((tuition) => (
          <TuitionCard key={tuition.id} tuition={tuition} />
        ))}
      </div>
    </>
  );
}

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
      <TuitionPageShell>
        <ListingPageSkeleton />
      </TuitionPageShell>
    );
  }

  if (isError) {
    return (
      <TuitionPageShell>
        <ErrorPanel
          title="Unable to load tuition listings"
          description={
            errorMessage ||
            "Please try again later. The tuition listings could not be loaded."
          }
          actionLabel="Refresh page"
          actionIcon={FiRefreshCw}
          onAction={() => window.location.reload()}
          className="py-12"
        />
      </TuitionPageShell>
    );
  }

  return (
    <TuitionPageShell>
      <TuitionHeader totalResults={totalResults} />

      <TuitionSearchBar onSearch={handleSearch} onFilter={handleFilter} />

      <div className="mt-12">
        <TuitionListings tuitions={tuitions} isFetching={isFetching} />
      </div>
    </TuitionPageShell>
  );
};

export default Tuition;
