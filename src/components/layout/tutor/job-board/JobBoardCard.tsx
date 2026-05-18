import type { IconType } from "react-icons";
import {
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiEye,
  FiMapPin,
  FiTag,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

import type { TuitionData } from "@/mocks/tuition/tuitionListings";

type JobBoardCardProps = {
  tuition: TuitionData;
};

type MetaItem = {
  label: string;
  value: string;
  icon: IconType;
};

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

export default function JobBoardCard({ tuition }: JobBoardCardProps) {
  const subjects = getSubjectList(tuition.subjects);
  const metaItems: MetaItem[] = [
    { label: "Category", value: tuition.category, icon: FiTag },
    { label: "Class", value: tuition.course, icon: FiBookOpen },
    { label: "Salary", value: tuition.salary, icon: FiDollarSign },
    { label: "Tutor", value: tuition.tutorGender, icon: FiUserCheck },
  ];

  return (
    <article className="border-border bg-surface-elevated shadow-theme-sm hover:border-brand-300/60 flex h-full flex-col rounded-2xl border p-4 transition-colors duration-200 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
              Open job
            </span>
            <span className="bg-surface-muted text-text-muted inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium">
              ID #{tuition.id}
            </span>
          </div>

          <h3 className="text-text-strong mt-3 line-clamp-2 text-base leading-6 font-semibold">
            {tuition.title}
          </h3>
        </div>

        <div className="bg-brand-50 text-brand-600 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-500/20 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1">
          <FiBookOpen className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>

      <div className="text-text-muted mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="bg-surface-muted inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5">
          <FiCalendar className="h-3.5 w-3.5" aria-hidden="true" />
          Posted {formatPostedDate(tuition.postedDate)}
        </span>
        <span className="bg-surface-muted inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5">
          <FiClock className="h-3.5 w-3.5" aria-hidden="true" />
          {tuition.tutoringTime}
        </span>
      </div>

      <div className="border-border bg-surface-muted/70 mt-4 rounded-xl border px-3 py-3">
        <div className="flex items-start gap-2.5">
          <FiMapPin
            className="text-brand-600 dark:text-brand-300 mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-text-muted text-[11px] font-semibold tracking-[0.14em] uppercase">
              Location
            </p>
            <p className="text-text-strong mt-1 line-clamp-2 text-sm leading-5">
              {tuition.address}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {metaItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={`${tuition.id}-${item.label}`}
              className="border-border bg-surface-elevated rounded-xl border px-3 py-2.5"
            >
              <div className="text-text-muted flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{item.label}</span>
              </div>
              <p className="text-text-strong mt-1.5 truncate text-sm font-semibold">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <p className="text-text-muted text-[11px] font-semibold tracking-[0.14em] uppercase">
          Subjects
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <span
              key={`${tuition.id}-${subject}`}
              className="border-border bg-surface-muted text-text-strong inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="border-border bg-surface-muted/70 rounded-xl border px-3 py-2.5">
          <div className="text-text-muted flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
            <FiEye className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Views</span>
          </div>
          <p className="text-text-strong mt-1.5 text-sm font-semibold">
            {tuition.totalViews}
          </p>
        </div>
        <div className="border-border bg-surface-muted/70 rounded-xl border px-3 py-2.5">
          <div className="text-text-muted flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
            <FiUsers className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Applied</span>
          </div>
          <p className="text-text-strong mt-1.5 text-sm font-semibold">
            {tuition.totalApplied}
          </p>
        </div>
      </div>

      <div className="border-border mt-5 flex items-center justify-between gap-3 border-t pt-4">
        <p className="text-text-muted text-xs font-medium">Updated recently</p>
        <button
          type="button"
          className="bg-brand-600 text-text-on-brand hover:bg-brand-700 focus:ring-brand-400 focus:ring-offset-page inline-flex min-h-9 items-center justify-center rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          See details
        </button>
      </div>
    </article>
  );
}
