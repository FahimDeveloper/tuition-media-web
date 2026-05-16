import { useState } from "react";
import {
  EmptyPanel,
  ErrorPanel,
  ListingPageSkeleton,
} from "@/components/ui/feedback";
import TutorCard from "@/pages/tutor-hub/components/TutorCard";
import TutorSearchBar from "@/pages/tutor-hub/components/TutorSearchBar";
import { useAllPublicTeachersQuery } from "@/redux/features/teachers/teachersProfileApi";
import type { PublicTeachersQuery } from "@/types";
import { MdOutlineManageSearch } from "react-icons/md";

const TUTOR_LOAD_ERROR =
  "Please try again later. The tutor profiles could not be loaded.";

const getErrorMessage = (error: unknown) => {
  if (!error || typeof error !== "object" || !("message" in error)) {
    return TUTOR_LOAD_ERROR;
  }

  return (error as { message?: string }).message || TUTOR_LOAD_ERROR;
};

function TutorHubShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="from-brand-50 via-page to-page dark:from-surface-strong dark:via-page dark:to-page relative overflow-hidden bg-linear-to-b py-20 transition-colors duration-300 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-[radial-gradient(circle_at_top_left,rgba(102,153,207,0.22),transparent_50%),radial-gradient(circle_at_top_right,rgba(63,114,175,0.16),transparent_45%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

const TutorHub = () => {
  const [query, setQuery] = useState<PublicTeachersQuery>({});
  const { data, isLoading, isFetching, isError, error } =
    useAllPublicTeachersQuery(query);

  const teachers = data ?? [];
  const totalResults = teachers.length;

  const handleSearch = (search: string) => {
    setQuery((currentQuery) => ({
      ...currentQuery,
      search: search || undefined,
    }));
  };

  const handleFilter = (filterQuery: PublicTeachersQuery) => {
    setQuery((currentQuery) => ({
      ...(currentQuery.search ? { search: currentQuery.search } : {}),
      ...filterQuery,
    }));
  };

  if (isLoading) {
    return <ListingPageSkeleton />;
  }

  if (isError) {
    return (
      <TutorHubShell>
        <ErrorPanel
          title="Unable to load tutors"
          description={getErrorMessage(error)}
          className="py-12"
        />
      </TutorHubShell>
    );
  }

  return (
    <TutorHubShell>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <p className="border-brand-100 bg-surface-elevated/82 text-text-strong shadow-theme-xs inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium backdrop-blur">
          <MdOutlineManageSearch className="text-primary dark:text-brand-300 text-lg" />
          {totalResults} tutor {totalResults === 1 ? "profile" : "profiles"}{" "}
          available
        </p>
      </div>

      <TutorSearchBar onSearch={handleSearch} onFilter={handleFilter} />

      <div className="mt-12">
        {isFetching ? (
          <p
            role="status"
            aria-live="polite"
            className="text-text-muted mb-4 text-sm"
          >
            Updating tutors...
          </p>
        ) : null}

        {teachers.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {teachers.map((teacher) => (
              <TutorCard key={teacher._id} teacher={teacher} />
            ))}
          </div>
        ) : (
          <EmptyPanel
            icon={MdOutlineManageSearch}
            title="No tutors found"
            description="Tutor profiles will appear here when they are available."
            className="py-12"
          />
        )}
      </div>
    </TutorHubShell>
  );
};

export default TutorHub;
