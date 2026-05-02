import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiEye,
  FiHash,
  FiMapPin,
  FiMessageSquare,
  FiTag,
  FiUsers,
  FiUserCheck,
} from "react-icons/fi";

import type { IconType } from "react-icons";

type TuitionData = {
  id: string;
  title: string;
  postedDate: string;
  address: string;
  salary: string;
  daysPerWeek: number;
  category: string;
  course: string;
  subjects: string[] | string;
  tutoringTime: string;
  studentGender: string;
  duration: string;
  numOfStudents: number;
  tuitionType: string;
  tutorGender: string;
  tutorSubjectGroup: string;
  additionalNotes: string;
  totalViews: number;
  totalApplied: number;
};

type DetailItem = {
  label: string;
  value: string;
  icon: IconType;
};

const demoTuitions: TuitionData[] = [
  {
    id: "1",
    title: "Need an experienced Math tutor for Class 9 student",
    postedDate: "2026-04-20",
    address: "Mirpur DOHS, Dhaka",
    salary: "৳8,000/month",
    daysPerWeek: 4,
    category: "Science",
    course: "Class 9",
    subjects: ["Mathematics", "Physics", "Chemistry"],
    tutoringTime: "6:00 PM - 8:00 PM",
    studentGender: "Male",
    duration: "2 hours",
    numOfStudents: 1,
    tuitionType: "Home Tutoring",
    tutorGender: "Any",
    tutorSubjectGroup: "Science",
    additionalNotes:
      "Student needs a patient tutor who can explain math fundamentals clearly and help with weekly exam preparation.",
    totalViews: 128,
    totalApplied: 18,
  },
  {
    id: "2",
    title: "English medium student needs Bangla and English tutor",
    postedDate: "2026-04-22",
    address: "Dhanmondi 27, Dhaka",
    salary: "৳10,000/month",
    daysPerWeek: 3,
    category: "English Medium",
    course: "Grade 6",
    subjects: ["Bangla", "English"],
    tutoringTime: "5:00 PM - 6:30 PM",
    studentGender: "Female",
    duration: "1.5 hours",
    numOfStudents: 1,
    tuitionType: "Home Tutoring",
    tutorGender: "Female",
    tutorSubjectGroup: "Arts",
    additionalNotes:
      "Guardian prefers a tutor with English medium background and strong communication skills.",
    totalViews: 96,
    totalApplied: 11,
  },
  {
    id: "3",
    title: "Online ICT tutor required for HSC first year student",
    postedDate: "2026-04-25",
    address: "Online",
    salary: "৳6,000/month",
    daysPerWeek: 2,
    category: "College",
    course: "HSC 1st Year",
    subjects: ["ICT"],
    tutoringTime: "8:00 PM - 9:30 PM",
    studentGender: "Male",
    duration: "1.5 hours",
    numOfStudents: 1,
    tuitionType: "Online Tutoring",
    tutorGender: "Any",
    tutorSubjectGroup: "Science",
    additionalNotes:
      "Tutor should focus on practical ICT topics, board question patterns, and regular problem solving.",
    totalViews: 74,
    totalApplied: 9,
  },
];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const formatPostedDate = (postedDate: string) => {
  const parsedDate = new Date(postedDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return postedDate;
  }

  return dateFormatter.format(parsedDate);
};

const getSubjectList = (subjects: TuitionData["subjects"]) => {
  if (Array.isArray(subjects)) {
    return subjects.filter(Boolean);
  }

  return subjects
    .split(",")
    .map((subject) => subject.trim())
    .filter(Boolean);
};

const TuitionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const tuition = useMemo(
    () => demoTuitions.find((item) => item.id === id),
    [id],
  );

  if (!tuition) {
    return (
      <section className="bg-page px-4 py-20 sm:px-6 lg:px-8">
        <div className="border-brand-200/70 bg-surface-elevated shadow-theme-md dark:border-border mx-auto max-w-3xl rounded-3xl border p-8 text-center">
          <h2 className="text-text-strong text-2xl font-bold">
            Tuition not found
          </h2>
          <p className="text-text-muted mx-auto mt-3 max-w-md text-sm leading-6">
            The tuition you are looking for does not exist or may have been
            removed.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-brand-600 text-text-on-brand hover:bg-brand-700 focus:ring-brand-400 focus:ring-offset-page mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <FiArrowLeft size={16} aria-hidden="true" />
            Go back
          </button>
        </div>
      </section>
    );
  }

  const subjects = getSubjectList(tuition.subjects);

  const primaryDetails: DetailItem[] = [
    { label: "Category", value: tuition.category, icon: FiTag },
    { label: "Course", value: tuition.course, icon: FiBookOpen },
    { label: "Salary", value: tuition.salary, icon: FiDollarSign },
    { label: "Tuition Type", value: tuition.tuitionType, icon: FiMapPin },
  ];

  const scheduleDetails: DetailItem[] = [
    {
      label: "Days per week",
      value: `${tuition.daysPerWeek} days`,
      icon: FiCalendar,
    },
    { label: "Tutoring time", value: tuition.tutoringTime, icon: FiClock },
    { label: "Duration", value: tuition.duration, icon: FiClock },
    { label: "Students", value: `${tuition.numOfStudents}`, icon: FiUsers },
  ];

  const preferenceDetails: DetailItem[] = [
    { label: "Student Gender", value: tuition.studentGender, icon: FiUsers },
    { label: "Tutor Gender", value: tuition.tutorGender, icon: FiUserCheck },
    {
      label: "Tutor Group",
      value: tuition.tutorSubjectGroup,
      icon: FiBookOpen,
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
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-surface-elevated text-brand-700 shadow-theme-sm dark:bg-brand-500/10 dark:text-brand-300 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                    <FiCalendar size={14} aria-hidden="true" />
                    Posted {formatPostedDate(tuition.postedDate)}
                  </span>

                  <span className="bg-surface-elevated text-brand-700 shadow-theme-sm dark:bg-brand-500/10 dark:text-brand-300 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                    <FiHash size={14} aria-hidden="true" />
                    ID {tuition.id}
                  </span>
                </div>

                <h1 className="text-text-strong mt-5 max-w-4xl text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">
                  {tuition.title}
                </h1>

                {/* <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-brand-100/70 bg-surface-elevated/85 p-4 dark:border-border dark:bg-brand-500/6">
                  <FiMapPin
                    className="mt-1 shrink-0 text-brand-600 dark:text-brand-300"
                    size={18}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700 dark:text-brand-300">
                      Location
                    </p>
                    <p className="mt-1 text-sm leading-6 text-text-strong sm:text-base">
                      {tuition.address}
                    </p>
                  </div>
                </div> */}
              </div>
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

                {subjects.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {subjects.map((subject) => (
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
                <SectionTitle icon={FiMessageSquare} title="Additional notes" />
                <p className="text-text-muted mt-4 text-sm leading-7 sm:text-base">
                  {tuition.additionalNotes || "No additional notes provided."}
                </p>
              </section>
            </div>

            <aside className="space-y-5">
              <SectionTitle icon={FiCheckCircle} title="Summery" />
              <section className="border-brand-100/70 bg-brand-50/50 dark:border-border dark:bg-brand-500/6 rounded-3xl border p-5">
                <h2 className="text-text-strong text-lg font-bold">
                  Quick summary
                </h2>
                <dl className="mt-4 space-y-4">
                  <SummaryRow
                    label="Posted"
                    value={formatPostedDate(tuition.postedDate)}
                  />
                  <SummaryRow
                    label="Days"
                    value={`${tuition.daysPerWeek} days/week`}
                  />
                  <SummaryRow label="Time" value={tuition.tutoringTime} />
                  <SummaryRow label="Duration" value={tuition.duration} />
                  <SummaryRow
                    label="Students"
                    value={`${tuition.numOfStudents}`}
                  />
                </dl>
              </section>

              {/* TODO: NEED TO UPDATE THIS PART */}
              <aside className="border-brand-100/80 bg-surface-elevated shadow-theme-sm dark:border-border rounded-3xl border p-5">
                <p className="text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-[0.16em] uppercase">
                  Salary
                </p>
                <p className="text-text-strong mt-2 text-3xl font-bold">
                  {tuition.salary}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="bg-brand-50 dark:bg-brand-500/10 rounded-2xl p-4">
                    <div className="text-brand-700 dark:text-brand-300 flex items-center gap-2 text-xs font-semibold">
                      <FiEye size={15} aria-hidden="true" />
                      Views
                    </div>
                    <p className="text-text-strong mt-1 text-xl font-bold">
                      {tuition.totalViews}
                    </p>
                  </div>

                  <div className="bg-brand-50 dark:bg-brand-500/10 rounded-2xl p-4">
                    <div className="text-brand-700 dark:text-brand-300 flex items-center gap-2 text-xs font-semibold">
                      <FiUserCheck size={15} aria-hidden="true" />
                      Applied
                    </div>
                    <p className="text-text-strong mt-1 text-xl font-bold">
                      {tuition.totalApplied}
                    </p>
                  </div>
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

// Keeping this for later use.

// Tutor preference aside section
{
  /* <section className="rounded-3xl border border-brand-100/70 bg-surface-elevated p-5 shadow-theme-sm dark:border-border">
  <h2 className="text-lg font-bold text-text-strong">Tutor preferences</h2>
  <div className="mt-4 space-y-3">
    {preferenceDetails.map((item) => {
      const Icon = item.icon;

      return (
        <div
          key={`${tuition.id}-${item.label}`}
          className="flex items-start gap-3 rounded-2xl bg-brand-50/50 p-4 dark:bg-brand-500/[0.06]"
        >
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-elevated text-brand-700 shadow-theme-sm dark:bg-brand-500/10 dark:text-brand-300">
            <Icon size={17} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
              {item.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-text-strong">
              {item.value}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</section>; */
}
