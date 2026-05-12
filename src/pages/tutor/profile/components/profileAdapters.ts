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
  TeacherEducation,
  TeacherProfilePatchPayload,
} from "./teacherProfileTypes";
import { calculateTeacherProfileCompletion } from "./profileCompletion";
import { getApiErrorMessage } from "@/utils/api-error.utils";
import { isRecord } from "@/utils/type-guards.utils";

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

export type TeacherProfile = Partial<ITeacher>;

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

  // Keep API fields isolated here so section forms can stay focused on their
  // editable view-model shape.
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
