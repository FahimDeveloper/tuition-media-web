// ==========================================
// Enums & Literal Types
// ==========================================
export type TStudentGender = "male" | "female" | "other";
export type TTutoringType = "home" | "online" | "batch";
export type TRateType = "monthly" | "per_class" | "per_week";
export type TTutorGender = "male" | "female" | "any";
export type TJobStatus =
  | "draft"
  | "open"
  | "assigned"
  | "demo"
  | "follow-up"
  | "confirmed"
  | "cancelled";

// ==========================================
//  Main Tuition Job Interface
// ==========================================
export type TTuitionJob = {
  _id: string;

  // --- Source & Internal Meta ---
  serial_number?: string;

  // --- Public Posting Data ---
  title: string;
  job_description?: string;

  // --- Student Information ---
  student_gender: TStudentGender;
  number_of_students: number;
  tutoring_type: TTutoringType;
  student_education: {
    category: string;
    course: string;
    subjects: string[];
  };
  location: {
    full_address: string;
    country: string;
    city: string;
    area: string;
    latitude?: number;
    longitude?: number;
  };

  // --- Schedule & Timing ---
  days_per_week: number;
  preferred_time: string;

  // --- Financial ---
  salary: {
    min?: number;
    max?: number;
    negotiable: boolean;
    rate_type: TRateType;
  };

  // --- Tutor Requirements ---
  tutor_gender: TTutorGender;
  tutor_qualification: string[];
  special_requirements?: string;

  // --- Overall Job Status ---
  status: TJobStatus;

  // --- Timestamps ---
  createdAt: string;
  updatedAt: string;
};
