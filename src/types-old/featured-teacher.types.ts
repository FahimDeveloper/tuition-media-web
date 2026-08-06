import type { ITeacher } from "./teacher.types";

export type FeaturedTeacherApiRecord = Partial<
  Pick<
    ITeacher,
    | "profile_picture"
    | "is_verified"
    | "education"
    | "preferred_teaching_locations"
    | "preset_address"
    | "permanent_address"
    | "years_of_experience"
  >
> & {
  teacherId: string;
  full_name: string;
  rating?: number;
};

export type FeaturedTeacherViewModel = {
  id: string;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  maskedTeacherId: string;
  ratingLabel: string;
  experienceLabel: string;
  educationName: string;
  location: string;
};
