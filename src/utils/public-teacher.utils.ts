import type {
  PreferredTeachingLocations,
  PublicTeacher,
  TeacherEducation,
  TeacherSalaryRange,
} from "@/types";

export const formatPublicTeacherValue = (
  value?: string | number | null,
  fallback = "N/A",
) => {
  if (value === undefined || value === null || value === "") return fallback;
  return String(value);
};

export const formatPublicTeacherList = (
  items?: Array<string | number | null | undefined>,
  fallback = "N/A",
) =>
  items
    ?.map((item) => formatPublicTeacherValue(item))
    .filter((item) => item !== "N/A")
    .join(", ") || fallback;

export const formatPublicTeacherLimitedList = (
  items?: string[],
  limit = 2,
  fallback = "Not specified",
) => {
  if (!items?.length) return fallback;

  const visibleItems = items.slice(0, limit);
  const hiddenCount = items.length - visibleItems.length;

  return hiddenCount > 0
    ? `${visibleItems.join(", ")} +${hiddenCount}`
    : visibleItems.join(", ");
};

export const getPublicTeacherInitials = (name: string) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "T";
};

export const formatPublicTeacherGender = (gender?: string) => {
  if (!gender) return "Not specified";
  return formatPublicTeacherStatus(gender) ?? "Not specified";
};

export const formatPublicTeacherStatus = (value?: string) => {
  if (!value) return undefined;

  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatPublicTeacherTutoringType = (value: string) =>
  formatPublicTeacherStatus(value) || value;

export const formatPublicTeacherSalary = (
  salaryRange?: TeacherSalaryRange,
  fallback = "N/A",
) => {
  const min = salaryRange?.min;
  const max = salaryRange?.max;

  if (!min && !max) return fallback;
  if (min && max) return `Tk ${formatPublicTeacherNumber(min)} - Tk ${formatPublicTeacherNumber(max)}`;
  if (min) return `From Tk ${formatPublicTeacherNumber(min)}`;
  return `Up to Tk ${formatPublicTeacherNumber(max || 0)}`;
};

export const formatPublicTeacherAvailability = (days?: string[]) => {
  const count = days?.length || 0;
  if (!count) return "N/A";
  return `${count} ${count === 1 ? "day" : "days"} / week`;
};

export const formatPublicTeacherLocation = (
  location?: PreferredTeachingLocations,
  fallback = "Location not specified",
) => {
  const formatted = [
    formatPublicTeacherList(location?.area),
    location?.city,
    location?.country,
  ]
    .filter((item) => item && item !== "N/A")
    .join(", ");

  return formatted || fallback;
};

export const formatPublicTeacherCardLocation = (
  location?: PreferredTeachingLocations,
) =>
  [location?.city, location?.area?.[0]]
    .filter(Boolean)
    .join(", ") || "Area not specified";

export const getPublicTeacherLatestEducationName = (
  teacherOrEducation?: PublicTeacher | TeacherEducation,
) => {
  const education: TeacherEducation | undefined =
    teacherOrEducation && isPublicTeacher(teacherOrEducation)
      ? teacherOrEducation.education
      : teacherOrEducation;

  if (!education) return "Education not specified";

  return (
    education.post_graduation?.name ||
    education.graduation?.name ||
    education.diploma?.name ||
    education.college?.name ||
    education.school?.name ||
    "Education not specified"
  );
};

const formatPublicTeacherNumber = (value: number) =>
  new Intl.NumberFormat("en-BD").format(value);

const isPublicTeacher = (
  value: PublicTeacher | TeacherEducation,
): value is PublicTeacher => "_id" in value && "full_name" in value;
