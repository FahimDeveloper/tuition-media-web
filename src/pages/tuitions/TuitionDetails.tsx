import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiHash,
  FiMapPin,
  FiMessageSquare,
  FiTag,
  FiUsers,
  FiUserCheck,
} from "react-icons/fi";

import type { IconType } from "react-icons";
import { mockTuitionJobs } from "@/mocks/tuition/tuitionJobs";
import { toTuitionJobView } from "@/types/tuitionJob";

type DetailItem = {
  label: string;
  value: string;
  icon: IconType;
};

const TuitionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  /*
   * RTK Query handoff point:
   * Replace the mock lookup with useSingleTuitionJobQuery(id) later.
   * The loading/error/not-found branches below are already ready for that hook.
   */
  const isLoading = false;
  const isError = false;
  const errorMessage = "";

  const tuition = useMemo(
    () =>
      mockTuitionJobs
        .map(toTuitionJobView)
        .find((tuitionJob) => tuitionJob.id === id),
    [id],
  );

  if (isLoading) {
    return <TuitionDetailsState title="Loading tuition details..." />;
  }

  if (isError) {
    return (
      <TuitionDetailsState
        title="Unable to load tuition"
        description={
          errorMessage ||
          "Please try again later. This tuition could not be loaded."
        }
        onBack={() => navigate(-1)}
      />
    );
  }

  if (!tuition) {
    return (
      <TuitionDetailsState
        title="Tuition not found"
        description="The tuition you are looking for does not exist or may have been removed."
        onBack={() => navigate(-1)}
      />
    );
  }

  const primaryDetails: DetailItem[] = [
    { label: "Category", value: tuition.category, icon: FiTag },
    { label: "Course", value: tuition.courseLevel, icon: FiBookOpen },
    { label: "Salary", value: tuition.salary, icon: FiDollarSign },
    { label: "Tuition Type", value: tuition.tutoringType, icon: FiMapPin },
  ];

  const scheduleDetails: DetailItem[] = [
    { label: "Days per week", value: tuition.daysPerWeek, icon: FiCalendar },
    { label: "Preferred days", value: tuition.preferredDays, icon: FiCalendar },
    { label: "Preferred time", value: tuition.preferredTime, icon: FiClock },
    { label: "Students", value: tuition.numberOfStudents, icon: FiUsers },
  ];

  const preferenceDetails: DetailItem[] = [
    { label: "Student Gender", value: tuition.studentGender, icon: FiUsers },
    { label: "Tutor Gender", value: tuition.tutorGender, icon: FiUserCheck },
    {
      label: "Qualification",
      value: tuition.tutorQualification,
      icon: FiBookOpen,
    },
    {
      label: "Experience",
      value: tuition.tutorExperience,
      icon: FiUserCheck,
    },
  ];

  return (
    <section className="bg-page px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="border-brand-100/80 bg-surface-elevated text-text-strong shadow-theme-sm hover:border-brand-300 hover:text-brand-700 focus:ring-brand-400 focus:ring-offset-page dark:border-border dark:hover:text-brand-300 mb-6 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          <FiArrowLeft size={16} aria-hidden="true" />
          Back
        </button>

        <article className="border-brand-200/70 bg-surface-elevated shadow-theme-md dark:border-border overflow-hidden rounded-3xl border">
          <header className="bg-brand-50/70 dark:bg-brand-500/6 relative overflow-hidden px-5 py-8 sm:px-8 lg:px-10">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-surface-elevated text-brand-700 shadow-theme-sm dark:bg-brand-500/10 dark:text-brand-300 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                  <FiClock size={14} aria-hidden="true" />
                  {tuition.status}
                </span>

                <span className="bg-surface-elevated text-brand-700 shadow-theme-sm dark:bg-brand-500/10 dark:text-brand-300 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                  <FiHash size={14} aria-hidden="true" />
                  ID {tuition.id}
                </span>
              </div>

              <h1 className="text-text-strong mt-5 max-w-4xl text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">
                {tuition.title}
              </h1>
            </div>
          </header>

          <div className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_360px] lg:px-10">
            <div className="space-y-8">
              <section>
                <SectionTitle icon={FiCheckCircle} title="Tuition overview" />
                <DetailGrid items={primaryDetails} tuitionId={tuition.id} />
              </section>

              <section>
                <SectionTitle icon={FiCalendar} title="Tutor preference" />
                <DetailGrid items={preferenceDetails} tuitionId={tuition.id} />
              </section>

              <section>
                <SectionTitle icon={FiCalendar} title="Schedule details" />
                <DetailGrid items={scheduleDetails} tuitionId={tuition.id} />
              </section>

              <section className="border-brand-100/70 bg-surface-subtle/60 dark:border-border dark:bg-brand-500/[0.04] rounded-3xl border p-5">
                <SectionTitle icon={FiBookOpen} title="Subjects" />

                {tuition.subjects.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tuition.subjects.map((subject) => (
                      <span
                        key={`${tuition.id}-${subject}`}
                        className="bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-text-muted mt-4 text-sm">
                    No subjects listed.
                  </p>
                )}
              </section>

              <section className="border-brand-100/70 bg-surface-elevated dark:border-border rounded-3xl border p-5">
                <SectionTitle
                  icon={FiMessageSquare}
                  title="Special requirements"
                />
                <p className="text-text-muted mt-4 text-sm leading-7 sm:text-base">
                  {tuition.specialRequirements}
                </p>
              </section>
            </div>

            <aside className="space-y-5">
              <SectionTitle icon={FiCheckCircle} title="Summary" />
              <section className="border-brand-100/70 bg-brand-50/50 dark:border-border dark:bg-brand-500/6 rounded-3xl border p-5">
                <h2 className="text-text-strong text-lg font-bold">
                  Quick summary
                </h2>
                <dl className="mt-4 space-y-4">
                  <SummaryRow label="Status" value={tuition.status} />
                  <SummaryRow label="Days" value={tuition.daysPerWeek} />
                  <SummaryRow label="Time" value={tuition.preferredTime} />
                  <SummaryRow
                    label="Students"
                    value={tuition.numberOfStudents}
                  />
                </dl>
              </section>

              <aside className="border-brand-100/80 bg-surface-elevated shadow-theme-sm dark:border-border rounded-3xl border p-5">
                <p className="text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-[0.16em] uppercase">
                  Salary
                </p>
                <p className="text-text-strong mt-2 text-3xl font-bold">
                  {tuition.salary}
                </p>

                <div className="border-brand-100/70 bg-brand-50/50 dark:border-border dark:bg-brand-500/6 mt-5 rounded-2xl border p-4">
                  <div className="text-brand-700 dark:text-brand-300 flex items-center gap-2 text-xs font-semibold">
                    <FiMapPin size={15} aria-hidden="true" />
                    Location
                  </div>
                  <p className="text-text-strong mt-2 text-sm leading-6">
                    {tuition.address}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/tuitions/${tuition.id}/apply`)}
                  className="bg-brand-600 text-text-on-brand hover:bg-brand-700 focus:ring-brand-400 focus:ring-offset-surface-elevated mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  Apply now
                </button>
              </aside>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
};

const TuitionDetailsState = ({
  title,
  description,
  onBack,
}: {
  title: string;
  description?: string;
  onBack?: () => void;
}) => (
  <section className="bg-page px-4 py-20 sm:px-6 lg:px-8">
    <div className="border-brand-200/70 bg-surface-elevated shadow-theme-md dark:border-border mx-auto max-w-3xl rounded-3xl border p-8 text-center">
      <h2 className="text-text-strong text-2xl font-bold">{title}</h2>
      {description ? (
        <p className="text-text-muted mx-auto mt-3 max-w-md text-sm leading-6">
          {description}
        </p>
      ) : null}

      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="bg-brand-600 text-text-on-brand hover:bg-brand-700 focus:ring-brand-400 focus:ring-offset-page mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          <FiArrowLeft size={16} aria-hidden="true" />
          Go back
        </button>
      ) : null}
    </div>
  </section>
);

const SectionTitle = ({
  icon: Icon,
  title,
}: {
  icon: IconType;
  title: string;
}) => (
  <div className="flex items-center gap-2">
    <Icon
      className="text-brand-600 dark:text-brand-300"
      size={18}
      aria-hidden="true"
    />
    <h2 className="text-text-strong text-lg font-bold">{title}</h2>
  </div>
);

const DetailGrid = ({
  items,
  tuitionId,
}: {
  items: DetailItem[];
  tuitionId: string;
}) => (
  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
    {items.map((item) => {
      const Icon = item.icon;

      return (
        <div
          key={`${tuitionId}-${item.label}`}
          className="border-brand-100/70 bg-brand-50/40 dark:border-border dark:bg-brand-500/6 rounded-2xl border p-4"
        >
          <div className="text-brand-700 dark:text-brand-300 flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
            <Icon size={15} aria-hidden="true" />
            <span>{item.label}</span>
          </div>

          <p className="text-text-strong mt-2 text-base font-semibold">
            {item.value}
          </p>
        </div>
      );
    })}
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="border-brand-100/70 dark:border-border flex items-start justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0">
    <dt className="text-text-muted text-sm">{label}</dt>
    <dd className="text-text-strong text-right text-sm font-semibold">
      {value}
    </dd>
  </div>
);

export default TuitionDetails;
