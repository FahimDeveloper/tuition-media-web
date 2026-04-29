import type {Rule} from 'antd/es/form';
import {getDisplayValue} from '../profileUtils';
import type {ProfileInfoField} from '../shared/ProfileInfoList';

export type AcademicGroup =
  | 'Science'
  | 'Business Studies'
  | 'Humanities'
  | 'Other';
export type Curriculum =
  | 'Bangla Medium'
  | 'English Version'
  | 'English Medium'
  | 'Other';

export type Board =
  | 'Dhaka'
  | 'Chattogram'
  | 'Rajshahi'
  | 'Khulna'
  | 'Barishal'
  | 'Sylhet'
  | 'Rangpur'
  | 'Mymensingh'
  | 'Cumilla'
  | 'Jessore'
  | 'Dinajpur'
  | 'Madrasah'
  | 'Technical'
  | 'Other';

export type InstituteType = 'Government' | 'Private' | 'Other';

export type UniversityType =
  | 'Public'
  | 'Private'
  | 'National University'
  | 'Other';

export type StudyType = 'Regular' | 'Part-time' | 'Distance Learning' | 'Other';

export type SchoolValues = {
  schoolName: string;
  group?: AcademicGroup;
  curriculum?: Curriculum;
  board?: Board;
  gpa: string;
  passingYear: string;
  isRunningStudent: boolean;
};

export type CollegeValues = {
  collegeName: string;
  group?: AcademicGroup;
  curriculum?: Curriculum;
  board?: Board;
  gpa: string;
  passingYear: string;
  isDiplomaStudent: boolean;
  isRunningStudent: boolean;
};

export type DiplomaValues = {
  institutionName: string;
  department: string;
  instituteType?: InstituteType;
  studyType?: StudyType;
  year: string;
  isRunningStudent: boolean;
};

export type GraduationValues = {
  universityName: string;
  department: string;
  universityType?: UniversityType;
  studyType?: StudyType;
  year: string;
  isRunningStudent: boolean;
};

export type EducationValues = {
  school: SchoolValues;
  college: CollegeValues;
  diploma: DiplomaValues;
  graduation: GraduationValues;
  postGraduation: GraduationValues;
};

export const yearRules: Rule[] = [
  {
    pattern: /^(19|20)\d{2}$/,
    message: 'Enter a valid year',
  },
];

export const gpaRules: Rule[] = [
  {
    pattern: /^(?:[0-4](?:\.\d{1,2})?|5(?:\.0{1,2})?)$/,
    message: 'Enter a valid GPA between 0 and 5',
  },
];

export const GROUP_OPTIONS = [
  {label: 'Science', value: 'Science'},
  {label: 'Business Studies', value: 'Business Studies'},
  {label: 'Humanities', value: 'Humanities'},
  {label: 'Other', value: 'Other'},
];

export const CURRICULUM_OPTIONS = [
  {label: 'Bangla Medium', value: 'Bangla Medium'},
  {label: 'English Version', value: 'English Version'},
  {label: 'English Medium', value: 'English Medium'},
  {label: 'Other', value: 'Other'},
];

export const BOARD_OPTIONS = [
  {label: 'Dhaka', value: 'Dhaka'},
  {label: 'Chattogram', value: 'Chattogram'},
  {label: 'Rajshahi', value: 'Rajshahi'},
  {label: 'Khulna', value: 'Khulna'},
  {label: 'Barishal', value: 'Barishal'},
  {label: 'Sylhet', value: 'Sylhet'},
  {label: 'Rangpur', value: 'Rangpur'},
  {label: 'Mymensingh', value: 'Mymensingh'},
  {label: 'Cumilla', value: 'Cumilla'},
  {label: 'Jessore', value: 'Jessore'},
  {label: 'Dinajpur', value: 'Dinajpur'},
  {label: 'Madrasah', value: 'Madrasah'},
  {label: 'Technical', value: 'Technical'},
  {label: 'Other', value: 'Other'},
];

export const INSTITUTE_TYPE_OPTIONS = [
  {label: 'Government', value: 'Government'},
  {label: 'Private', value: 'Private'},
  {label: 'Other', value: 'Other'},
];

export const UNIVERSITY_TYPE_OPTIONS = [
  {label: 'Public', value: 'Public'},
  {label: 'Private', value: 'Private'},
  {label: 'National University', value: 'National University'},
  {label: 'Other', value: 'Other'},
];

export const STUDY_TYPE_OPTIONS = [
  {label: 'Regular', value: 'Regular'},
  {label: 'Part-time', value: 'Part-time'},
  {label: 'Distance Learning', value: 'Distance Learning'},
  {label: 'Other', value: 'Other'},
];

export const INITIAL_SCHOOL_VALUES: SchoolValues = {
  schoolName: '',
  group: undefined,
  curriculum: undefined,
  board: undefined,
  gpa: '',
  passingYear: '',
  isRunningStudent: false,
};

export const INITIAL_COLLEGE_VALUES: CollegeValues = {
  collegeName: '',
  group: undefined,
  curriculum: undefined,
  board: undefined,
  gpa: '',
  passingYear: '',
  isDiplomaStudent: false,
  isRunningStudent: false,
};

export const INITIAL_DIPLOMA_VALUES: DiplomaValues = {
  institutionName: '',
  department: '',
  instituteType: undefined,
  studyType: undefined,
  year: '',
  isRunningStudent: false,
};

export const INITIAL_GRADUATION_VALUES: GraduationValues = {
  universityName: '',
  department: '',
  universityType: undefined,
  studyType: undefined,
  year: '',
  isRunningStudent: false,
};

export const INITIAL_EDUCATION_VALUES: EducationValues = {
  school: INITIAL_SCHOOL_VALUES,
  college: INITIAL_COLLEGE_VALUES,
  diploma: INITIAL_DIPLOMA_VALUES,
  graduation: INITIAL_GRADUATION_VALUES,
  postGraduation: INITIAL_GRADUATION_VALUES,
};

export const SCHOOL_INFO_ITEMS: ProfileInfoField<SchoolValues>[] = [
  {key: 'schoolName', label: 'School Name'},
  {key: 'group', label: 'Group'},
  {key: 'curriculum', label: 'Curriculum'},
  {key: 'board', label: 'Board'},
  {key: 'gpa', label: 'GPA'},
  {key: 'passingYear', label: 'Passing Year'},
  {key: 'isRunningStudent', label: 'Running Student'},
];

export const COLLEGE_INFO_ITEMS: ProfileInfoField<CollegeValues>[] = [
  {key: 'collegeName', label: 'College Name'},
  {key: 'group', label: 'Group'},
  {key: 'curriculum', label: 'Curriculum'},
  {key: 'board', label: 'Board'},
  {key: 'gpa', label: 'GPA'},
  {key: 'passingYear', label: 'Passing Year'},
  {key: 'isDiplomaStudent', label: 'Diploma Student'},
  {key: 'isRunningStudent', label: 'Running Student'},
];

export const DIPLOMA_INFO_ITEMS: ProfileInfoField<DiplomaValues>[] = [
  {key: 'institutionName', label: 'Institution Name'},
  {key: 'department', label: 'Department'},
  {key: 'instituteType', label: 'Institute Type'},
  {key: 'studyType', label: 'Study Type'},
  {key: 'year', label: 'Year'},
  {key: 'isRunningStudent', label: 'Running Student'},
];

export const GRADUATION_INFO_ITEMS: ProfileInfoField<GraduationValues>[] = [
  {key: 'universityName', label: 'University Name'},
  {key: 'department', label: 'Department'},
  {key: 'universityType', label: 'University Type'},
  {key: 'studyType', label: 'Study Type'},
  {key: 'year', label: 'Year'},
  {key: 'isRunningStudent', label: 'Running Student'},
];

export const formatEducationValue = (
  _key: string | number | symbol,
  value: unknown,
) => {
  return getDisplayValue(value);
};
