import { toFeaturedTeacherViewModel } from "@/components/layout/home/featuredTeacher/featuredTeacherAdapters";
import type { FeaturedTeacherApiRecord } from "@/components/layout/home/featuredTeacher/featuredTeacherTypes";

export const mockFeaturedTeacherRecords: FeaturedTeacherApiRecord[] = [
  {
    teacherId: "TCH-10001234",
    full_name: "Farhana Rahman",
    profile_picture:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    is_verified: true,
    rating: 4.9,
    years_of_experience: 8,
    preferred_teaching_locations: {
      country: "Bangladesh",
      city: "Dhaka",
      area: ["Dhanmondi"],
    },
    education: {
      post_graduation: {
        name: "University of Dhaka",
        type: "MSc",
        department: "Mathematics",
        study_level: "Post Graduation",
        status: "graduated",
      },
    },
  },
  {
    teacherId: "TCH-10002345",
    full_name: "Tanvir Hasan",
    profile_picture:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    is_verified: true,
    rating: 4.8,
    years_of_experience: 6,
    preferred_teaching_locations: {
      country: "Bangladesh",
      city: "Dhaka",
      area: ["Mirpur"],
    },
    education: {
      graduation: {
        name: "North South University",
        type: "BBA",
        department: "English",
        study_level: "Graduation",
        status: "graduated",
      },
    },
  },
  {
    teacherId: "TCH-10003456",
    full_name: "Samia Akter",
    profile_picture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    is_verified: true,
    rating: 4.9,
    years_of_experience: 7,
    preferred_teaching_locations: {
      country: "Bangladesh",
      city: "Dhaka",
      area: ["Uttara"],
    },
    education: {
      graduation: {
        name: "Jahangirnagar University",
        type: "BSc",
        department: "Biology",
        study_level: "Graduation",
        status: "graduated",
      },
    },
  },
  {
    teacherId: "TCH-10004567",
    full_name: "Muntasir Alam",
    profile_picture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    is_verified: false,
    rating: 4.7,
    years_of_experience: 5,
    preset_address: "Bashundhara, Dhaka",
    education: {
      college: {
        name: "Notre Dame College",
        group: "Science",
        board: "Dhaka",
        curriculum: "National",
        status: "graduated",
      },
    },
  },
  {
    teacherId: "TCH-10005678",
    full_name: "Nusrat Jahan",
    is_verified: true,
    rating: 4.8,
    years_of_experience: 9,
    permanent_address: "Mohammadpur, Dhaka",
    education: {
      diploma: {
        name: "Dhaka Polytechnic Institute",
        type: "Diploma",
        department: "Education",
        study_level: "Diploma",
        status: "graduated",
      },
    },
  },
  {
    teacherId: "TCH-10006789",
    full_name: "Sajid Karim",
    profile_picture:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    is_verified: true,
    rating: 4.9,
    years_of_experience: 10,
    education: {},
  },
];

export const mockFeaturedTeachers = mockFeaturedTeacherRecords.map(
  toFeaturedTeacherViewModel,
);
