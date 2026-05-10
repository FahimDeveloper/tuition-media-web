import type { ITeacher } from "@/types/teacher";

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
