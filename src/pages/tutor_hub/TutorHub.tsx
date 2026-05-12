import TuitionCard from "@/pages/tutor_hub/components/TutorCard";
import TuitionSearchBar from "@/pages/tutor_hub/components/TutorSearchBar";
import { mockTeachers } from "@/mocks/tutor/tutorMock";
import { MdOutlineManageSearch } from "react-icons/md";

const TutorHub = () => {
  /*
   * RTK Query handoff point:
   * Replace these mock assignments with useFeaturedTeachersQuery() later.
   * Keep the render states below so loading/error handling stays consistent.
   */
  const isLoading = false;
  const isError = false;
  const errorMessage = "";
  const teachers = mockTeachers;

  const totalResults = teachers.length;

  if (isLoading) {
    return <TutorListState title="Loading tutors..." />;
  }

  if (isError) {
    return (
      <TutorListState
        title="Unable to load tutors"
        description={
          errorMessage ||
          "Please try again later. The tutor profiles could not be loaded."
        }
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
              {totalResults} tutor {totalResults === 1 ? "profile" : "profiles"}{" "}
              available
            </p>
          </div>
        </div>

        {/* Search / Filter Panel */}
        <TuitionSearchBar />

        {/* Listings */}
        <div className="mt-12">
          {teachers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {teachers.map((teacher) => (
                <TuitionCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          ) : (
            <TutorListState
              title="No tutors found"
              description="Tutor profiles will appear here when they are available."
            />
          )}
        </div>
      </div>
    </section>
  );
};

const TutorListState = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <section className="bg-page px-4 py-20 sm:px-6 lg:px-8">
    <div className="border-brand-200/70 bg-surface-elevated shadow-theme-md dark:border-border mx-auto max-w-3xl rounded-3xl border p-8 text-center">
      <h2 className="text-text-strong text-2xl font-bold">{title}</h2>
      {description ? (
        <p className="text-text-muted mx-auto mt-3 max-w-md text-sm leading-6">
          {description}
        </p>
      ) : null}
    </div>
  </section>
);

export default TutorHub;
