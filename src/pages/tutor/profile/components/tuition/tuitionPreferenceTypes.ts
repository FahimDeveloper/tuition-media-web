import {
  getArrayDisplayValue,
  getDisplayValue,
  getSalaryDisplayValue,
} from "../profileUtils";
import type { ProfileInfoField } from "../shared/ProfileInfoList";
import type { ITeacher } from "../teacherProfileTypes";
import tuitionLocations from "@/constant/bangladesh_tuition_locations.json";
import tutoringCategories from "@/constant/tutoring_category_courses_subjects.json";

type LocationOption = {
  label: string;
  value: string;
};

type TuitionLocationCity = {
  name: string;
  areas: string[];
};

type TuitionLocationCountry = {
  country: string;
  cities: TuitionLocationCity[];
};

type TuitionLocationsData = TuitionLocationCountry[];

type TutoringSubject = {
  subject_id: number;
  subject_name: string;
  course_id: number;
  course_name: string;
  category_id: number;
  category_name: string;
};

type TutoringCourse = {
  course_id: number;
  course_name: string;
  category_id: number;
  category_name: string;
  course_image: string | null;
  subjects: TutoringSubject[];
};

type TutoringCategory = {
  id: number;
  name: string;
  courses: TutoringCourse[];
};

type TutoringCategoriesData = {
  data: TutoringCategory[];
};

const tuitionLocationData = tuitionLocations as TuitionLocationsData;
const tutoringCategoryData = tutoringCategories as TutoringCategoriesData;
const DEFAULT_TUITION_COUNTRY = tuitionLocationData[0]?.country ?? "";

const toDedupedOptions = (values: string[]): LocationOption[] =>
  Array.from(new Set(values)).map((value) => ({
    label: value,
    value,
  }));

const getTuitionCities = (countryName?: string): TuitionLocationCity[] => {
  const locations = countryName
    ? tuitionLocationData.filter((location) => location.country === countryName)
    : tuitionLocationData;

  return locations.flatMap((location) => location.cities);
};

const getSelectedTutoringCategories = (selectedCategories?: string[]) => {
  if (!selectedCategories?.length) return [];

  const selectedCategorySet = new Set(selectedCategories);
  return tutoringCategoryData.data.filter((category) =>
    selectedCategorySet.has(category.name),
  );
};

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

export const TUITION_COUNTRY_OPTIONS: LocationOption[] = toDedupedOptions(
  tuitionLocationData.map((location) => location.country),
);

export const getTuitionCityOptions = (
  countryName?: string,
): LocationOption[] =>
  toDedupedOptions(getTuitionCities(countryName).map((city) => city.name));

export const TUITION_CITY_OPTIONS: LocationOption[] = getTuitionCityOptions();

export const TUTORING_CATEGORY_OPTIONS: LocationOption[] = toDedupedOptions(
  tutoringCategoryData.data.map((category) => category.name),
);

export const getTuitionAreaOptions = (
  cityName?: string,
  countryName?: string,
): LocationOption[] => {
  if (!cityName) return [];

  return toDedupedOptions(
    getTuitionCities(countryName).flatMap((locationCity) =>
      locationCity.name === cityName ? locationCity.areas : [],
    ),
  );
};

export const getTutoringCourseOptions = (
  selectedCategories?: string[],
): LocationOption[] => {
  return toDedupedOptions(
    getSelectedTutoringCategories(selectedCategories).flatMap((category) =>
      category.courses.map((course) => course.course_name),
    ),
  );
};

export const getTutoringSubjectOptions = (
  selectedCategories?: string[],
  selectedCourses?: string[],
): LocationOption[] => {
  if (!selectedCourses?.length) return [];

  const selectedCourseSet = new Set(selectedCourses);

  return toDedupedOptions(
    getSelectedTutoringCategories(selectedCategories).flatMap((category) =>
      category.courses.flatMap((course) =>
        selectedCourseSet.has(course.course_name)
          ? course.subjects.map((subject) => subject.subject_name)
          : [],
      ),
    ),
  );
};

export const areValidOptionValues = (
  values: string[] | undefined,
  options: LocationOption[],
) => {
  if (!values?.length) return true;

  const validValues = new Set(options.map((option) => option.value));
  return values.every((value) => validValues.has(value));
};

export const INITIAL_TUITION_PREFERENCE_VALUES: TuitionPreferenceValues = {
  preferred_teaching_locations: {
    country: DEFAULT_TUITION_COUNTRY,
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
