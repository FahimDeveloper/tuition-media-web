import type {
  EducationStatus,
  ITeacher,
  TeacherBloodGroup,
  TeacherCertification,
  TeacherEducation,
  TeacherGender,
  TeacherIdentification,
  TeacherIdentificationType,
  TeacherMaritalStatus,
  TeacherParentsInfo,
  TeacherProfilePatchPayload,
} from "@/types";
import { getApiErrorMessage } from "@/utils/api-error.utils";
import { isRecord } from "@/utils/type-guards.utils";
import { DEFAULT_TUITION_COUNTRY } from "@/utils/tuition-options.utils";

export type {
  EducationStatus,
  ITeacher,
  TeacherBloodGroup,
  TeacherCertification,
  TeacherEducation,
  TeacherGender,
  TeacherIdentification,
  TeacherIdentificationType,
  TeacherMaritalStatus,
  TeacherParentsInfo,
  TeacherProfilePatchPayload,
};

export type TeacherProfile = Partial<ITeacher>;

export type PersonalInfoValues = {
  full_name: string;
  phone: string;
  preset_address?: string;
  permanent_address?: string;
  gender?: TeacherGender;
  date_of_birth: string;
  blood_group?: TeacherBloodGroup;
  religion?: string;
  marital_status?: TeacherMaritalStatus;
  identification: TeacherIdentification;
};

export type EmergencyContactValues = TeacherParentsInfo;

export type TuitionPreferenceValues = Pick<
  ITeacher,
  | "preferred_teaching_locations"
  | "preferred_tutoring"
  | "years_of_experience"
  | "tutoring_availability"
>;

export type SchoolValues = NonNullable<TeacherEducation["school"]>;
export type CollegeValues = NonNullable<TeacherEducation["college"]>;
export type DiplomaValues = NonNullable<TeacherEducation["diploma"]>;
export type GraduationValues = NonNullable<TeacherEducation["graduation"]>;
export type PostGraduationValues = NonNullable<
  TeacherEducation["post_graduation"]
>;

export type EducationValues = {
  school: SchoolValues;
  college: CollegeValues;
  diploma: DiplomaValues;
  graduation: GraduationValues;
  post_graduation: PostGraduationValues;
};

export type EducationSectionKey = keyof EducationValues;

export type ProfileSectionKey =
  | "personalInfo"
  | "emergencyContact"
  | "tuitionPreference"
  | EducationSectionKey;

export type ProfileMetaValues = {
  displayName: string;
  institution: string;
  bio: string;
  avatarUrl: string;
  completionPercentage: number;
};

export type TutorProfileViewModel = {
  meta: ProfileMetaValues;
  personalInfo: PersonalInfoValues;
  emergencyContact: EmergencyContactValues;
  tuitionPreference: TuitionPreferenceValues;
  education: EducationValues;
};

const IGNORED_COMPLETION_KEYS = [
  "status",
  "is_diploma",
  "is_diploma_student",
];

const hasMeaningfulValue = (value: unknown): boolean => {
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value === "boolean") return value;
  if (Array.isArray(value)) return value.some(hasMeaningfulValue);
  if (value && typeof value === "object") {
    return Object.entries(value).some(
      ([key, nestedValue]) =>
        !IGNORED_COMPLETION_KEYS.includes(key) &&
        hasMeaningfulValue(nestedValue),
    );
  }

  return false;
};

export const calculateTeacherProfileCompletion = (
  teacher?: Partial<ITeacher> | null,
) => {
  if (!teacher) return 0;

  const completionFields = [
    teacher.full_name,
    teacher.email,
    teacher.phone,
    teacher.gender,
    teacher.date_of_birth,
    teacher.profile_picture,
    teacher.preset_address,
    teacher.permanent_address,
    teacher.preferred_teaching_locations,
    teacher.preferred_tutoring,
    teacher.education?.school,
    teacher.education?.college,
    teacher.education?.diploma,
    teacher.education?.graduation,
    teacher.education?.post_graduation,
    teacher.tutoring_availability?.days,
    teacher.parents_info,
    teacher.identification,
    teacher.certifications,
    teacher.about_me,
  ];

  const completedFields = completionFields.filter(hasMeaningfulValue).length;

  return Math.round((completedFields / completionFields.length) * 100);
};

export const INITIAL_PERSONAL_INFO_VALUES: PersonalInfoValues = {
  full_name: "Shakibul Islam",
  phone: "",
  preset_address: "",
  permanent_address: "",
  gender: undefined,
  date_of_birth: "",
  blood_group: undefined,
  religion: undefined,
  marital_status: undefined,
  identification: {
    type: undefined,
    number: "",
  },
};

export const INITIAL_EMERGENCY_CONTACT_VALUES: EmergencyContactValues = {
  father_name: "",
  father_phone: "",
  mother_name: "",
  mother_phone: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",
};

export const INITIAL_TUITION_PREFERENCE_VALUES: TuitionPreferenceValues = {
  preferred_teaching_locations: {
    country: DEFAULT_TUITION_COUNTRY,
    city: "",
    area: [],
  },
  preferred_tutoring: {
    categories: [],
    courses: [],
    subjects: [],
    tutoring_types: [],
    salary_range: {
      min: undefined,
      max: undefined,
    },
  },
  years_of_experience: undefined,
  tutoring_availability: {
    days: [],
  },
};

export const INITIAL_SCHOOL_VALUES: SchoolValues = {
  name: "",
  group: "",
  curriculum: "",
  board: "",
  gpa: "",
  year_of_passing: undefined,
};

export const INITIAL_COLLEGE_VALUES: CollegeValues = {
  name: "",
  group: "",
  curriculum: "",
  board: "",
  gpa: "",
  year_of_passing: undefined,
  status: "graduated",
  is_diploma_student: false,
};

export const INITIAL_DIPLOMA_VALUES: DiplomaValues = {
  is_diploma: false,
  name: "",
  department: "",
  type: "",
  study_level: "",
  cgpa: "",
  session: "",
  status: "graduated",
};

export const INITIAL_GRADUATION_VALUES: GraduationValues = {
  name: "",
  department: "",
  type: "",
  study_level: "",
  gpa: "",
  session: "",
  status: "graduated",
};

export const INITIAL_POST_GRADUATION_VALUES: PostGraduationValues = {
  name: "",
  department: "",
  type: "",
  study_level: "",
  gpa: "",
  session: "",
  status: "graduated",
};

const DEFAULT_PROFILE_META_VALUES: ProfileMetaValues = {
  displayName: "Shakibul Islam",
  institution: "TutoriumBD",
  bio: "Passionate educator focused on helping students learn with confidence.",
  avatarUrl: "/images/user/teacher.jpg",
  completionPercentage: 0,
};

const mergeSection = <TValues extends object>(
  fallback: TValues,
  section: unknown,
): TValues => {
  return isRecord(section) ? { ...fallback, ...section } : fallback;
};

export const createDefaultEducationValues = (): EducationValues => ({
  school: { ...INITIAL_SCHOOL_VALUES },
  college: { ...INITIAL_COLLEGE_VALUES },
  diploma: { ...INITIAL_DIPLOMA_VALUES },
  graduation: { ...INITIAL_GRADUATION_VALUES },
  post_graduation: { ...INITIAL_POST_GRADUATION_VALUES },
});

export const createDefaultProfileViewModel = (): TutorProfileViewModel => ({
  meta: { ...DEFAULT_PROFILE_META_VALUES },
  personalInfo: {
    ...INITIAL_PERSONAL_INFO_VALUES,
    identification: { ...INITIAL_PERSONAL_INFO_VALUES.identification },
  },
  emergencyContact: { ...INITIAL_EMERGENCY_CONTACT_VALUES },
  tuitionPreference: {
    preferred_teaching_locations: {
      country:
        INITIAL_TUITION_PREFERENCE_VALUES.preferred_teaching_locations
          ?.country ?? "",
      city:
        INITIAL_TUITION_PREFERENCE_VALUES.preferred_teaching_locations?.city ??
        "",
      area: [
        ...(INITIAL_TUITION_PREFERENCE_VALUES.preferred_teaching_locations
          ?.area ?? []),
      ],
    },
    preferred_tutoring: {
      ...INITIAL_TUITION_PREFERENCE_VALUES.preferred_tutoring,
      categories: [
        ...(INITIAL_TUITION_PREFERENCE_VALUES.preferred_tutoring?.categories ??
          []),
      ],
      courses: [
        ...(INITIAL_TUITION_PREFERENCE_VALUES.preferred_tutoring?.courses ?? []),
      ],
      subjects: [
        ...(INITIAL_TUITION_PREFERENCE_VALUES.preferred_tutoring?.subjects ??
          []),
      ],
      tutoring_types: [
        ...(INITIAL_TUITION_PREFERENCE_VALUES.preferred_tutoring
          ?.tutoring_types ?? []),
      ],
      salary_range: {
        ...INITIAL_TUITION_PREFERENCE_VALUES.preferred_tutoring?.salary_range,
      },
    },
    years_of_experience:
      INITIAL_TUITION_PREFERENCE_VALUES.years_of_experience,
    tutoring_availability: {
      days: [
        ...(INITIAL_TUITION_PREFERENCE_VALUES.tutoring_availability?.days ??
          []),
      ],
    },
  },
  education: createDefaultEducationValues(),
});

export const mapTeacherToProfileViewModel = (
  teacher?: TeacherProfile | null,
): TutorProfileViewModel => {
  const defaults = createDefaultProfileViewModel();
  const teacherRecord = teacher ?? undefined;
  const defaultLocations = defaults.tuitionPreference
    .preferred_teaching_locations ?? {
    country: "",
    city: "",
    area: [],
  };
  const defaultTutoring = defaults.tuitionPreference.preferred_tutoring ?? {
    categories: [],
    courses: [],
    subjects: [],
    tutoring_types: [],
    salary_range: {},
  };
  const defaultAvailability = defaults.tuitionPreference
    .tutoring_availability ?? { days: [] };

  return {
    meta: {
      displayName: teacherRecord?.full_name || defaults.meta.displayName,
      institution: defaults.meta.institution,
      bio: teacherRecord?.about_me || defaults.meta.bio,
      avatarUrl: teacherRecord?.profile_picture || defaults.meta.avatarUrl,
      completionPercentage: calculateTeacherProfileCompletion(teacherRecord),
    },
    personalInfo: {
      ...defaults.personalInfo,
      full_name: teacherRecord?.full_name ?? defaults.personalInfo.full_name,
      phone: teacherRecord?.phone ?? defaults.personalInfo.phone,
      preset_address:
        teacherRecord?.preset_address ?? defaults.personalInfo.preset_address,
      permanent_address:
        teacherRecord?.permanent_address ??
        defaults.personalInfo.permanent_address,
      gender: teacherRecord?.gender ?? defaults.personalInfo.gender,
      date_of_birth:
        teacherRecord?.date_of_birth ?? defaults.personalInfo.date_of_birth,
      blood_group:
        teacherRecord?.blood_group ?? defaults.personalInfo.blood_group,
      religion: teacherRecord?.religion ?? defaults.personalInfo.religion,
      marital_status:
        teacherRecord?.marital_status ?? defaults.personalInfo.marital_status,
      identification: mergeSection(
        defaults.personalInfo.identification,
        teacherRecord?.identification,
      ),
    },
    emergencyContact: mergeSection(
      defaults.emergencyContact,
      teacherRecord?.parents_info,
    ),
    tuitionPreference: {
      preferred_teaching_locations: mergeSection(
        defaultLocations,
        teacherRecord?.preferred_teaching_locations,
      ),
      preferred_tutoring: mergeSection(
        defaultTutoring,
        teacherRecord?.preferred_tutoring,
      ),
      years_of_experience:
        teacherRecord?.years_of_experience ??
        defaults.tuitionPreference.years_of_experience,
      tutoring_availability: mergeSection(
        defaultAvailability,
        teacherRecord?.tutoring_availability,
      ),
    },
    education: mergeSection(defaults.education, teacherRecord?.education),
  };
};

export const getEducationValuesForDiplomaMode = (
  values: EducationValues,
  isDiplomaStudent: boolean,
): EducationValues => ({
  ...values,
  college: {
    ...INITIAL_COLLEGE_VALUES,
    is_diploma_student: isDiplomaStudent,
  },
  diploma: { ...INITIAL_DIPLOMA_VALUES, is_diploma: isDiplomaStudent },
});

export const buildPersonalInfoProfilePatch = (
  values: PersonalInfoValues,
): TeacherProfilePatchPayload => values;

export const buildEmergencyContactProfilePatch = (
  values: EmergencyContactValues,
): TeacherProfilePatchPayload => ({ parents_info: values });

export const buildTuitionPreferenceProfilePatch = (
  values: TuitionPreferenceValues,
): TeacherProfilePatchPayload => values;

export const buildEducationProfilePatch = <TKey extends EducationSectionKey>(
  currentEducation: TeacherEducation | undefined,
  key: TKey,
  values: EducationValues[TKey],
): TeacherProfilePatchPayload => ({
  // The backend replaces nested objects during PATCH, so send the latest known
  // education object with only the edited section changed.
  education: {
    ...currentEducation,
    [key]: values,
  },
});

export const applyTeacherProfileUpdate = (
  currentProfile: TeacherProfile | undefined,
  patch: TeacherProfilePatchPayload,
  serverProfile?: TeacherProfile,
): TeacherProfile => ({
  ...currentProfile,
  ...patch,
  ...serverProfile,
  education: {
    ...currentProfile?.education,
    ...patch.education,
    ...serverProfile?.education,
  },
});

export const getProfileErrorMessage = (
  error: unknown,
  fallbackMessage = "Unable to save this profile section. Please try again.",
) => getApiErrorMessage(error, fallbackMessage);
