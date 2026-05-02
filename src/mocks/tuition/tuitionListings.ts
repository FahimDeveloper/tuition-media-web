export type TuitionData = {
  id: string;
  title: string;
  postedDate: string;
  address: string;
  salary: string;
  daysPerWeek: number;
  category: string;
  course: string;
  subjects: string[] | string;
  tutoringTime: string;
  studentGender: string;
  duration: string;
  numOfStudents: number;
  tuitionType: string;
  tutorGender: string;
  tutorSubjectGroup: string;
  additionalNotes: string;
  totalViews: number;
  totalApplied: number;
};

export const tuitionMockListings: TuitionData[] = [
  {
    id: "1",
    title: "Tuition 1",
    postedDate: "2023-06-01",
    address: "Address 1",
    salary: "Salary 1",
    daysPerWeek: 5,
    category: "Category 1",
    course: "Course 1",
    subjects: ["Subject 1", "Subject 2"],
    tutoringTime: "Tutoring Time 1",
    studentGender: "Student Gender 1",
    duration: "Duration 1",
    numOfStudents: 10,
    tuitionType: "Tuition Type 1",
    tutorGender: "Tutor Gender 1",
    tutorSubjectGroup: "Tutor Subject Group 1",
    additionalNotes: "Additional Notes 1",
    totalViews: 100,
    totalApplied: 5,
  },
  {
    id: "2",
    title: "Tuition 2",
    postedDate: "2023-06-02",
    address: "Address 2",
    salary: "Salary 2",
    daysPerWeek: 6,
    category: "Category 2",
    course: "Course 2",
    subjects: ["Subject 3", "Subject 4"],
    tutoringTime: "Tutoring Time 2",
    studentGender: "Student Gender 2",
    duration: "Duration 2",
    numOfStudents: 20,
    tuitionType: "Tuition Type 2",
    tutorGender: "Tutor Gender 2",
    tutorSubjectGroup: "Tutor Subject Group 2",
    additionalNotes: "Additional Notes 2",
    totalViews: 200,
    totalApplied: 10,
  },
  {
    id: "3",
    title: "Tuition 3",
    postedDate: "2023-06-03",
    address: "Address 3",
    salary: "Salary 3",
    daysPerWeek: 7,
    category: "Category 3",
    course: "Course 3",
    subjects: ["Subject 5", "Subject 6"],
    tutoringTime: "Tutoring Time 3",
    studentGender: "Student Gender 3",
    duration: "Duration 3",
    numOfStudents: 30,
    tuitionType: "Tuition Type 3",
    tutorGender: "Tutor Gender 3",
    tutorSubjectGroup: "Tutor Subject Group 3",
    additionalNotes: "Additional Notes 3",
    totalViews: 300,
    totalApplied: 15,
  },
  {
    id: "4",
    title: "Tuition 4",
    postedDate: "2023-06-04",
    address: "Address 4",
    salary: "Salary 4",
    daysPerWeek: 8,
    category: "Category 4",
    course: "Course 4",
    subjects: ["Subject 7", "Subject 8"],
    tutoringTime: "Tutoring Time 4",
    studentGender: "Student Gender 4",
    duration: "Duration 4",
    numOfStudents: 40,
    tuitionType: "Tuition Type 4",
    tutorGender: "Tutor Gender 4",
    tutorSubjectGroup: "Tutor Subject Group 4",
    additionalNotes: "Additional Notes 4",
    totalViews: 400,
    totalApplied: 20,
  },
];
