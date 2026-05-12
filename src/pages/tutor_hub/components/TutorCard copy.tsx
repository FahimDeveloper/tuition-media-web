import { FiArrowRight, FiBookOpen, FiMapPin } from "react-icons/fi";
import type { FeaturedTeacherViewModel } from "@/types";

type TeacherProfileCardProps = {
  teacher: FeaturedTeacherViewModel;
};

const TeacherProfileCard = ({ teacher }: TeacherProfileCardProps) => {
  const metrics = [
    { label: "Rating", value: teacher.ratingLabel },
    { label: "Years", value: teacher.experienceLabel },
  ];

  return (
    <article className="group border-brand-200/70 bg-surface-elevated shadow-theme-sm hover:border-brand-400/70 hover:shadow-theme-lg dark:border-border dark:hover:bg-brand-500/4 flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={teacher.avatarUrl}
            className="ring-brand-200/80 h-16 w-16 rounded-full object-cover ring-2"
            alt={`${teacher.name} profile`}
          />
          <div>
            <h3 className="font-poppins text-text-strong text-lg leading-tight font-bold">
              {teacher.name}
            </h3>
            <p className="text-brand-700 dark:text-brand-300 mt-1 text-sm font-semibold">
              {teacher.maskedTeacherId}
            </p>
          </div>
        </div>
        {teacher.isVerified ? (
          <span className="bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 inline-flex min-h-7 items-center rounded-full px-3 py-1 text-xs font-semibold">
            Verified
          </span>
        ) : null}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <div
            key={`${teacher.id}-${metric.label}`}
            className="border-brand-200/80 bg-brand-50/70 dark:border-border dark:bg-brand-500/8 rounded-xl border px-3 py-2 text-center"
          >
            <p className="font-poppins text-text-strong text-lg font-extrabold">
              {metric.value}
            </p>
            <p className="text-brand-700 dark:text-brand-300 mt-0.5 text-[11px] font-semibold tracking-[0.08em] uppercase">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      <div className="border-brand-100 bg-brand-50/50 dark:border-border dark:bg-brand-500/6 mt-5 rounded-lg border px-4 py-3">
        <div className="text-brand-700 dark:text-brand-300 flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase">
          <FiBookOpen size={15} aria-hidden="true" />
          Latest education
        </div>
        <p className="text-text-strong mt-2 text-sm leading-6 font-semibold">
          {teacher.educationName}
        </p>
      </div>

      <div className="border-brand-100 bg-brand-50/50 dark:border-border dark:bg-brand-500/6 mt-4 rounded-lg border px-4 py-3">
        <div className="text-brand-700 dark:text-brand-300 flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase">
          <FiMapPin size={15} aria-hidden="true" />
          Location
        </div>
        <p className="text-text-strong mt-2 text-sm leading-6 font-semibold">
          {teacher.location}
        </p>
      </div>

      {/* Convert this button to a Link when the public teacher details route is registered. */}
      <button
        type="button"
        disabled
        className="bg-brand-600 text-text-on-brand hover:bg-brand-700 mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold opacity-80 transition-colors disabled:cursor-not-allowed"
        title="Teacher details route will be connected later"
      >
        See details
        <FiArrowRight size={16} aria-hidden="true" />
      </button>
    </article>
  );
};

export default TeacherProfileCard;
