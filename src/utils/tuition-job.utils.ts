import type { TuitionJob, TuitionJobView } from "@/types";

const fallbackText = "Not specified";

type TuitionJobRecord = Partial<TuitionJob> & {
  id?: string;
  _id?: string;
  location?: Partial<TuitionJob["location"]>;
  salary?: Partial<TuitionJob["salary"]>;
};

const labelMap: Record<string, string> = {
  bangla: "Bangla Medium",
  english: "English Medium",
  both: "Bangla & English Medium",
  home: "Home Tutoring",
  online: "Online Tutoring",
  batch: "Batch Tutoring",
  male: "Male",
  female: "Female",
  other: "Other",
  open: "Open",
  assigned: "Assigned",
  closed: "Closed",
  monthly: "Monthly",
  per_class: "Per class",
};

export const formatTuitionJobLabel = (value?: string) => {
  if (!value) {
    return fallbackText;
  }

  return labelMap[value] ?? value;
};

export const formatTuitionJobSalary = (salary?: Partial<TuitionJob["salary"]>) => {
  if (typeof salary?.amount !== "number") {
    return fallbackText;
  }

  const formattedAmount = new Intl.NumberFormat("en-BD").format(salary.amount);
  const salaryType = salary.type === "monthly" ? "month" : "class";
  const negotiableText = salary.negotiable ? " (negotiable)" : "";

  return `BDT ${formattedAmount}/${salaryType}${negotiableText}`;
};

export const toTuitionJobView = (tuitionJob: TuitionJobRecord): TuitionJobView => {
  return {
    id: tuitionJob._id || tuitionJob.id || fallbackText,
    title: tuitionJob.title || "Untitled tuition",
    address: tuitionJob.location?.address || fallbackText,
    category: formatTuitionJobLabel(tuitionJob.category),
    courseLevel: tuitionJob.course_level || fallbackText,
    subjects: tuitionJob.subjects?.filter(Boolean) ?? [],
    numberOfStudents:
      typeof tuitionJob.number_of_students === "number"
        ? `${tuitionJob.number_of_students}`
        : fallbackText,
    tutoringType: formatTuitionJobLabel(tuitionJob.tutoring_type),
    studentGender: formatTuitionJobLabel(tuitionJob.student_gender),
    daysPerWeek:
      typeof tuitionJob.days_per_week === "number"
        ? `${tuitionJob.days_per_week} days/week`
        : fallbackText,
    preferredDays: tuitionJob.preferred_days?.join(", ") || fallbackText,
    preferredTime: tuitionJob.preferred_time || fallbackText,
    salary: formatTuitionJobSalary(tuitionJob.salary),
    tutorGender: formatTuitionJobLabel(tuitionJob.tutor_gender),
    tutorQualification: tuitionJob.tutor_qualification || fallbackText,
    tutorExperience:
      typeof tuitionJob.tutor_experience_years === "number"
        ? `${tuitionJob.tutor_experience_years} years`
        : fallbackText,
    specialRequirements: tuitionJob.special_requirements || fallbackText,
    status: formatTuitionJobLabel(tuitionJob.status),
  };
};
