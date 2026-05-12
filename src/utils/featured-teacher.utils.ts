import type {
  FeaturedTeacherApiRecord,
  FeaturedTeacherViewModel,
} from "@/types";

const FALLBACK_AVATAR_URL = "/images/user/teacher.jpg";
const FALLBACK_EDUCATION = "Education not added";
const FALLBACK_LOCATION = "Location not added";
const FALLBACK_TEACHER_ID = "ID pending";
const FALLBACK_RATING = "New";
const FALLBACK_EXPERIENCE = "0+";

const formatValue = (value?: string) => value?.trim() ?? "";

export const maskTeacherId = (teacherId?: string) => {
  const normalizedTeacherId = formatValue(teacherId);

  if (!normalizedTeacherId) {
    return FALLBACK_TEACHER_ID;
  }

  if (normalizedTeacherId.length <= 4) {
    return normalizedTeacherId;
  }

  const visibleSuffix = normalizedTeacherId.slice(-4);
  const publicPrefix = normalizedTeacherId.match(/^[A-Za-z]+[-_]?/)?.[0] ?? "";

  return `${publicPrefix}****${visibleSuffix}`;
};

export const getLatestEducationName = (
  education: FeaturedTeacherApiRecord["education"],
) => {
  const latestEducationName =
    education?.post_graduation?.name ||
    education?.graduation?.name ||
    education?.diploma?.name ||
    education?.college?.name ||
    education?.school?.name;

  return formatValue(latestEducationName) || FALLBACK_EDUCATION;
};

export const getTeacherLocation = (teacher: FeaturedTeacherApiRecord) => {
  const teachingLocation = teacher.preferred_teaching_locations;
  const areas = teachingLocation?.area?.filter(Boolean).join(", ") ?? "";

  const preferredLocation = [
    areas,
    teachingLocation?.city,
    teachingLocation?.country,
  ]
    .map(formatValue)
    .filter(Boolean)
    .join(", ");

  return (
    preferredLocation ||
    formatValue(teacher.preset_address) ||
    formatValue(teacher.permanent_address) ||
    FALLBACK_LOCATION
  );
};

export const getRatingLabel = (rating?: number) => {
  if (typeof rating !== "number" || Number.isNaN(rating)) {
    return FALLBACK_RATING;
  }

  return rating.toFixed(1);
};

export const getExperienceLabel = (yearsOfExperience?: number) => {
  if (
    typeof yearsOfExperience !== "number" ||
    Number.isNaN(yearsOfExperience)
  ) {
    return FALLBACK_EXPERIENCE;
  }

  return `${yearsOfExperience}+`;
};

// Keep backend field names in this adapter. Card components should only consume
// FeaturedTeacherViewModel so RTK Query can be wired without reshaping the UI.
export const toFeaturedTeacherViewModel = (
  teacher: FeaturedTeacherApiRecord,
): FeaturedTeacherViewModel => ({
  id: teacher.teacherId,
  name: teacher.full_name,
  avatarUrl: formatValue(teacher.profile_picture) || FALLBACK_AVATAR_URL,
  isVerified: teacher.is_verified ?? false,
  maskedTeacherId: maskTeacherId(teacher.teacherId),
  ratingLabel: getRatingLabel(teacher.rating),
  experienceLabel: getExperienceLabel(teacher.years_of_experience),
  educationName: getLatestEducationName(teacher.education),
  location: getTeacherLocation(teacher),
});
