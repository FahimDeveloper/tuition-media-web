import type { Rule } from "antd/es/form";
import { getDisplayValue } from "@/utils/display.utils";
import type { ProfileInfoField } from "../shared/ProfileInfoList";
import type { EducationStatus, TeacherEducation } from "../teacherProfileTypes";

export type AcademicGroup =
  | "Science"
  | "Business Studies"
  | "Humanities"
  | "Other";
export type Curriculum =
  | "Bangla Medium"
  | "English Version"
  | "English Medium"
  | "Other";
export type Board =
  | "Dhaka"
  | "Chattogram"
  | "Rajshahi"
  | "Khulna"
  | "Barishal"
  | "Sylhet"
  | "Rangpur"
  | "Mymensingh"
  | "Cumilla"
  | "Jessore"
  | "Dinajpur"
  | "Madrasah"
  | "Technical"
  | "Other";
export type InstituteType = "Government" | "Private" | "Other";
export type UniversityType =
  | "Public"
  | "Private"
  | "National University"
  | "Other";
export type StudyLevel =
  | "Medical"
  | "Engineering"
  | "BBA"
  | "BSC"
  | "BA"
  | "Degree"
  | "Fazil"
  | "BSS"
  | "LLB";
export type ScoreFieldName = "gpa" | "cgpa";

export type SchoolValues = NonNullable<TeacherEducation["school"]>;
export type CollegeValues = NonNullable<TeacherEducation["college"]>;
export type DiplomaValues = NonNullable<TeacherEducation["diploma"]>;
export type GraduationValues = NonNullable<TeacherEducation["graduation"]>;
export type PostGraduationValues = NonNullable<
  TeacherEducation["post_graduation"]
>;

export type EducationValues = {
  school: SchoolValues;
  college: CollegeValues;
  diploma: DiplomaValues;
  graduation: GraduationValues;
  post_graduation: PostGraduationValues;
};

export const yearRules: Rule[] = [
  {
    type: "number",
    min: 1900,
    max: 2099,
    message: "Enter a valid year",
  },
];

export const gpaRules: Rule[] = [
  {
    pattern: /^(?:[0-4](?:\.\d{1,2})?|5(?:\.0{1,2})?)$/,
    message: "Enter a valid GPA between 0 and 5",
  },
];

export const cgpaRules: Rule[] = [
  {
    pattern: /^(?:[0-3](?:\.\d{1,2})?|4(?:\.0{1,2})?)$/,
    message: "Enter a valid CGPA between 0 and 4",
  },
];

export const STATUS_OPTIONS: { label: string; value: EducationStatus }[] = [
  { label: "Graduated", value: "graduated" },
  { label: "Studying", value: "studying" },
];

export const GROUP_OPTIONS = [
  { label: "Science", value: "Science" },
  { label: "Business Studies", value: "Business Studies" },
  { label: "Humanities", value: "Humanities" },
  { label: "Other", value: "Other" },
];

export const CURRICULUM_OPTIONS = [
  { label: "Bangla Medium", value: "Bangla Medium" },
  { label: "English Version", value: "English Version" },
  { label: "English Medium", value: "English Medium" },
  { label: "Other", value: "Other" },
];

export const BOARD_OPTIONS = [
  { label: "Dhaka", value: "Dhaka" },
  { label: "Chattogram", value: "Chattogram" },
  { label: "Rajshahi", value: "Rajshahi" },
  { label: "Khulna", value: "Khulna" },
  { label: "Barishal", value: "Barishal" },
  { label: "Sylhet", value: "Sylhet" },
  { label: "Rangpur", value: "Rangpur" },
  { label: "Mymensingh", value: "Mymensingh" },
  { label: "Cumilla", value: "Cumilla" },
  { label: "Jessore", value: "Jessore" },
  { label: "Dinajpur", value: "Dinajpur" },
  { label: "Madrasah", value: "Madrasah" },
  { label: "Technical", value: "Technical" },
  { label: "Other", value: "Other" },
];

export const INSTITUTE_TYPE_OPTIONS = [
  { label: "Government", value: "Government" },
  { label: "Private", value: "Private" },
  { label: "Other", value: "Other" },
];

export const UNIVERSITY_TYPE_OPTIONS = [
  { label: "Public", value: "Public" },
  { label: "Private", value: "Private" },
  { label: "National University", value: "National University" },
  { label: "Other", value: "Other" },
];

export const STUDY_LEVEL_OPTIONS = [
  { label: "Medical", value: "Medical" },
  { label: "Engineering", value: "Engineering" },
  { label: "BBA", value: "BBA" },
  { label: "BSC", value: "BSC" },
  { label: "BA", value: "BA" },
  { label: "Degree", value: "Degree" },
  { label: "Fazil", value: "Fazil" },
  { label: "BSS", value: "BSS" },
  { label: "LLB", value: "LLB" },
];

export const INITIAL_SCHOOL_VALUES: SchoolValues = {
  name: "",
  group: "",
  curriculum: "",
  board: "",
  gpa: "",
  year_of_passing: undefined,
};

export const INITIAL_COLLEGE_VALUES: CollegeValues = {
  name: "",
  group: "",
  curriculum: "",
  board: "",
  gpa: "",
  year_of_passing: undefined,
  status: "graduated",
  is_diploma_student: false,
};

export const INITIAL_DIPLOMA_VALUES: DiplomaValues = {
  is_diploma: false,
  name: "",
  department: "",
  type: "",
  study_level: "",
  cgpa: "",
  session: "",
  status: "graduated",
};

export const INITIAL_GRADUATION_VALUES: GraduationValues = {
  name: "",
  department: "",
  type: "",
  study_level: "",
  gpa: "",
  session: "",
  status: "graduated",
};

export const INITIAL_POST_GRADUATION_VALUES: PostGraduationValues = {
  name: "",
  department: "",
  type: "",
  study_level: "",
  gpa: "",
  session: "",
  status: "graduated",
};

export const INITIAL_EDUCATION_VALUES: EducationValues = {
  school: INITIAL_SCHOOL_VALUES,
  college: INITIAL_COLLEGE_VALUES,
  diploma: INITIAL_DIPLOMA_VALUES,
  graduation: INITIAL_GRADUATION_VALUES,
  post_graduation: INITIAL_POST_GRADUATION_VALUES,
};

export const SCHOOL_INFO_ITEMS: ProfileInfoField<SchoolValues>[] = [
  { key: "name", label: "School Name" },
  { key: "group", label: "Group" },
  { key: "curriculum", label: "Curriculum" },
  { key: "board", label: "Board" },
  { key: "gpa", label: "GPA" },
  { key: "year_of_passing", label: "Year of Passing" },
];

export const COLLEGE_INFO_ITEMS: ProfileInfoField<CollegeValues>[] = [
  { key: "name", label: "College Name" },
  { key: "group", label: "Group" },
  { key: "curriculum", label: "Curriculum" },
  { key: "board", label: "Board" },
  { key: "gpa", label: "GPA" },
  { key: "year_of_passing", label: "Year of Passing" },
  { key: "status", label: "Status" },
  { key: "is_diploma_student", label: "Diploma Student" },
];

export const DIPLOMA_INFO_ITEMS: ProfileInfoField<DiplomaValues>[] = [
  { key: "is_diploma", label: "Diploma Student" },
  { key: "name", label: "Institution Name" },
  { key: "department", label: "Department" },
  { key: "type", label: "Institute Type" },
  { key: "study_level", label: "Study Level" },
  { key: "cgpa", label: "CGPA" },
  { key: "session", label: "Session" },
  { key: "status", label: "Status" },
];

export const GRADUATION_INFO_ITEMS: ProfileInfoField<GraduationValues>[] = [
  { key: "name", label: "University Name" },
  { key: "department", label: "Department" },
  { key: "type", label: "University Type" },
  { key: "study_level", label: "Study Level" },
  { key: "gpa", label: "GPA" },
  { key: "session", label: "Session" },
  { key: "status", label: "Status" },
];

export const POST_GRADUATION_INFO_ITEMS: ProfileInfoField<PostGraduationValues>[] =
  [
    { key: "name", label: "University Name" },
    { key: "department", label: "Department" },
    { key: "type", label: "University Type" },
    { key: "study_level", label: "Study Level" },
    { key: "gpa", label: "GPA" },
    { key: "session", label: "Session" },
    { key: "status", label: "Status" },
  ];

export const prepareEducationPayload = <TValues extends object>(
  values: TValues,
): TValues => {
  // The API owns the final field names. This helper only removes stale values
  // from fields that are not meaningful while a teacher is still studying.
  if (!("status" in values) || values.status !== "studying") return values;

  return {
    ...values,
    gpa: "",
    cgpa: "",
    year_of_passing: undefined,
  } as TValues;
};

export const formatEducationValue = <TValues extends object>(
  _key: keyof TValues,
  value: unknown,
) => {
  return getDisplayValue(value);
};
