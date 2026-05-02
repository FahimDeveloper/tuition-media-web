export type TuitionJobGender = "male" | "female" | "other";
export type TuitionJobTutorGender = "male" | "female";
export type TuitionJobTutoringType = "home" | "online" | "batch";
export type TuitionJobCategory = "bangla" | "english" | "both";
export type TuitionJobSalaryType = "monthly" | "per_class";
export type TuitionJobStatus = "open" | "assigned" | "closed";

export type TuitionJob = {
  // MongoDB will still provide an identifier even though it is not part of the schema body.
  _id: string;
  title: string;
  student_gender: TuitionJobGender;
  course_level: string;
  subjects: string[];
  number_of_students: number;
  tutoring_type: TuitionJobTutoringType;
  category: TuitionJobCategory;
  location: {
    address: string;
  };
  days_per_week: number;
  preferred_days?: string[];
  preferred_time: string;
  salary: {
    amount: number;
    type: TuitionJobSalaryType;
    negotiable: boolean;
  };
  tutor_gender?: TuitionJobTutorGender;
  tutor_qualification?: string;
  tutor_experience_years?: number;
  special_requirements?: string;
  status: TuitionJobStatus;
};

export type TuitionJobView = {
  id: string;
  title: string;
  address: string;
  category: string;
  courseLevel: string;
  subjects: string[];
  numberOfStudents: string;
  tutoringType: string;
  studentGender: string;
  daysPerWeek: string;
  preferredDays: string;
  preferredTime: string;
  salary: string;
  tutorGender: string;
  tutorQualification: string;
  tutorExperience: string;
  specialRequirements: string;
  status: string;
};

const fallbackText = "Not specified";

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

export const formatTuitionJobSalary = (salary: TuitionJob["salary"]) => {
  const formattedAmount = new Intl.NumberFormat("en-BD").format(salary.amount);
  const salaryType = salary.type === "monthly" ? "month" : "class";
  const negotiableText = salary.negotiable ? " (negotiable)" : "";

  return `BDT ${formattedAmount}/${salaryType}${negotiableText}`;
};

export const toTuitionJobView = (tuitionJob: TuitionJob): TuitionJobView => {
  return {
    id: tuitionJob._id,
    title: tuitionJob.title,
    address: tuitionJob.location.address,
    category: formatTuitionJobLabel(tuitionJob.category),
    courseLevel: tuitionJob.course_level,
    subjects: tuitionJob.subjects.filter(Boolean),
    numberOfStudents: `${tuitionJob.number_of_students}`,
    tutoringType: formatTuitionJobLabel(tuitionJob.tutoring_type),
    studentGender: formatTuitionJobLabel(tuitionJob.student_gender),
    daysPerWeek: `${tuitionJob.days_per_week} days/week`,
    preferredDays: tuitionJob.preferred_days?.join(", ") || fallbackText,
    preferredTime: tuitionJob.preferred_time,
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
