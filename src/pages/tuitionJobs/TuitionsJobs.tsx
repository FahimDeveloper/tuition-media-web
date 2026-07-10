import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { MdOutlineManageSearch } from "react-icons/md";

// Internal Components
import {
  ListingPageSkeleton,
  EmptyPanel,
  ErrorPanel,
} from "@/components/ui/feedback";
import TuitionCard from "@/pages/tuitionJobs/components/TuitionCard";
import TuitionSearchBar, {
  type FilterQuery,
} from "@/pages/tuitionJobs/components/TuitionSearchBar";

// Redux
import { useGetAllTuitionJobsQuery } from "@/redux/features/tuitionJobs/tuitionJobsApi";
import PageShell from "./components/PageShell";

/**
 * Helper to flatten nested FilterQuery object into a flat Record.
 * Converts arrays to comma-separated strings for URL params.
 */
const flattenFilters = (filters: FilterQuery): Record<string, string> => {
  const flat: Record<string, string> = {};

  if (filters.locationFilter) {
    const { city, area } = filters.locationFilter;
    if (city) flat.city = city;
    if (area?.length) flat.area = area.join(",");
  }

  if (filters.educationFilter) {
    const { categories, courses, subjects } = filters.educationFilter;
    if (categories?.length) flat.categories = categories.join(",");
    if (courses?.length) flat.courses = courses.join(",");
    if (subjects?.length) flat.subjects = subjects.join(",");
  }

  return flat;
};

/**
 * Tuition Page Component
 * Manages the state for search and filters, flattens nested query objects
 * for API consumption, and handles loading/error states.
 */
const Tuition = () => {
  // State for API query parameters (e.g., ?search=xyz&city=Dhaka&subjects=Math)
  const [params, setParams] = useState<Record<string, string>>({});

  const { data, isLoading, isFetching, isError, error } =
    useGetAllTuitionJobsQuery(params);

  const tuitions = data?.results || [];
  const totalResults = data?.total || 0;

  /**
   * Updates the search parameter while preserving existing filters.
   */
  const handleSearch = (search: string) => {
    setParams((prev) => {
      const next = { ...prev };
      if (search?.trim()) {
        next.search = search;
      } else {
        delete next.search;
      }
      return next;
    });
  };

  /**
   * Updates API parameters by clearing old filter keys and applying new flattened ones.
   */
  const handleFilter = (filters: FilterQuery) => {
    const newFilters = flattenFilters(filters);
    const filterKeys = ["city", "area", "categories", "courses", "subjects"];

    setParams((prev) => {
      const next = { ...prev };
      // 1. Remove old filter keys to ensure we only have the new ones
      filterKeys.forEach((key) => delete next[key]);
      // 2. Add the new flattened filters
      return { ...next, ...newFilters };
    });
  };

  // --- Conditional Rendering ---

  if (isLoading) {
    return (
      <PageShell>
        <ListingPageSkeleton />
      </PageShell>
    );
  }

  if (isError) {
    return (
      <PageShell>
        <ErrorPanel
          title="Unable to load tuition listings"
          description={error.toString() || "Something went wrong"}
          actionLabel="Refresh"
          actionIcon={FiRefreshCw}
          onAction={() => window.location.reload()}
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <TuitionHeader totalResults={totalResults} />

      <TuitionSearchBar onSearch={handleSearch} onFilter={handleFilter} />

      <div
        className="mt-12 transition-opacity duration-300"
        style={{ opacity: isFetching ? 0.5 : 1 }}
      >
        {tuitions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tuitions.map((t) => (
              <TuitionCard key={t._id} tuition={t} />
            ))}
          </div>
        ) : (
          <EmptyPanel
            icon={MdOutlineManageSearch}
            title="No listings found"
            description="Try adjusting your filters."
          />
        )}
      </div>
    </PageShell>
  );
};

// --- Sub-components ---
const TuitionHeader = ({ totalResults }: { totalResults: number }) => (
  <div className="mb-8">
    <p className="border-brand-100 inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-sm font-medium shadow-sm backdrop-blur">
      <MdOutlineManageSearch className="text-brand-600 text-lg" />
      {totalResults}{" "}
      {totalResults === 1 ? "tuition listing" : "tuition listings"} available
    </p>
  </div>
);

export default Tuition;
