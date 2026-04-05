import {
  FiBookOpen,
  FiCalendar,
  FiDollarSign,
  FiMapPin,
  FiTag,
  FiUser,
} from 'react-icons/fi';

import type {IconType} from 'react-icons';
import type {TuitionData} from '@/pages/Tuition/tuitionDemoData';

type TuitionCardProps = {
  tuition: TuitionData;
};

type DetailItem = {
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
    return subjects;
  }

  return subjects
    .split(',')
    .map((subject) => subject.trim())
    .filter(Boolean);
};

const TuitionCard = ({tuition}: TuitionCardProps) => {
  const detailItems: DetailItem[] = [
    {label: 'Category', value: tuition.category, icon: FiTag},
    {label: 'Class', value: tuition.course, icon: FiBookOpen},
    {label: 'Salary', value: tuition.salary, icon: FiDollarSign},
    {label: 'Tutor Gender', value: tuition.tutorGender, icon: FiUser},
  ];

  const subjects = getSubjectList(tuition.subjects);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-brand-200/70 bg-surface p-6 shadow-[0_10px_30px_rgba(17,45,78,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/70 hover:shadow-[0_16px_36px_rgba(17,45,78,0.12)] dark:border-gray-800 dark:bg-white/[0.03] dark:shadow-[0_18px_44px_rgba(3,7,18,0.3)] dark:hover:border-brand-400/60 dark:hover:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <span className="inline-flex min-h-8 items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/12 dark:text-brand-300">
            Tuition Opportunity
          </span>
          <div>
            <h3 className="font-poppins text-xl font-bold leading-tight text-text-strong sm:text-2xl">
              {tuition.title}
            </h3>
            <div className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-full border border-brand-100 bg-surface-subtle/60 px-3 py-1.5 text-sm font-medium text-text-strong dark:border-gray-800 dark:bg-white/[0.04]">
              <FiCalendar className="text-brand-600 dark:text-brand-300" aria-hidden="true" />
              <span>Posted {formatPostedDate(tuition.postedDate)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex min-h-12 items-center gap-3 rounded-xl border border-brand-100 bg-brand-50/70 px-4 py-3 dark:border-gray-800 dark:bg-white/[0.04]">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-700 shadow-sm dark:bg-white/[0.05] dark:text-brand-300">
          <FiMapPin aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700 dark:text-brand-300">
            Location
          </p>
          <p className="truncate text-sm font-medium text-text-strong sm:text-base">
            {tuition.address}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {detailItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={`${tuition.id}-${item.label}`}
              className="rounded-xl border border-brand-200/80 bg-white/90 px-4 py-3 dark:border-gray-800 dark:bg-white/[0.04]"
            >
              <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300">
                <Icon size={16} aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.12em]">
                  {item.label}
                </p>
              </div>
              <p className="mt-2 text-sm font-semibold text-text-strong sm:text-base">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
            <FiBookOpen aria-hidden="true" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700 dark:text-brand-300">
            Subjects
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <span
              key={`${tuition.id}-${subject}`}
              className="inline-flex min-h-9 items-center rounded-full border border-brand-200 bg-surface-subtle px-3 py-1.5 text-sm font-semibold text-brand-700 dark:border-gray-800 dark:bg-white/[0.04] dark:text-brand-300"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-brand-100 pt-5 dark:border-gray-800">
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Detailed view is not available yet."
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 opacity-70 transition duration-200 disabled:cursor-not-allowed dark:border-gray-800 dark:bg-white/[0.04] dark:text-brand-300"
        >
          See more details
        </button>
      </div>
    </article>
  );
};

export default TuitionCard;
