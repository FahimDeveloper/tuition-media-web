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

const TeacherProfileCard = ({teacher}: TeacherProfileCardProps) => {
  const metrics = [
    {label: 'Rating', value: teacher.rating.toFixed(1)},
    {label: 'Years', value: `${teacher.experienceYears}+`},
  ];

  const metricCardClasses =
    'rounded-xl border border-brand-200/80 bg-brand-50/70 px-3 py-2 text-center';
  const metricLabelClasses =
    'mt-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-700';

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-brand-200/70 bg-surface p-6 shadow-[0_4px_12px_rgba(17,45,78,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/70 hover:shadow-[0_8px_18px_rgba(17,45,78,0.10)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={teacher.avatarUrl}
            className="h-16 w-16 rounded-full object-cover ring-2 ring-brand-200/80"
            alt={`${teacher.name} profile`}
          />
          <div>
            <h3 className="font-poppins text-lg font-bold leading-tight text-text-strong">
              {teacher.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-brand-700">
              {teacher.title}
            </p>
          </div>
        </div>
        {teacher.isVerified ? (
          <span className="inline-flex min-h-7 items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            Verified
          </span>
        ) : null}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <div key={`${teacher.id}-${metric.label}`} className={metricCardClasses}>
            <p className="font-poppins text-lg font-extrabold text-text-strong">
              {metric.value}
            </p>
            <p className={metricLabelClasses}>{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-lg border border-brand-100 bg-brand-50/50 px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-700">
          Location
        </span>
        <span
          className="h-1 w-1 rounded-full bg-brand-400"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-text-strong">
          {teacher.location}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {teacher.subjects.map((subject) => (
          <span
            key={`${teacher.id}-${subject}`}
            className="inline-flex min-h-8 items-center rounded-full border border-brand-200 bg-surface-subtle px-3 py-1 text-xs font-semibold text-brand-700"
          >
            {subject}
          </span>
        ))}
      </div>

      <p className="mt-6 text-center text-xs font-medium text-text-strong/70">
        Available for online and in-person tuition
      </p>
    </article>
  );
};

export default TeacherProfileCard;
