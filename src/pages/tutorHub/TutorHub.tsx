import { useState } from "react";
import { MdOutlineManageSearch } from "react-icons/md";
import { Pagination } from "antd";

// Internal Components
import {
  ListingPageSkeleton,
  EmptyPanel,
  ErrorPanel,
} from "@/components/ui/feedback";
import TutorCard from "./components/TutorCard";
import TutorSearchBar, { type FilterQuery } from "./components/TutorSearchBar";
import PageShell from "./components/PageShell";

// Redux
import { useGetAllTeachersProfileQuery } from "@/redux/features/teachers/teachersApi";

const TutorHub = () => {
  // State initialization with consistent typing
  const [params, setParams] = useState<Record<string, string | number>>({
    page: 1,
    limit: 20,
  });

  const { data, isLoading, isFetching, isError } =
    useGetAllTeachersProfileQuery(params);

  const tutors = data?.results || [];
  const totalResults = data?.total || 0;

  /**
   * Helper to flatten nested FilterQuery object into a flat Record.
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
   * Pagination Handler
   */
  const handlePageChange = (page: number, pageSize: number) => {
    setParams((prev) => ({
      ...prev,
      page,
      limit: pageSize,
    }));
  };

  /**
   * Search Handler: Sets search query and resets page to 1
   */
  const handleSearch = (search: string) => {
    setParams((prev) => {
      const next: Record<string, string | number> = { ...prev, page: 1 };
      if (search?.trim()) {
        next.search = search;
      } else {
        delete next.search;
      }
      return next;
    });
  };

  /**
   * Filter Handler: Resets filters and page to 1
   */
  const handleFilter = (filters: FilterQuery) => {
    const newFilters = flattenFilters(filters);
    const filterKeys = ["city", "area", "categories", "courses", "subjects"];

    setParams((prev) => {
      const next: Record<string, string | number> = { ...prev, page: 1 };
      filterKeys.forEach((key) => delete next[key]);
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
        <ErrorPanel />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader totalResults={totalResults} />

      <TutorSearchBar onSearch={handleSearch} onFilter={handleFilter} />

      <div
        className="mt-12 transition-opacity duration-300"
        style={{ opacity: isFetching ? 0.5 : 1 }}
      >
        {tutors.length === 0 ? (
          <EmptyPanel
            icon={MdOutlineManageSearch}
            title="No listings found"
            description="Try adjusting your filters."
          />
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tutors.map((t) => (
                <TutorCard key={t._id} teacher={t} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12 flex justify-center pb-10">
              <Pagination
                current={Number(params.page)}
                pageSize={Number(params.limit)}
                total={totalResults}
                onChange={handlePageChange}
                showSizeChanger
                showTotal={(total) => `Total ${total} tutors available`}
              />
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
};

const PageHeader = ({ totalResults }: { totalResults: number }) => (
  <div className="mb-8">
    <p className="border-brand-100 inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-sm font-medium shadow-sm backdrop-blur">
      <MdOutlineManageSearch className="text-brand-600 text-lg" />
      {totalResults} {totalResults === 1 ? "listing" : "listings"} found
    </p>
  </div>
);

export default TutorHub;
