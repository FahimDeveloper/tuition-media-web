import {
  INITIAL_EMERGENCY_CONTACT_VALUES,
  type EmergencyContactValues,
} from "./emergencyContact/EmergencyContactTypes";
import {
  INITIAL_COLLEGE_VALUES,
  INITIAL_DIPLOMA_VALUES,
  INITIAL_EDUCATION_VALUES,
  type EducationValues,
} from "./education/educationTypes";
import {
  INITIAL_PERSONAL_INFO_VALUES,
  type PersonalInfoValues,
} from "./personal/personalInfoTypes";
import {
  INITIAL_TUITION_PREFERENCE_VALUES,
  type TuitionPreferenceValues,
} from "./tuition/tuitionPreferenceTypes";
import type {
  ITeacher,
  TeacherProfilePatchPayload,
} from "./teacherProfileTypes";

export type { TeacherProfilePatchPayload } from "./teacherProfileTypes";

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

export type TeacherProfileApiResponse = Partial<ITeacher>;

const DEFAULT_PROFILE_META_VALUES: ProfileMetaValues = {
  displayName: "Shakibul Islam",
  institution: "TutoriumBD",
  bio: "Passionate educator focused on helping students learn with confidence.",
  avatarUrl: "/images/user/teacher.jpg",
  completionPercentage: 78,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readNumber = (
  source: Record<string, unknown>,
  key: string,
  fallback: number,
) => {
  const value = source[key];
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
};

const mergeSection = <TValues extends object>(
  fallback: TValues,
  section: unknown,
): TValues => {
  return isRecord(section) ? { ...fallback, ...section } : fallback;
};

export const createDefaultEducationValues = (): EducationValues => ({
  school: { ...INITIAL_EDUCATION_VALUES.school },
  college: { ...INITIAL_EDUCATION_VALUES.college },
  diploma: { ...INITIAL_EDUCATION_VALUES.diploma },
  graduation: { ...INITIAL_EDUCATION_VALUES.graduation },
  post_graduation: { ...INITIAL_EDUCATION_VALUES.post_graduation },
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
  teacher?: TeacherProfileApiResponse | null,
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

  // This is the only API-to-form mapping layer. When useSingleTeacherQuery is
  // connected, pass its data here and keep form components API-shape agnostic.
  return {
    meta: {
      displayName: teacherRecord?.full_name || defaults.meta.displayName,
      institution: defaults.meta.institution,
      bio: teacherRecord?.about_me || defaults.meta.bio,
      avatarUrl: teacherRecord?.profile_picture || defaults.meta.avatarUrl,
      completionPercentage: readNumber(
        teacherRecord ? (teacherRecord as Record<string, unknown>) : {},
        "profile_completion_percentage",
        defaults.meta.completionPercentage,
      ),
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
      about_me: teacherRecord?.about_me ?? defaults.personalInfo.about_me,
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
  diploma: { ...INITIAL_DIPLOMA_VALUES },
});

export const buildPersonalInfoProfilePatch = (
  values: PersonalInfoValues,
): TeacherProfilePatchPayload => {
  // Every builder returns the exact top-level fields accepted by PATCH
  // /teachers/profile. Future RTK Query code can pass this directly to
  // updateTeacher(payload).unwrap().
  return values;
};

export const buildEmergencyContactProfilePatch = (
  values: EmergencyContactValues,
): TeacherProfilePatchPayload => ({ parents_info: values });

export const buildTuitionPreferenceProfilePatch = (
  values: TuitionPreferenceValues,
): TeacherProfilePatchPayload => values;

export const buildEducationProfilePatch = <TKey extends EducationSectionKey>(
  key: TKey,
  values: EducationValues[TKey],
): TeacherProfilePatchPayload => ({
  education: {
    [key]: values,
  },
});

export const getProfileErrorMessage = (error: unknown) => {
  if (
    isRecord(error) &&
    isRecord(error.data) &&
    typeof error.data.message === "string"
  ) {
    return error.data.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unable to save this profile section. Please try again.";
};
