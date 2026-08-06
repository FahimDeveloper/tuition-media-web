import type { ITeacher, TeacherEducation } from "@/types";

type MaybeRecord = Record<string, unknown> | null | undefined;

const SECTION_WEIGHT = 25;
const STUDYING_STATUS = "studying";
const ALLOWED_IDENTIFICATION_TYPES = new Set([
  "nid",
  "passport",
  "birth_certificate",
]);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === "object" && !Array.isArray(value));

const hasValue = (value: unknown): boolean => {
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "boolean") return value === true;

  return value !== null && value !== undefined;
};

const hasFields = (source: MaybeRecord, fields: readonly string[]): boolean => {
  if (!isRecord(source)) return false;

  return fields.every((field) => hasValue(source[field]));
};

const hasNestedField = (
  source: MaybeRecord,
  path: readonly string[],
): boolean => {
  let current: unknown = source;

  for (const key of path) {
    if (!isRecord(current)) return false;
    current = current[key];
  }

  return hasValue(current);
};

const isStudying = (section: MaybeRecord): boolean =>
  isRecord(section) && section.status === STUDYING_STATUS;

const hasAllowedIdentificationType = (identification: unknown): boolean =>
  isRecord(identification) &&
  typeof identification.type === "string" &&
  ALLOWED_IDENTIFICATION_TYPES.has(identification.type);

export const isPersonalInfoComplete = (
  teacher?: Partial<ITeacher> | null,
): boolean => {
  if (!teacher) return false;

  return (
    hasFields(teacher, [
      "full_name",
      "phone",
      "gender",
      "marital_status",
      "blood_group",
      "date_of_birth",
      "religion",
      "preset_address",
      "permanent_address",
    ]) &&
    hasAllowedIdentificationType(teacher.identification) &&
    hasNestedField(teacher.identification, ["number"])
  );
};

export const isTuitionPreferenceComplete = (
  teacher?: Partial<ITeacher> | null,
): boolean => {
  if (!teacher) return false;

  return (
    hasNestedField(teacher.preferred_teaching_locations, ["country"]) &&
    hasNestedField(teacher.preferred_teaching_locations, ["city"]) &&
    hasNestedField(teacher.preferred_teaching_locations, ["area"]) &&
    hasNestedField(teacher.preferred_tutoring, ["categories"]) &&
    hasNestedField(teacher.preferred_tutoring, ["courses"]) &&
    hasNestedField(teacher.preferred_tutoring, ["subjects"]) &&
    hasNestedField(teacher.preferred_tutoring, ["tutoring_types"]) &&
    hasNestedField(teacher.preferred_tutoring, ["salary_range", "min"]) &&
    hasNestedField(teacher.preferred_tutoring, ["salary_range", "max"]) &&
    hasNestedField(teacher.tutoring_availability, ["days"]) &&
    hasValue(teacher.years_of_experience)
  );
};

export const isEmergencyContactComplete = (
  teacher?: Partial<ITeacher> | null,
): boolean => {
  if (!teacher) return false;

  return hasFields(teacher.parents_info, [
    "father_name",
    "father_phone",
    "mother_name",
    "mother_phone",
  ]);
};

const isSchoolComplete = (education?: TeacherEducation | null): boolean => {
  return hasFields(education?.school, [
    "name",
    "group",
    "curriculum",
    "board",
    "gpa",
    "year_of_passing",
  ]);
};

const isCollegeComplete = (education?: TeacherEducation | null): boolean => {
  const college = education?.college;

  if (!isRecord(college)) return false;

  if (isStudying(college)) {
    return hasFields(college, [
      "name",
      "group",
      "curriculum",
      "board",
      "status",
    ]);
  }

  return hasFields(college, [
    "name",
    "group",
    "curriculum",
    "board",
    "gpa",
    "year_of_passing",
    "status",
  ]);
};

const isDiplomaComplete = (education?: TeacherEducation | null): boolean => {
  const diploma = education?.diploma;

  if (!isRecord(diploma)) return false;

  if (isStudying(diploma)) {
    return hasFields(diploma, [
      "name",
      "department",
      "type",
      "study_level",
      "session",
      "status",
    ]);
  }

  return hasFields(diploma, [
    "name",
    "department",
    "type",
    "study_level",
    "cgpa",
    "session",
    "status",
  ]);
};

const isGraduationComplete = (education?: TeacherEducation | null): boolean => {
  const graduation = education?.graduation;

  if (!isRecord(graduation)) return false;

  if (isStudying(graduation)) {
    return hasFields(graduation, [
      "name",
      "department",
      "type",
      "study_level",
      "session",
      "status",
    ]);
  }

  return hasFields(graduation, [
    "name",
    "department",
    "type",
    "study_level",
    "gpa",
    "session",
    "status",
  ]);
};

/**
 * Education completion rule:
 *
 * Required:
 * 1. School
 * 2. College OR Diploma
 * 3. Graduation, unless College/Diploma status is "studying"
 *
 * Optional:
 * - Post Graduation
 */
export const isEducationComplete = (
  education?: TeacherEducation | null,
): boolean => {
  if (!education) return false;

  if (!isSchoolComplete(education)) return false;

  const collegeComplete = isCollegeComplete(education);
  const diplomaComplete = isDiplomaComplete(education);

  if (!collegeComplete && !diplomaComplete) return false;

  const studyingInCollegeOrDiploma =
    isStudying(education.college) || isStudying(education.diploma);

  if (studyingInCollegeOrDiploma) {
    return true;
  }

  return isGraduationComplete(education);
};

export const calculateTeacherProfileCompletion = (
  teacher?: Partial<ITeacher> | null,
): number => {
  if (!teacher) return 0;

  const completedSections = [
    isPersonalInfoComplete(teacher),
    isTuitionPreferenceComplete(teacher),
    isEmergencyContactComplete(teacher),
    isEducationComplete(teacher.education),
  ].filter(Boolean).length;

  return completedSections * SECTION_WEIGHT;
};
