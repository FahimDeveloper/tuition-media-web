export type TeacherProfile = {
  id: string;
  name: string;
  title: string;
  location: string;
  subjects: string[];
  rating: number;
  experienceYears: number;
  hourlyRate: number;
  avatarUrl: string;
  isVerified?: boolean;
};

type TeacherProfileCardProps = {
  teacher: TeacherProfile;
};

const TeacherProfileCard = ({ teacher }: TeacherProfileCardProps) => {
  const metrics = [
    { label: "Rating", value: teacher.rating.toFixed(1) },
    { label: "Years", value: `${teacher.experienceYears}+` },
  ];

  const metricCardClasses =
    "rounded-xl border border-brand-200/80 bg-brand-50/70 px-3 py-2 text-center dark:border-border dark:bg-brand-500/[0.08]";
  const metricLabelClasses =
    "mt-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-700 dark:text-brand-300";

  return (
    <article className="group border-brand-200/70 bg-surface-elevated shadow-theme-sm hover:border-brand-400/70 hover:shadow-theme-lg dark:border-border dark:hover:bg-brand-500/[0.04] flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1">
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
            <p className="text-brand-700 dark:text-brand-300 mt-1 text-sm font-medium">
              {teacher.title}
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
            className={metricCardClasses}
          >
            <p className="font-poppins text-text-strong text-lg font-extrabold">
              {metric.value}
            </p>
            <p className={metricLabelClasses}>{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="border-brand-100 bg-brand-50/50 dark:border-border dark:bg-brand-500/[0.06] mt-5 flex items-center gap-2 rounded-lg border px-3 py-2">
        <span className="text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-[0.08em] uppercase">
          Location
        </span>
        <span
          className="bg-brand-400 h-1 w-1 rounded-full"
          aria-hidden="true"
        />
        <p className="text-text-strong text-sm font-medium">
          {teacher.location}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {teacher.subjects.map((subject) => (
          <span
            key={`${teacher.id}-${subject}`}
            className="border-brand-200 bg-surface-subtle text-brand-700 dark:border-border dark:bg-brand-500/[0.06] dark:text-brand-300 inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-xs font-semibold"
          >
            {subject}
          </span>
        ))}
      </div>

      <p className="text-text-strong/70 mt-6 text-center text-xs font-medium">
        Available for online and in-person tuition
      </p>
    </article>
  );
};

export default TeacherProfileCard;
