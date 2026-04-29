import type {IconType} from 'react-icons';
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
} from 'react-icons/fi';

import type {TuitionData} from '@/mocks/tuition/tuitionListings';

type JobBoardCardProps = {
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

export default function JobBoardCard({tuition}: JobBoardCardProps) {
  const subjects = getSubjectList(tuition.subjects);
  const metaItems: MetaItem[] = [
    {label: 'Category', value: tuition.category, icon: FiTag},
    {label: 'Class', value: tuition.course, icon: FiBookOpen},
    {label: 'Salary', value: tuition.salary, icon: FiDollarSign},
    {label: 'Tutor', value: tuition.tutorGender, icon: FiUserCheck},
  ];

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface-elevated p-4 shadow-theme-sm transition-colors duration-200 hover:border-brand-300/60 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
              Open job
            </span>
            <span className="inline-flex items-center rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-text-muted">
              ID #{tuition.id}
            </span>
          </div>

          <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-6 text-text-strong">
            {tuition.title}
          </h3>
        </div>

        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-500/20">
          <FiBookOpen className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-text-muted">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface-muted px-2.5 py-1.5">
          <FiCalendar className="h-3.5 w-3.5" aria-hidden="true" />
          Posted {formatPostedDate(tuition.postedDate)}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface-muted px-2.5 py-1.5">
          <FiClock className="h-3.5 w-3.5" aria-hidden="true" />
          {tuition.tutoringTime}
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-surface-muted/70 px-3 py-3">
        <div className="flex items-start gap-2.5">
          <FiMapPin
            className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-300"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
              Location
            </p>
            <p className="mt-1 line-clamp-2 text-sm leading-5 text-text-strong">
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
              className="rounded-xl border border-border bg-surface-elevated px-3 py-2.5"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{item.label}</span>
              </div>
              <p className="mt-1.5 truncate text-sm font-semibold text-text-strong">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
          Subjects
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <span
              key={`${tuition.id}-${subject}`}
              className="inline-flex items-center rounded-lg border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium text-text-strong"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-border bg-surface-muted/70 px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
            <FiEye className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Views</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-text-strong">
            {tuition.totalViews}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface-muted/70 px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
            <FiUsers className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Applied</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-text-strong">
            {tuition.totalApplied}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
        <p className="text-xs font-medium text-text-muted">Updated recently</p>
        <button
          type="button"
          className="inline-flex min-h-9 items-center justify-center rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-semibold text-text-on-brand transition-colors duration-200 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-page"
        >
          See details
        </button>
      </div>
    </article>
  );
}
