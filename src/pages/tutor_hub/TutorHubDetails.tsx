import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiHash,
  FiMapPin,
  FiRefreshCw,
  FiSend,
  FiShield,
  FiTag,
  FiUser,
  FiUserCheck,
} from "react-icons/fi";

import { useMockPublicTeacherByIdQuery } from "@/mocks/tutor/tutorMock";
import type { PublicTeacher, TeacherEducation } from "@/types";
import {
  formatPublicTeacherAvailability,
  formatPublicTeacherGender,
  formatPublicTeacherList,
  formatPublicTeacherLocation,
  formatPublicTeacherSalary,
  formatPublicTeacherStatus,
  formatPublicTeacherTutoringType,
  formatPublicTeacherValue,
  getPublicTeacherInitials,
} from "@/utils/public-teacher.utils";
import type { IconType } from "react-icons";

type DetailItem = {
  label: string;
  value: string;
  icon: IconType;
};

type SummaryItem = {
  label: string;
  value: string;
};

type TeacherDetailsView = {
  id: string;
  name: string;
  status: string;
  about: string;
  summary: SummaryItem[];
  overviewDetails: DetailItem[];
  tutoringDetails: DetailItem[];
  locationDetails: DetailItem[];
  profileDetails: DetailItem[];
  education: EducationItem[];
};

type EducationItem = {
  level: string;
  name: string;
  status?: string;
  details: Array<{
    label: string;
    value: string;
  }>;
};

type EducationRecord =
  | NonNullable<TeacherEducation["school"]>
  | NonNullable<TeacherEducation["college"]>
  | NonNullable<TeacherEducation["diploma"]>
  | NonNullable<TeacherEducation["graduation"]>
  | NonNullable<TeacherEducation["post_graduation"]>;

const TutorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  /*
   * RTK Query handoff point:
   * Replace this mock hook with useGetPublicTeacherByIdQuery(id) later.
   */
  const { data: teacher, isLoading, isError, error, refetch } =
    useMockPublicTeacherByIdQuery(id);

  const tutor = useMemo(
    () => (teacher ? toTeacherDetailsView(teacher) : undefined),
    [teacher],
  );

  if (isLoading) {
    return <TutorDetailsState title="Loading tutor details..." />;
  }

  if (isError) {
    return (
      <TutorDetailsState
        title="Unable to load tutor"
        description={getErrorMessage(error)}
        onBack={() => navigate(-1)}
        onRetry={refetch}
      />
    );
  }

  if (!tutor) {
    return (
      <TutorDetailsState
        title="Tutor not found"
        description="The tutor you are looking for does not exist or may have been removed."
        onBack={() => navigate(-1)}
      />
    );
  }

  return (
    <section className="bg-page px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <BackButton onClick={() => navigate(-1)} />

        <article className="border-brand-200/70 bg-surface-elevated shadow-theme-md dark:border-border overflow-hidden rounded-3xl border">
          <TutorHeader tutor={tutor} />

          <div className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_360px] lg:px-10">
            <TutorMainContent tutor={tutor} />

            <aside className="lg:sticky lg:top-6 lg:self-start">
              <ProfileSummaryCard
                summary={tutor.summary}
                onContact={() => navigate(`/contact-us?tutorId=${tutor.id}`)}
              />
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
};

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="border-brand-100/80 bg-surface-elevated text-text-strong shadow-theme-sm hover:border-brand-300 hover:text-brand-700 focus:ring-brand-400 focus:ring-offset-page dark:border-border dark:hover:text-brand-300 mb-6 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
  >
    <FiArrowLeft size={16} aria-hidden="true" />
    Back
  </button>
);

const TutorHeader = ({ tutor }: { tutor: TeacherDetailsView }) => (
  <header className="from-brand-50/80 via-surface-elevated to-brand-100/70 dark:from-brand-500/10 dark:via-surface-elevated dark:to-brand-500/5 relative overflow-hidden bg-gradient-to-br px-5 py-8 sm:px-8 lg:px-10">
    <div
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(102,153,207,0.22),transparent_40%),radial-gradient(circle_at_top_right,rgba(63,114,175,0.14),transparent_38%)]"
      aria-hidden="true"
    />

    <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center">
      <Avatar name={tutor.name} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill icon={FiClock} label={tutor.status} />
          <StatusPill icon={FiHash} label={`ID ${tutor.id}`} />
        </div>

        <h1 className="text-text-strong mt-5 max-w-4xl text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">
          {tutor.name}
        </h1>

        <p className="text-text-muted mt-4 max-w-4xl text-sm leading-7 sm:text-base">
          {tutor.about}
        </p>
      </div>
    </div>
  </header>
);

const Avatar = ({ name }: { name: string }) => (
  <div className="from-brand-600 to-brand-400 text-text-on-brand shadow-theme-md flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br text-2xl font-black sm:h-24 sm:w-24 sm:text-3xl">
    {getPublicTeacherInitials(name)}
  </div>
);

const TutorMainContent = ({ tutor }: { tutor: TeacherDetailsView }) => (
  <div className="space-y-8">
    <DetailsSection
      icon={FiCheckCircle}
      title="Tutor overview"
      items={tutor.overviewDetails}
      itemId={tutor.id}
    />

    <DetailsSection
      icon={FiBookOpen}
      title="Tutoring preference"
      items={tutor.tutoringDetails}
      itemId={tutor.id}
    />

    <DetailsSection
      icon={FiMapPin}
      title="Preferred location"
      items={tutor.locationDetails}
      itemId={tutor.id}
    />

    <DetailsSection
      icon={FiUser}
      title="Profile details"
      items={tutor.profileDetails}
      itemId={tutor.id}
    />

    <EducationSection education={tutor.education} />
  </div>
);

const DetailsSection = ({
  icon,
  title,
  items,
  itemId,
}: {
  icon: IconType;
  title: string;
  items: DetailItem[];
  itemId: string;
}) => (
  <section>
    <SectionTitle icon={icon} title={title} />
    <DetailGrid items={items} itemId={itemId} />
  </section>
);

const EducationSection = ({ education }: { education: EducationItem[] }) => (
  <section className="border-brand-100/70 bg-surface-subtle/60 dark:border-border dark:bg-brand-500/4 rounded-3xl border p-5">
    <SectionTitle icon={FiAward} title="Education" />

    {education.length > 0 ? (
      <div className="mt-4 space-y-4">
        {education.map((item) => (
          <EducationCard key={item.level} item={item} />
        ))}
      </div>
    ) : (
      <p className="text-text-muted mt-4 text-sm">
        No education information listed.
      </p>
    )}
  </section>
);

const ProfileSummaryCard = ({
  summary,
  onContact,
}: {
  summary: SummaryItem[];
  onContact: () => void;
}) => (
  <section className="border-brand-100/80 bg-surface-elevated shadow-theme-sm dark:border-border rounded-3xl border p-5">
    <SectionTitle icon={FiCheckCircle} title="Profile summary" />

    <dl className="mt-5 space-y-4">
      {summary.map((item) => (
        <SummaryRow key={item.label} label={item.label} value={item.value} />
      ))}
    </dl>

    <div className="border-brand-100/70 bg-brand-50/50 dark:border-border dark:bg-brand-500/6 mt-5 rounded-2xl border p-4">
      <div className="text-brand-700 dark:text-brand-300 flex items-center gap-2 text-xs font-semibold">
        <FiShield size={15} aria-hidden="true" />
        Contact policy
      </div>
      <p className="text-text-muted mt-2 text-sm leading-6">
        Users cannot contact tutors directly. Send your request to our team for
        the next step.
      </p>
    </div>

    <button
      type="button"
      onClick={onContact}
      className="bg-brand-600 text-text-on-brand hover:bg-brand-700 focus:ring-brand-400 focus:ring-offset-surface-elevated mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
    >
      <FiSend size={16} aria-hidden="true" />
      Contact us
    </button>
  </section>
);

const TutorDetailsState = ({
  title,
  description,
  onBack,
  onRetry,
}: {
  title: string;
  description?: string;
  onBack?: () => void;
  onRetry?: () => void;
}) => (
  <section className="bg-page px-4 py-20 sm:px-6 lg:px-8">
    <div className="border-brand-200/70 bg-surface-elevated shadow-theme-md dark:border-border mx-auto max-w-3xl rounded-3xl border p-8 text-center">
      <div className="bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
        <FiAlertCircle size={24} aria-hidden="true" />
      </div>

      <h2 className="text-text-strong mt-5 text-2xl font-bold">{title}</h2>
      {description ? (
        <p className="text-text-muted mx-auto mt-3 max-w-md text-sm leading-6">
          {description}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="bg-brand-600 text-text-on-brand hover:bg-brand-700 focus:ring-brand-400 focus:ring-offset-page inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <FiRefreshCw size={16} aria-hidden="true" />
            Try again
          </button>
        ) : null}

        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="border-brand-100/80 bg-surface-elevated text-text-strong hover:border-brand-300 hover:text-brand-700 focus:ring-brand-400 focus:ring-offset-page dark:border-border dark:hover:text-brand-300 inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <FiArrowLeft size={16} aria-hidden="true" />
            Go back
          </button>
        ) : null}
      </div>
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
  itemId,
}: {
  items: DetailItem[];
  itemId: string;
}) => (
  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
    {items.map((item) => {
      const Icon = item.icon;

      return (
        <div
          key={`${itemId}-${item.label}`}
          className="border-brand-100/70 from-brand-50/70 to-surface-elevated dark:border-border dark:from-brand-500/8 dark:to-surface-elevated rounded-2xl border bg-gradient-to-br p-4"
        >
          <div className="text-brand-700 dark:text-brand-300 flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
            <Icon size={15} aria-hidden="true" />
            <span>{item.label}</span>
          </div>

          <p className="text-text-strong mt-2 text-base font-semibold break-words">
            {item.value}
          </p>
        </div>
      );
    })}
  </div>
);

const EducationCard = ({ item }: { item: EducationItem }) => (
  <article className="border-brand-100/70 bg-surface-elevated dark:border-border rounded-2xl border p-4">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-brand-700 dark:text-brand-300 text-[11px] font-semibold tracking-[0.14em] uppercase">
          {item.level}
        </p>
        <h3 className="text-text-strong mt-1 text-base font-bold">
          {item.name}
        </h3>
      </div>

      {item.status ? (
        <span className="bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 inline-flex w-fit items-center rounded-xl px-3 py-1.5 text-xs font-bold">
          {item.status}
        </span>
      ) : null}
    </div>

    <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {item.details.map((detail) => (
        <div key={`${item.level}-${detail.label}`}>
          <dt className="text-text-muted text-xs font-semibold tracking-wide uppercase">
            {detail.label}
          </dt>
          <dd className="text-text-strong mt-1 text-sm font-semibold">
            {detail.value}
          </dd>
        </div>
      ))}
    </dl>
  </article>
);

const StatusPill = ({
  icon: Icon,
  label,
}: {
  icon: IconType;
  label: string;
}) => (
  <span className="bg-surface-elevated text-brand-700 shadow-theme-sm dark:bg-brand-500/10 dark:text-brand-300 inline-flex max-w-full items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
    <Icon className="shrink-0" size={14} aria-hidden="true" />
    <span className="truncate">{label}</span>
  </span>
);

const SummaryRow = ({ label, value }: SummaryItem) => (
  <div className="border-brand-100/70 dark:border-border flex items-start justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0">
    <dt className="text-text-muted text-sm">{label}</dt>
    <dd className="text-text-strong text-right text-sm font-semibold">
      {value}
    </dd>
  </div>
);

const toTeacherDetailsView = (teacher: PublicTeacher): TeacherDetailsView => {
  const tutoring = teacher.preferred_tutoring;
  const location = teacher.preferred_teaching_locations;
  const salary = formatPublicTeacherSalary(tutoring?.salary_range);
  const availability = formatPublicTeacherAvailability(
    teacher.tutoring_availability?.days,
  );
  const experience = `${formatPublicTeacherValue(
    teacher.years_of_experience,
    "0",
  )} years experience`;
  const subjects = formatPublicTeacherList(tutoring?.subjects);
  const tutoringType = formatPublicTeacherList(
    tutoring?.tutoring_types?.map(formatPublicTeacherTutoringType),
  );

  return {
    id: teacher._id,
    name: formatPublicTeacherValue(teacher.full_name, "Unnamed tutor"),
    status: teacher.is_active ? "Active" : "Inactive",
    about: teacher.about_me || "No tutor bio has been added yet.",
    summary: [
      { label: "Salary", value: salary },
      { label: "Experience", value: experience },
      { label: "Availability", value: availability },
      { label: "Subjects", value: subjects },
    ],
    overviewDetails: cleanDetails([
      { label: "Salary", value: salary, icon: FiDollarSign },
      { label: "Availability", value: availability, icon: FiClock },
      { label: "Experience", value: experience, icon: FiUserCheck },
      { label: "Tutoring type", value: tutoringType, icon: FiMapPin },
    ]),
    tutoringDetails: cleanDetails([
      {
        label: "Categories",
        value: formatPublicTeacherList(tutoring?.categories),
        icon: FiTag,
      },
      {
        label: "Course",
        value: formatPublicTeacherList(tutoring?.courses),
        icon: FiBookOpen,
      },
      { label: "Subjects", value: subjects, icon: FiAward },
    ]),
    locationDetails: cleanDetails([
      {
        label: "Country",
        value: formatPublicTeacherValue(location?.country),
        icon: FiMapPin,
      },
      {
        label: "City",
        value: formatPublicTeacherValue(location?.city),
        icon: FiMapPin,
      },
      {
        label: "Preferred area",
        value: formatPublicTeacherList(location?.area),
        icon: FiMapPin,
      },
      {
        label: "Location",
        value: formatPublicTeacherLocation(location),
        icon: FiMapPin,
      },
    ]),
    profileDetails: cleanDetails([
      {
        label: "Gender",
        value: formatPublicTeacherGender(teacher.gender),
        icon: FiUser,
      },
      {
        label: "Verification",
        value: teacher.is_verified ? "Verified" : "New",
        icon: FiCheckCircle,
      },
      {
        label: "Profile status",
        value: teacher.is_active ? "Active" : "Inactive",
        icon: FiUserCheck,
      },
    ]),
    education: buildEducationItems(teacher.education),
  };
};

const buildEducationItems = (education?: TeacherEducation): EducationItem[] => {
  if (!education) return [];

  return [
    createEducationItem("School", education.school, [
      ["Group", education.school?.group],
      ["Curriculum", education.school?.curriculum],
      ["Board", education.school?.board],
      ["GPA", education.school?.gpa],
      ["Passing year", education.school?.year_of_passing],
    ]),
    createEducationItem("College", education.college, [
      ["Group", education.college?.group],
      ["Curriculum", education.college?.curriculum],
      ["Board", education.college?.board],
      ["GPA", education.college?.gpa],
      ["Passing year", education.college?.year_of_passing],
    ]),
    createEducationItem("Diploma", education.diploma, [
      ["Type", education.diploma?.type],
      ["Department", education.diploma?.department],
      ["Study level", education.diploma?.study_level],
      ["CGPA", education.diploma?.cgpa],
      ["Session", education.diploma?.session],
    ]),
    createEducationItem("Graduation", education.graduation, [
      ["Department", education.graduation?.department],
      ["Type", education.graduation?.type],
      ["Study level", education.graduation?.study_level],
      ["GPA", education.graduation?.gpa],
      ["Session", education.graduation?.session],
    ]),
    createEducationItem("Post graduation", education.post_graduation, [
      ["Department", education.post_graduation?.department],
      ["Type", education.post_graduation?.type],
      ["Study level", education.post_graduation?.study_level],
      ["GPA", education.post_graduation?.gpa],
      ["Session", education.post_graduation?.session],
    ]),
  ].filter((item) => item.name !== "N/A" || item.details.length > 0);
};

const createEducationItem = (
  level: string,
  education: EducationRecord | undefined,
  details: Array<[string, string | number | undefined]>,
): EducationItem => ({
  level,
  name: formatPublicTeacherValue(education?.name),
  status:
    education && "status" in education
      ? formatPublicTeacherStatus(education.status)
      : undefined,
  details: cleanEducationDetails(
    details.map(([label, value]) => ({
      label,
      value: formatPublicTeacherValue(value),
    })),
  ),
});

const cleanDetails = (items: DetailItem[]) =>
  items.filter((item) => item.value !== "N/A");

const cleanEducationDetails = (items: EducationItem["details"]) =>
  items.filter((item) => item.value !== "N/A");

const getErrorMessage = (error: unknown) => {
  if (typeof error === "object" && error && "message" in error) {
    const message = (error as { message?: string }).message;
    if (message) return message;
  }

  return "Please try again later. This tutor profile could not be loaded.";
};

export default TutorDetails;
