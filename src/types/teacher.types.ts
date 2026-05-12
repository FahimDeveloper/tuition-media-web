export type TeacherGender = "male" | "female" | "other";
export type TeacherMaritalStatus = "unmarried" | "married";
export type TeacherBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";
export type TeacherIdentificationType =
  | "passport"
  | "nid"
  | "driving_license"
  | "birth_certificate";
export type EducationStatus = "graduated" | "studying";

export interface ITeacher {
  full_name: string;
  email: string;
  password: string;
  role: "teacher";
  phone: string;
  additional_phone: string;
  preset_address?: string;
  permanent_address?: string;
  preferred_teaching_locations?: {
    country: string;
    city: string;
    area: string[];
  };
  about_me?: string;
  preferred_tutoring?: {
    categories: string[];
    courses: string[];
    subjects: string[];
    tutoring_types: string[];
    salary_range: {
      min?: number;
      max?: number;
    };
  };
  education: TeacherEducation;
  years_of_experience?: number;
  tutoring_availability?: {
    days: string[];
  };
  gender: TeacherGender;
  date_of_birth: string;
  blood_group?: TeacherBloodGroup;
  profile_picture?: string;
  religion?: string;
  marital_status?: TeacherMaritalStatus;
  parents_info?: TeacherParentsInfo;
  identification?: TeacherIdentification;
  certifications?: TeacherCertification[];
  is_profile_completed: boolean;
  is_verified: boolean;
  is_active: boolean;
  is_deleted: boolean;
  created_at?: string;
  updated_at?: string;
}

export type TeacherEducation = {
  school?: {
    name: string;
    group: string;
    board: string;
    curriculum: string;
    gpa: string;
    year_of_passing?: number;
  };
  college?: {
    name: string;
    gpa?: string;
    group: string;
    board: string;
    curriculum: string;
    year_of_passing?: number;
    status: EducationStatus;
    is_diploma_student?: boolean;
  };
  diploma?: {
    is_diploma: boolean;
    name: string;
    type: string;
    department: string;
    study_level: string;
    cgpa?: string;
    session?: string;
    status: EducationStatus;
  };
  graduation?: {
    name: string;
    type: string;
    department: string;
    study_level: string;
    gpa?: string;
    session?: string;
    status: EducationStatus;
  };
  post_graduation?: {
    name: string;
    type: string;
    department: string;
    study_level: string;
    gpa?: string;
    session?: string;
    status: EducationStatus;
  };
};

export type TeacherParentsInfo = {
  father_name: string;
  father_phone: string;
  mother_name: string;
  mother_phone: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
};

export type TeacherIdentification = {
  type?: TeacherIdentificationType;
  number: string;
  front_image?: string;
  back_image?: string;
};

export type TeacherCertification = {
  type: string;
  certificate_url: string;
};

export type TeacherProfilePatchPayload = Partial<
  Pick<
    ITeacher,
    | "full_name"
    | "phone"
    | "preset_address"
    | "permanent_address"
    | "preferred_teaching_locations"
    | "about_me"
    | "preferred_tutoring"
    | "education"
    | "years_of_experience"
    | "tutoring_availability"
    | "gender"
    | "date_of_birth"
    | "blood_group"
    | "profile_picture"
    | "religion"
    | "marital_status"
    | "parents_info"
    | "identification"
    | "certifications"
  >
>;
