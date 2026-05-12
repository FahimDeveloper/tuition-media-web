import {
  FiBookOpen,
  FiClock,
  FiDollarSign,
  FiHash,
  FiMapPin,
  FiTag,
  FiUserCheck,
} from "react-icons/fi";

import type { IconType } from "react-icons";
import type { TuitionJobView } from "@/types/tuitionJob";
import { Link } from "react-router-dom";

type TuitionCardProps = {
  tuition: TuitionJobView;
};

type MetaItem = {
  label: string;
  value: string;
  icon: IconType;
};

const TuitionCard = ({ tuition }: TuitionCardProps) => {
  // Keep this component display-only so RTK Query can later feed it mapped data.
  const metaItems: MetaItem[] = [
    { label: "subjects", value: tuition.category, icon: FiTag },
    { label: "Class", value: tuition.courseLevel, icon: FiBookOpen },
    { label: "Salary", value: tuition.salary, icon: FiDollarSign },
    { label: "Tutor Gender", value: tuition.tutorGender, icon: FiUserCheck },
  ];

  return (
    <article className="group border-brand-200/70 bg-surface-elevated shadow-theme-sm hover:border-brand-400/70 hover:shadow-theme-md dark:border-border flex h-full flex-col rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 sm:p-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-text-strong line-clamp-2 text-base leading-7 font-semibold sm:text-lg">
              {tuition.title}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium sm:text-sm">
                <FiClock aria-hidden="true" size={14} />
                {tuition.status}
              </span>

              <span className="bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium sm:text-sm">
                <FiHash aria-hidden="true" size={14} />
                ID {tuition.id}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-surface-subtle/70 dark:bg-brand-500/6 flex items-start gap-2.5 rounded-xl px-3 py-3">
          <FiMapPin
            className="text-brand-600 dark:text-brand-300 mt-0.5 shrink-0"
            size={16}
            aria-hidden="true"
          />
          <p className="text-text-strong line-clamp-2 text-sm leading-6">
            {tuition.address}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {metaItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={`${tuition.id}-${item.label}`}
              className="border-brand-100/70 bg-brand-50/40 dark:border-border dark:bg-brand-500/6 rounded-xl border px-3 py-3"
            >
              <div className="text-brand-700 dark:text-brand-300 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase">
                <Icon size={14} aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </div>

              <p className="text-text-strong mt-1.5 truncate text-sm font-semibold sm:text-[15px]">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <div className="text-brand-700 dark:text-brand-300 mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase">
          <FiBookOpen size={14} aria-hidden="true" />
          <span>Subjects</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tuition.subjects.map((subject) => (
            <span
              key={`${tuition.id}-${subject}`}
              className="bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 inline-flex items-center rounded-md px-2.5 py-1.5 text-xs font-medium"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      <div className="border-brand-100/70 dark:border-border mt-6 flex items-center justify-between gap-3 border-t pt-4">
        <div className="text-text-muted inline-flex items-center gap-1.5 text-xs sm:text-sm">
          <FiClock size={14} aria-hidden="true" />
          <span>{tuition.preferredTime}</span>
        </div>

        <Link to={`/tuitions/${tuition.id}`}>
          <button
            type="button"
            className="bg-brand-600 text-text-on-brand hover:bg-brand-700 focus:ring-brand-400 focus:ring-offset-page inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            See details
          </button>
        </Link>
      </div>
    </article>
  );
};

export default TuitionCard;
