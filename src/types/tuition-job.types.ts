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

export type TuitionJobsQuery = {
  search?: string;
  preferred_teaching_locations?: {
    country?: string;
    city?: string;
    area?: string[];
  };
  preferred_tutoring?: {
    categories?: string[];
    courses?: string[];
    subjects?: string[];
  };
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
