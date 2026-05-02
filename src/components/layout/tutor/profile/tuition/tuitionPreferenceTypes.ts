import {
  getArrayDisplayValue,
  getDisplayValue,
  getSalaryDisplayValue,
} from "../profileUtils";
import type { ProfileInfoField } from "../shared/ProfileInfoList";
import type { ITeacher } from "../teacherProfileTypes";

export type TuitionPreferenceValues = Pick<
  ITeacher,
  | "preferred_teaching_locations"
  | "preferred_tutoring"
  | "years_of_experience"
  | "tutoring_availability"
>;

export const TEACHING_METHOD_OPTIONS = [
  { label: "Home Tuition", value: "home_tuition" },
  { label: "Online Tuition", value: "online_tuition" },
  { label: "Group Tuition", value: "group_tuition" },
];

export const AVAILABLE_DAY_OPTIONS = [
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
];

export const INITIAL_TUITION_PREFERENCE_VALUES: TuitionPreferenceValues = {
  preferred_teaching_locations: {
    country: "Bangladesh",
    city: "",
    area: [],
  },
  preferred_tutoring: {
    categories: [],
    courses: [],
    subjects: [],
    tutoring_types: [],
    salary_range: {
      min: undefined,
      max: undefined,
    },
  },
  years_of_experience: undefined,
  tutoring_availability: {
    days: [],
  },
};

export const TUITION_PREFERENCE_ITEMS: ProfileInfoField<TuitionPreferenceValues>[] =
  [
    {
      key: "preferred_teaching_locations.country",
      label: "Tuition Country",
      getValue: (values) => values.preferred_teaching_locations?.country,
    },
    {
      key: "preferred_teaching_locations.city",
      label: "Tuition City",
      getValue: (values) => values.preferred_teaching_locations?.city,
    },
    {
      key: "preferred_teaching_locations.area",
      label: "Preferred Tuition Locations",
      getValue: (values) => values.preferred_teaching_locations?.area,
    },
    {
      key: "preferred_tutoring.categories",
      label: "Preferred Tutoring Categories",
      getValue: (values) => values.preferred_tutoring?.categories,
    },
    {
      key: "preferred_tutoring.subjects",
      label: "Favorite Subjects for Tutoring",
      getValue: (values) => values.preferred_tutoring?.subjects,
    },
    {
      key: "preferred_tutoring.courses",
      label: "Preferred Courses / Classes",
      getValue: (values) => values.preferred_tutoring?.courses,
    },
    {
      key: "years_of_experience",
      label: "Tutoring Experience",
    },
    {
      key: "tutoring_availability.days",
      label: "Available Days",
      getValue: (values) => values.tutoring_availability?.days,
    },
    {
      key: "preferred_tutoring.tutoring_types",
      label: "Preferred Teaching Methods",
      getValue: (values) => values.preferred_tutoring?.tutoring_types,
    },
    {
      key: "preferred_tutoring.salary_range",
      label: "Expected Salary Range",
      getValue: (values) => values.preferred_tutoring?.salary_range,
    },
  ];

export const formatTuitionPreferenceValue = (
  key: keyof TuitionPreferenceValues,
  value: TuitionPreferenceValues[keyof TuitionPreferenceValues] | unknown,
) => {
  if (Array.isArray(value)) {
    return getArrayDisplayValue(value);
  }

  if (String(key).includes("salary_range")) {
    return getSalaryDisplayValue(value as { min?: number; max?: number });
  }

  return getDisplayValue(value);
};
