import type { FeaturedTeacherApiRecord, FeaturedTeacherViewModel, PublicTeacher } from "@/types";
import { toFeaturedTeacherViewModel } from "@/utils/featured-teacher.utils";

type MockQueryResult<TData> = {
  data?: TData;
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
};

type MockPublicTeacherQueryResult = MockQueryResult<PublicTeacher> & {
  refetch: () => void;
};

export const mockPublicTeachers: PublicTeacher[] = [
  {
    _id: "69ff8fc471e74a62fb13783f",
    full_name: "Shakib 1",
    is_verified: false,
    is_active: true,
    is_deleted: false,
    gender: "male",
    years_of_experience: 2,
    about_me: "",
    preferred_teaching_locations: {
      country: "Bangladesh",
      city: "Dhaka",
      area: ["Rampura", "Banasree", "Dhanmondi"],
    },
    preferred_tutoring: {
      salary_range: {
        min: 5000,
        max: 10000,
      },
      courses: ["IELTS", "Class 9", "HSC Candidate"],
      subjects: ["Home Science", "Bangla 2nd", "Bangla 1st", "English 1st"],
    },
    education: {
      school: {
        name: "Khulna Zilla school",
        group: "Business Studies",
        curriculum: "Bangla Medium",
        board: "Khulna",
        gpa: "4",
        year_of_passing: 2015,
      },
    },
  },
  {
    _id: "69ff987d30d8fcebe57f3112",
    full_name: "Rifat kabir khan 1",
    is_verified: false,
    is_active: true,
    is_deleted: false,
    gender: "female",
    years_of_experience: 5,
    about_me:
      "Dedicated and student-focused tutor with a passion for making learning simple, engaging, and effective. Skilled at adapting teaching methods based on each student's needs to help them build confidence and achieve better academic results.",
    preferred_teaching_locations: {
      country: "Bangladesh",
      city: "Chapai Nawabganj",
      area: ["Manaksha"],
    },
    preferred_tutoring: {
      salary_range: {
        min: 4000,
        max: 7000,
      },
      categories: ["Bangla Medium", "English Medium"],
      courses: ["Pre-Schooling"],
      subjects: ["Bangla"],
      tutoring_types: ["home_tuition", "online_tuition", "group_tuition"],
    },
    education: {
      school: {
        name: "Savar cantonment school and college",
        group: "Science",
        curriculum: "English Version",
        board: "Chattogram",
        gpa: "5",
        year_of_passing: 2017,
      },
      college: {
        name: "Alaipur digree college",
        group: "Business Studies",
        curriculum: "Bangla Medium",
        board: "Khulna",
        status: "graduated",
        gpa: "4",
        year_of_passing: 2019,
      },
      graduation: {
        name: "University of Scholars",
        department: "BBA",
        type: "Private",
        study_level: "BBA",
        status: "studying",
        gpa: "",
        session: "2025-2026",
      },
      post_graduation: {
        name: "Savar cantonment school and college",
        department: "computer science",
        type: "Public",
        study_level: "Engineering",
        status: "graduated",
        gpa: "5",
        session: "2033-2033",
      },
    },
    tutoring_availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
    },
    created_at: "2026-05-09T20:26:37.447Z",
    updated_at: "2026-05-12T19:27:54.578Z",
  },
  {
    _id: "69ffad1ad7e8597b85ef6acd",
    full_name: "Shakibul Islam",
    is_verified: false,
    is_active: true,
    is_deleted: false,
    gender: "male",
    years_of_experience: 0,
    about_me: "",
    preferred_teaching_locations: {
      country: "Bangladesh",
      city: "",
      area: [],
    },
    preferred_tutoring: {
      salary_range: undefined,
      courses: [],
      subjects: [],
    },
    education: undefined,
  },
];

const mockFeaturedTeacherRecords: FeaturedTeacherApiRecord[] =
  mockPublicTeachers.map((teacher) => ({
    teacherId: teacher._id,
    full_name: teacher.full_name,
    profile_picture: teacher.profile_picture,
    is_verified: teacher.is_verified,
    education: teacher.education,
    preferred_teaching_locations: teacher.preferred_teaching_locations,
    years_of_experience: teacher.years_of_experience,
  }));

export const mockFeaturedTeachers: FeaturedTeacherViewModel[] =
  mockFeaturedTeacherRecords.map(toFeaturedTeacherViewModel);

export const useMockPublicTeachersQuery = (): MockQueryResult<
  PublicTeacher[]
> => ({
  data: mockPublicTeachers,
  isLoading: false,
  isError: false,
  error: undefined,
});

export const useMockPublicTeacherByIdQuery = (
  id?: string,
): MockPublicTeacherQueryResult => ({
  data: id
    ? mockPublicTeachers.find((teacher) => teacher._id === id)
    : undefined,
  isLoading: false,
  isError: !id,
  error: !id ? { message: "Tutor id is missing." } : undefined,
  refetch: () => undefined,
});

export const mockTeachers = mockPublicTeachers;
