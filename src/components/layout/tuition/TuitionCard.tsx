import {
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiHash,
  FiMapPin,
  FiTag,
  FiUserCheck,
} from 'react-icons/fi';

import type {IconType} from 'react-icons';
import type {TuitionData} from '@/mocks/tuition/tuitionListings';

type TuitionCardProps = {
  tuition: TuitionData;
};

type MetaItem = {
  label: string;
  value: string;
  icon: IconType;
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const formatPostedDate = (postedDate: string) => {
  const parsedDate = new Date(postedDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return postedDate;
  }

  return dateFormatter.format(parsedDate);
};

const getSubjectList = (subjects: TuitionData['subjects']) => {
  if (Array.isArray(subjects)) {
    return subjects.filter(Boolean);
  }

  return subjects
    .split(',')
    .map((subject) => subject.trim())
    .filter(Boolean);
};

const TuitionCard = ({tuition}: TuitionCardProps) => {
  const metaItems: MetaItem[] = [
    {label: 'Category', value: tuition.category, icon: FiTag},
    {label: 'Class', value: tuition.course, icon: FiBookOpen},
    {label: 'Salary', value: tuition.salary, icon: FiDollarSign},
    {label: 'Tutor Gender', value: tuition.tutorGender, icon: FiUserCheck},
  ];

  const subjects = getSubjectList(tuition.subjects);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-brand-200/70 bg-surface-elevated p-4 shadow-theme-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-400/70 hover:shadow-theme-md sm:p-5 dark:border-border">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-base font-semibold leading-7 text-text-strong sm:text-lg">
              {tuition.title}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 sm:text-sm dark:bg-brand-500/10 dark:text-brand-300">
                <FiCalendar aria-hidden="true" size={14} />
                Posted {formatPostedDate(tuition.postedDate)}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 sm:text-sm dark:bg-brand-500/10 dark:text-brand-300">
                <FiHash aria-hidden="true" size={14} />
                ID {tuition.id}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl bg-surface-subtle/70 px-3 py-3 dark:bg-brand-500/[0.06]">
          <FiMapPin
            className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-300"
            size={16}
            aria-hidden="true"
          />
          <p className="line-clamp-2 text-sm leading-6 text-text-strong">
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
              className="rounded-xl border border-brand-100/70 bg-brand-50/40 px-3 py-3 dark:border-border dark:bg-brand-500/[0.06]"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
                <Icon size={14} aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </div>

              <p className="mt-1.5 truncate text-sm font-semibold text-text-strong sm:text-[15px]">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
          <FiBookOpen size={14} aria-hidden="true" />
          <span>Subjects</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <span
              key={`${tuition.id}-${subject}`}
              className="inline-flex items-center rounded-md bg-brand-50 px-2.5 py-1.5 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-brand-100/70 pt-4 dark:border-border">
        <div className="inline-flex items-center gap-1.5 text-xs text-text-muted sm:text-sm">
          <FiClock size={14} aria-hidden="true" />
          <span>Updated recently</span>
        </div>

        <button
          type="button"
          className="inline-flex min-h-10 items-center justify-center rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-text-on-brand transition duration-200 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-page"
        >
          See details
        </button>
      </div>
    </article>
  );
};

export default TuitionCard;
