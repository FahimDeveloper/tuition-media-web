export type TeacherSummary = {
  _id: string;
  full_name: string;
  is_verified: boolean;
  gender?: string;
  years_of_experience?: number;
  about_me?: string;
  preferred_teaching_locations?: {
    city?: string;
    area?: string[];
  };
  preferred_tutoring?: {
    salary_range?: {
      min?: number;
      max?: number;
    };
    courses?: string[];
    subjects?: string[];
  };
  education?: {
    school?: EducationInfo;
    college?: EducationInfo;
    graduation?: EducationInfo;
    post_graduation?: EducationInfo;
  };
};

export type EducationInfo = {
  name?: string;
  group?: string;
  department?: string;
  curriculum?: string;
  board?: string;
  gpa?: string;
  year_of_passing?: number;
  session?: string;
  status?: string;
  study_level?: string;
};

export const mockTeachers: TeacherSummary[] = [
  {
    _id: "69ff8fc471e74a62fb13783f",
    full_name: "Shakib 1",
    is_verified: false,
    gender: "male",
    years_of_experience: 2,
    about_me: "",
    preferred_teaching_locations: {
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
    gender: "female",
    years_of_experience: 5,
    about_me:
      "Dedicated and student-focused tutor with a passion for making learning simple, engaging, and effective.",
    preferred_teaching_locations: {
      city: "Chapai Nawabganj",
      area: ["Manaksha"],
    },
    preferred_tutoring: {
      salary_range: {
        min: 4000,
        max: 7000,
      },
      courses: ["Pre-Schooling"],
      subjects: ["Bangla"],
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
        study_level: "BBA",
        status: "studying",
        session: "2025-2026",
      },
      post_graduation: {
        name: "Savar cantonment school and college",
        department: "computer science",
        study_level: "Engineering",
        status: "graduated",
        session: "2033-2033",
      },
    },
  },
  {
    _id: "69ffad1ad7e8597b85ef6acd",
    full_name: "Shakibul Islam",
    is_verified: false,
    gender: "male",
    years_of_experience: 0,
    about_me: "",
    preferred_teaching_locations: {
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
