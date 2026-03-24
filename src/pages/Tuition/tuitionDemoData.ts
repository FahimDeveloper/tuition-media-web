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

export const tuitionDemoData: TuitionData[] = [
  {
    id: '1',
    title: 'Tuition 1',
    postedDate: '2023-06-01',
    address: 'Address 1',
    salary: 'Salary 1',
    daysPerWeek: 5,
    category: 'Category 1',
    course: 'Course 1',
    subjects: ['Subject 1', 'Subject 2'],
    tutoringTime: 'Tutoring Time 1',
    studentGender: 'Student Gender 1',
    duration: 'Duration 1',
    numOfStudents: 10,
    tuitionType: 'Tuition Type 1',
    tutorGender: 'Tutor Gender 1',
    tutorSubjectGroup: 'Tutor Subject Group 1',
    additionalNotes: 'Additional Notes 1',
    totalViews: 100,
    totalApplied: 5,
  },
  {
    id: '2',
    title: 'Tuition 2',
    postedDate: '2023-06-02',
    address: 'Address 2',
    salary: 'Salary 2',
    daysPerWeek: 6,
    category: 'Category 2',
    course: 'Course 2',
    subjects: ['Subject 3', 'Subject 4'],
    tutoringTime: 'Tutoring Time 2',
    studentGender: 'Student Gender 2',
    duration: 'Duration 2',
    numOfStudents: 20,
    tuitionType: 'Tuition Type 2',
    tutorGender: 'Tutor Gender 2',
    tutorSubjectGroup: 'Tutor Subject Group 2',
    additionalNotes: 'Additional Notes 2',
    totalViews: 200,
    totalApplied: 10,
  },
];
