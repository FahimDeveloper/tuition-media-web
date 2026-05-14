import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import {
  JobBoardState,
  useTuitionJobDetails,
} from "@/components/common/job-board";
import { useApplyTuitionJob } from "@/hooks/useApplyTuitionJob";
import type { IconType } from "react-icons";
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
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

type DetailItem = {
  label: string;
  value: string;
  icon: IconType;
};

export default function JobBoardDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { tuition, isLoading, isError, errorMessage } =
    useTuitionJobDetails(id);
  const {
    handleApply,
    isApplying,
    isCheckingAppliedJobs,
    isApplyDisabled,
    applyButtonLabel,
    appliedJobsErrorMessage,
  } = useApplyTuitionJob(id ?? "");

  if (isLoading) {
    return <DashboardDetailsState title="Loading tuition details..." />;
  }

  if (isError) {
    return (
      <DashboardDetailsState
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
      <DashboardDetailsState
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
    <>
      <PageMeta
        title={`${tuition.title} | TutoriumBD Job Board`}
        description="Review tuition job details from the TutoriumBD dashboard job board."
      />
      <div className="border-border bg-surface-elevated rounded-2xl border p-5 lg:p-6">
        <PageBreadcrumb pageTitle="Job Details" />

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="border-border bg-surface-elevated text-text-strong shadow-theme-xs hover:border-brand-300 hover:text-brand-700 focus:ring-brand-400 focus:ring-offset-surface-elevated dark:hover:text-brand-300 mb-5 inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-semibold transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          <FiArrowLeft size={16} aria-hidden="true" />
          Back
        </button>

        <article className="border-border bg-surface-muted/40 overflow-hidden rounded-2xl border">
          <header className="border-border bg-surface-elevated border-b px-5 py-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                <FiClock size={14} aria-hidden="true" />
                {tuition.status}
              </span>
              <span className="bg-surface-muted text-text-muted inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                <FiHash size={14} aria-hidden="true" />
                ID {tuition.id}
              </span>
            </div>

            <h1 className="text-text-strong mt-4 max-w-4xl text-2xl leading-tight font-semibold lg:text-3xl">
              {tuition.title}
            </h1>
          </header>

          <div className="grid gap-6 p-5 lg:grid-cols-[1fr_320px] lg:p-6">
            <div className="space-y-6">
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

              <section className="border-border bg-surface-elevated rounded-2xl border p-4">
                <SectionTitle icon={FiBookOpen} title="Subjects" />
                {tuition.subjects.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tuition.subjects.map((subject) => (
                      <span
                        key={`${tuition.id}-${subject}`}
                        className="border-border bg-surface-muted text-text-strong inline-flex items-center rounded-lg border px-2.5 py-1.5 text-xs font-medium"
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

              <section className="border-border bg-surface-elevated rounded-2xl border p-4">
                <SectionTitle
                  icon={FiMessageSquare}
                  title="Special requirements"
                />
                <p className="text-text-muted mt-4 text-sm leading-7">
                  {tuition.specialRequirements}
                </p>
              </section>
            </div>

            <aside className="space-y-4">
              <section className="border-border bg-surface-elevated rounded-2xl border p-4">
                <h2 className="text-text-strong text-base font-semibold">
                  Quick summary
                </h2>
                <dl className="mt-4 space-y-3">
                  <SummaryRow label="Status" value={tuition.status} />
                  <SummaryRow label="Days" value={tuition.daysPerWeek} />
                  <SummaryRow label="Time" value={tuition.preferredTime} />
                  <SummaryRow
                    label="Students"
                    value={tuition.numberOfStudents}
                  />
                </dl>
              </section>

              <section className="border-border bg-surface-elevated shadow-theme-sm rounded-2xl border p-4">
                <p className="text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-[0.14em] uppercase">
                  Salary
                </p>
                <p className="text-text-strong mt-2 text-2xl font-semibold">
                  {tuition.salary}
                </p>

                <div className="border-border bg-surface-muted/70 mt-4 rounded-xl border p-3">
                  <div className="text-text-muted flex items-center gap-2 text-xs font-semibold">
                    <FiMapPin size={15} aria-hidden="true" />
                    Location
                  </div>
                  <p className="text-text-strong mt-2 text-sm leading-6">
                    {tuition.address}
                  </p>
                </div>
              </section>

              <section className="border-brand-100/80 bg-brand-50/50 dark:border-border dark:bg-brand-500/6 rounded-2xl border p-4">
                <p className="text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-[0.14em] uppercase">
                  Apply for this job
                </p>
                <h2 className="text-text-strong mt-2 text-base font-semibold">
                  Application action
                </h2>
                <p className="text-text-muted mt-2 text-sm leading-6">
                  Submit your tutor profile for job ID {tuition.id}.
                </p>
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={isApplyDisabled}
                  aria-busy={isApplying || isCheckingAppliedJobs}
                  className="bg-brand-600 text-text-on-brand hover:bg-brand-700 focus:ring-brand-400 focus:ring-offset-surface-elevated disabled:bg-brand-600/60 mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:hover:bg-brand-600/60"
                >
                  {applyButtonLabel}
                </button>
                {appliedJobsErrorMessage ? (
                  <p className="text-error-600 dark:text-error-400 mt-3 text-sm leading-6">
                    {appliedJobsErrorMessage}
                  </p>
                ) : null}
              </section>
            </aside>
          </div>
        </article>
      </div>
    </>
  );
}

const DashboardDetailsState = ({
  title,
  description,
  onBack,
}: {
  title: string;
  description?: string;
  onBack?: () => void;
}) => (
  <div className="border-border bg-surface-elevated rounded-2xl border p-5 lg:p-6">
    <JobBoardState
      title={title}
      description={description}
      panelClassName="border-border bg-surface-muted/70 max-w-none rounded-2xl shadow-none"
      titleClassName="text-xl font-semibold"
    />
    {onBack ? (
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onBack}
          className="bg-brand-600 text-text-on-brand hover:bg-brand-700 focus:ring-brand-400 focus:ring-offset-surface-elevated inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          <FiArrowLeft size={16} aria-hidden="true" />
          Go back
        </button>
      </div>
    ) : null}
  </div>
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
      size={17}
      aria-hidden="true"
    />
    <h2 className="text-text-strong text-base font-semibold">{title}</h2>
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
          className="border-border bg-surface-elevated rounded-xl border p-3"
        >
          <div className="text-text-muted flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
            <Icon size={14} aria-hidden="true" />
            <span>{item.label}</span>
          </div>

          <p className="text-text-strong mt-2 text-sm font-semibold">
            {item.value}
          </p>
        </div>
      );
    })}
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="border-border flex items-start justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0">
    <dt className="text-text-muted text-sm">{label}</dt>
    <dd className="text-text-strong text-right text-sm font-semibold">
      {value}
    </dd>
  </div>
);
