import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiAward,
  FiBookOpen,
  FiCalendar,
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

type TeacherQueryState = {
  teacher?: Teacher;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  refetch: () => void;
};

const TutorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  /*
   * RTK Query handoff point:
   * Keep the UI below unchanged and replace useTeacherDetails(id) later.
   */
  const { teacher, isLoading, isError, errorMessage, refetch } =
    useTeacherDetails(id);

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
        description={
          errorMessage ||
          "Please try again later. This tutor profile could not be loaded."
        }
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

/*
 * MOCK DATA SOURCE FOR NOW
 *
 * RTK Query handoff point for later:
 * 1. Import your generated hook, for example:
 *    import { useSingleTeacherQuery } from "@/redux/features/teacher/teacherApi";
 *
 * 2. Replace the function body below with:
 *    const { data, isLoading, isError, error, refetch } =
 *      useSingleTeacherQuery(id as string, { skip: !id });
 *
 *    return {
 *      teacher: data?.results,
 *      isLoading,
 *      isError: !id || isError,
 *      errorMessage: !id ? "Tutor id is missing." : getErrorMessage(error),
 *      refetch,
 *    };
 */
const useTeacherDetails = (id?: string): TeacherQueryState => ({
  teacher: id ? mockTeacherResponse.results : undefined,
  isLoading: false,
  isError: !id,
  errorMessage: !id ? "Tutor id is missing." : "",
  refetch: () => undefined,
});

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
    {getInitials(name)}
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

const toTeacherDetailsView = (teacher: Teacher): TeacherDetailsView => {
  const tutoring = teacher.preferred_tutoring;
  const location = teacher.preferred_teaching_locations;
  const availabilityCount = teacher.tutoring_availability?.days?.length || 0;

  const salary = formatSalary(
    tutoring?.salary_range?.min,
    tutoring?.salary_range?.max,
  );
  const availability = formatAvailability(availabilityCount);
  const experience = `${formatValue(teacher.years_of_experience, "0")} years experience`;
  const subjects = toCommaText(tutoring?.subjects);
  const tutoringType = toCommaText(
    tutoring?.tutoring_types?.map(formatTutoringType),
  );
  const shortLocation = formatLocation(location);

  return {
    id: teacher._id,
    name: formatValue(teacher.full_name, "Unnamed tutor"),
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
        value: toCommaText(tutoring?.categories),
        icon: FiTag,
      },
      {
        label: "Course",
        value: toCommaText(tutoring?.courses),
        icon: FiBookOpen,
      },
      { label: "Subjects", value: subjects, icon: FiAward },
    ]),
    locationDetails: cleanDetails([
      {
        label: "Country",
        value: formatValue(location?.country),
        icon: FiMapPin,
      },
      { label: "City", value: formatValue(location?.city), icon: FiMapPin },
      {
        label: "Preferred area",
        value: toCommaText(location?.area),
        icon: FiMapPin,
      },
      {
        label: "Present address",
        value: formatValue(teacher.preset_address),
        icon: FiMapPin,
      },
    ]),
    profileDetails: cleanDetails([
      { label: "Gender", value: formatValue(teacher.gender), icon: FiUser },
      {
        label: "Date of birth",
        value: formatDate(teacher.date_of_birth),
        icon: FiCalendar,
      },
      {
        label: "Blood group",
        value: formatValue(teacher.blood_group),
        icon: FiUser,
      },
    ]),
    education: buildEducationItems(teacher.education),
  };
};

const buildEducationItems = (education?: Education): EducationItem[] => {
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
  education?: BasicEducation | HigherEducation,
  details: Array<[string, string | number | undefined]>,
): EducationItem => ({
  level,
  name: formatValue(education?.name),
  status:
    "status" in (education || {}) ? formatStatus(education?.status) : undefined,
  details: cleanEducationDetails(
    details.map(([label, value]) => ({
      label,
      value: formatValue(value),
    })),
  ),
});

const cleanDetails = (items: DetailItem[]) =>
  items.filter((item) => item.value !== "N/A");

const cleanEducationDetails = (items: EducationItem["details"]) =>
  items.filter((item) => item.value !== "N/A");

const getInitials = (name: string) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "T";
};

const formatAvailability = (days: number) => {
  if (!days) return "N/A";
  return `${days} ${days === 1 ? "day" : "days"} / week`;
};

const formatLocation = (location?: PreferredTeachingLocations) => {
  const formatted = [
    toCommaText(location?.area),
    location?.city,
    location?.country,
  ]
    .filter((item) => item && item !== "N/A")
    .join(", ");

  return formatted || "Location not specified";
};

const toCommaText = (items?: Array<string | number | null | undefined>) =>
  items
    ?.map((item) => formatValue(item))
    .filter((item) => item !== "N/A")
    .join(", ") || "N/A";

const formatTutoringType = (value: string) =>
  value
    .split("_")
    .map((word) => capitalize(word))
    .join(" ");

const formatValue = (value?: string | number | null, fallback = "N/A") => {
  if (value === undefined || value === null || value === "") return fallback;
  return String(value);
};

const formatStatus = (value?: string) => {
  if (!value) return undefined;
  return value
    .split("_")
    .map((word) => capitalize(word))
    .join(" ");
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-BD").format(value);

const formatSalary = (min?: number, max?: number) => {
  if (!min && !max) return "N/A";
  if (min && max) return `৳${formatNumber(min)} - ৳${formatNumber(max)}`;
  return `৳${formatNumber(min || max || 0)}`;
};

const formatDate = (value?: string) => {
  if (!value) return "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

/*
 * Keep this helper for RTK Query later.
 * It reads common RTK Query error shapes and returns a user-friendly message.
 */
const getErrorMessage = (error: unknown) => {
  if (!error) return undefined;

  if (typeof error === "object" && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }

  if (typeof error === "object" && "error" in error) {
    const message = (error as { error?: string }).error;
    if (message) return message;
  }

  return "Something went wrong while loading this tutor profile.";
};

const mockTeacherResponse: TeacherApiResponse = {
  message: "Teacher retrieved successfully!",
  results: {
    preferred_teaching_locations: {
      country: "Bangladesh",
      city: "Chapai Nawabganj",
      area: ["Manaksha"],
    },
    preferred_tutoring: {
      salary_range: {
        min: 4000,
        max: 7000,
      },
      categories: ["Bangla Medium", "English Medium"],
      courses: ["Pre-Schooling"],
      subjects: ["Bangla"],
      tutoring_types: ["home_tuition", "online_tuition", "group_tuition"],
    },
    education: {
      school: {
        name: "Savar cantonment school and college",
        group: "Science",
        curriculum: "English Version",
        board: "Chattogram",
        gpa: "5",
        year_of_passing: 2017,
      },
      college: {
        name: "Alaipur digree college",
        group: "Business Studies",
        curriculum: "Bangla Medium",
        board: "Khulna",
        status: "graduated",
        gpa: "4",
        year_of_passing: 2019,
      },
      graduation: {
        name: "University of Scholars",
        department: "BBA",
        type: "Private",
        study_level: "BBA",
        status: "studying",
        gpa: "",
        session: "2025-2026",
      },
      post_graduation: {
        name: "Savar cantonment school and college",
        department: "computer science",
        type: "Public",
        study_level: "Engineering",
        status: "graduated",
        gpa: "5",
        session: "2033-2033",
      },
    },
    tutoring_availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
    },
    parents_info: {
      father_name: "Sumon kabir",
      father_phone: "01409746020",
      mother_name: "arifa pervin",
      mother_phone: "01409746019",
      emergency_contact_name: "rifat",
      emergency_contact_phone: "01925121315",
    },
    identification: {
      type: "nid",
      number: "2419561218888888888",
    },
    _id: "69ff987d30d8fcebe57f3112",
    full_name: "Rifat kabir khan 1",
    role: "teacher",
    is_profile_completed: false,
    is_verified: false,
    is_active: true,
    is_deleted: false,
    certifications: [],
    created_at: "2026-05-09T20:26:37.447Z",
    updated_at: "2026-05-12T19:27:54.578Z",
    about_me:
      "Dedicated and student-focused tutor with a passion for making learning simple, engaging, and effective. Skilled at adapting teaching methods based on each student’s needs to help them build confidence and achieve better academic results.",
    blood_group: "O+",
    date_of_birth: "2003-12-24T00:00:00.000Z",
    gender: "female",
    marital_status: "married",
    permanent_address: "L-1/A, Main Road, South",
    preset_address: "L-1/A, Main Road, South",
    religion: "Islam",
    years_of_experience: 5,
  },
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

type TeacherApiResponse = {
  message: string;
  results: Teacher;
};

type Teacher = {
  preferred_teaching_locations?: PreferredTeachingLocations;
  preferred_tutoring?: PreferredTutoring;
  education?: Education;
  tutoring_availability?: {
    days: string[];
  };
  parents_info?: ParentsInfo;
  identification?: Identification;
  _id: string;
  full_name: string;
  role: string;
  is_profile_completed: boolean;
  is_verified: boolean;
  is_active: boolean;
  is_deleted: boolean;
  certifications: string[];
  created_at: string;
  updated_at: string;
  about_me?: string;
  blood_group?: string;
  date_of_birth?: string;
  gender?: string;
  marital_status?: string;
  permanent_address?: string;
  preset_address?: string;
  religion?: string;
  years_of_experience?: number;
};

type PreferredTeachingLocations = {
  country?: string;
  city?: string;
  area?: string[];
};

type PreferredTutoring = {
  salary_range?: {
    min?: number;
    max?: number;
  };
  categories?: string[];
  courses?: string[];
  subjects?: string[];
  tutoring_types?: string[];
};

type Education = {
  school?: BasicEducation;
  college?: BasicEducation & {
    status?: string;
  };
  graduation?: HigherEducation;
  post_graduation?: HigherEducation;
};

type BasicEducation = {
  name?: string;
  group?: string;
  curriculum?: string;
  board?: string;
  gpa?: string;
  year_of_passing?: number;
};

type HigherEducation = {
  name?: string;
  department?: string;
  type?: string;
  study_level?: string;
  status?: string;
  gpa?: string;
  session?: string;
};

type ParentsInfo = {
  father_name?: string;
  father_phone?: string;
  mother_name?: string;
  mother_phone?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
};

type Identification = {
  type?: string;
  number?: string;
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

export type { TeacherApiResponse, Teacher };
export default TutorDetails;
