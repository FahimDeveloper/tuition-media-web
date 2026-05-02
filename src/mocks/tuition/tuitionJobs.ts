import type { TuitionJob } from "@/types/tuitionJob";

export const mockTuitionJobs: TuitionJob[] = [
  {
    _id: "1",
    title: "Need an experienced Math tutor for Class 9 student",
    student_gender: "male",
    course_level: "Class 9",
    subjects: ["Mathematics", "Physics", "Chemistry"],
    number_of_students: 1,
    tutoring_type: "home",
    category: "bangla",
    location: {
      address: "Mirpur DOHS, Dhaka",
    },
    days_per_week: 4,
    preferred_days: ["Sunday", "Tuesday", "Thursday", "Saturday"],
    preferred_time: "6:00 PM - 8:00 PM",
    salary: {
      amount: 8000,
      type: "monthly",
      negotiable: true,
    },
    tutor_gender: "male",
    tutor_qualification: "Science background preferred",
    tutor_experience_years: 2,
    special_requirements:
      "Student needs a patient tutor who can explain math fundamentals clearly and help with weekly exam preparation.",
    status: "open",
  },
  {
    _id: "2",
    title: "English medium student needs Bangla and English tutor",
    student_gender: "female",
    course_level: "Grade 6",
    subjects: ["Bangla", "English"],
    number_of_students: 1,
    tutoring_type: "home",
    category: "english",
    location: {
      address: "Dhanmondi 27, Dhaka",
    },
    days_per_week: 3,
    preferred_days: ["Monday", "Wednesday", "Friday"],
    preferred_time: "5:00 PM - 6:30 PM",
    salary: {
      amount: 10000,
      type: "monthly",
      negotiable: false,
    },
    tutor_gender: "female",
    tutor_qualification: "English medium background",
    tutor_experience_years: 3,
    special_requirements:
      "Guardian prefers a tutor with English medium background and strong communication skills.",
    status: "open",
  },
  {
    _id: "3",
    title: "Online ICT tutor required for HSC first year student",
    student_gender: "male",
    course_level: "HSC 1st Year",
    subjects: ["ICT"],
    number_of_students: 1,
    tutoring_type: "online",
    category: "both",
    location: {
      address: "Online",
    },
    days_per_week: 2,
    preferred_days: ["Tuesday", "Thursday"],
    preferred_time: "8:00 PM - 9:30 PM",
    salary: {
      amount: 6000,
      type: "monthly",
      negotiable: true,
    },
    tutor_qualification: "ICT or CSE background",
    tutor_experience_years: 1,
    special_requirements:
      "Tutor should focus on practical ICT topics, board question patterns, and regular problem solving.",
    status: "open",
  },
];
