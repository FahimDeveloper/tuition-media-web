import type { ITeacher } from "@/components/layout/tutor/profile/teacherProfileTypes";

export type FeaturedTeacherApiRecord = Pick<
  ITeacher,
  | "full_name"
  | "profile_picture"
  | "is_verified"
  | "education"
  | "preferred_teaching_locations"
  | "preset_address"
  | "permanent_address"
  | "years_of_experience"
> & {
  teacherId: string;
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
