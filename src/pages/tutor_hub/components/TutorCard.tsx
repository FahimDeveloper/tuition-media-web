import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiMapPin,
  FiUser,
} from "react-icons/fi";
import type { PublicTeacher } from "@/types";
import {
  formatPublicTeacherCardLocation,
  formatPublicTeacherGender,
  formatPublicTeacherLimitedList,
  formatPublicTeacherSalary,
  getPublicTeacherInitials,
  getPublicTeacherLatestEducationName,
} from "@/utils/public-teacher.utils";

type TeacherProfileCardProps = {
  teacher: PublicTeacher;
};

const TeacherProfileCard = ({ teacher }: TeacherProfileCardProps) => {
  const preferredArea = formatPublicTeacherCardLocation(
    teacher.preferred_teaching_locations,
  );
  const subjects = formatPublicTeacherLimitedList(
    teacher.preferred_tutoring?.subjects,
  );
  const salary = formatPublicTeacherSalary(
    teacher.preferred_tutoring?.salary_range,
    "Negotiable",
  );
  const latestEducationName = getPublicTeacherLatestEducationName(teacher);

  return (
    <article className="group border-brand-200/70 bg-surface-elevated shadow-theme-sm hover:border-brand-400/70 hover:shadow-theme-lg dark:border-border dark:hover:bg-brand-500/4 flex h-full flex-col rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="bg-brand-100 text-brand-700 ring-brand-200/80 dark:bg-brand-500/15 dark:text-brand-200 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-bold ring-2">
          {getPublicTeacherInitials(teacher.full_name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-poppins text-text-strong line-clamp-1 text-lg leading-tight font-bold">
                {teacher.full_name}
              </h3>

              <p className="text-text-muted mt-1 text-sm">
                {teacher.years_of_experience || 0} years experience
              </p>
            </div>

            {teacher.is_verified ? (
              <span className="bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold">
                <FiCheckCircle size={13} aria-hidden="true" />
                Verified
              </span>
            ) : (
              <span className="bg-brand-50 text-brand-700/70 dark:bg-brand-500/10 dark:text-brand-300/80 inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold">
                New
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold">
              <FiUser size={13} aria-hidden="true" />
              {formatPublicTeacherGender(teacher.gender)}
            </span>

            <span className="bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold">
              {salary}
            </span>
          </div>
        </div>
      </div>

      <p className="text-text-muted mt-4 line-clamp-2 text-sm leading-6">
        {teacher.about_me || "Experienced tutor ready to help students learn better."}
      </p>

      <div className="mt-4 space-y-3">
        <div className="flex items-start gap-2">
          <FiBookOpen
            size={16}
            className="text-brand-600 dark:text-brand-300 mt-0.5 shrink-0"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <p className="text-text-strong line-clamp-1 text-sm font-semibold">
              {latestEducationName}
            </p>
            <p className="text-text-muted line-clamp-1 text-xs">{subjects}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <FiMapPin
            size={16}
            className="text-brand-600 dark:text-brand-300 mt-0.5 shrink-0"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <p className="text-text-strong line-clamp-1 text-sm font-semibold">
              {preferredArea}
            </p>
            <p className="text-text-muted text-xs">Preferred teaching area</p>
          </div>
        </div>
      </div>

      <Link
        to={`/hub/${teacher._id}`}
        className="bg-brand-600 text-text-on-brand hover:bg-brand-700 mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors"
      >
        View details
        <FiArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
};

export default TeacherProfileCard;
