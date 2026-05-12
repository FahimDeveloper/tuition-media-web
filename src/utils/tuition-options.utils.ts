import tuitionLocations from "@/constant/bangladesh_tuition_locations.json";
import tutoringCategories from "@/constant/tutoring_category_courses_subjects.json";
import type {
  SelectOption,
  TuitionLocationCity,
  TuitionLocationsData,
  TutoringCategoriesData,
} from "@/types";

const tuitionLocationData = tuitionLocations as TuitionLocationsData;
const tutoringCategoryData = tutoringCategories as TutoringCategoriesData;

export const DEFAULT_TUITION_COUNTRY = tuitionLocationData[0]?.country ?? "";

const toDedupedOptions = (values: string[]): SelectOption[] =>
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

export const TUITION_COUNTRY_OPTIONS: SelectOption[] = toDedupedOptions(
  tuitionLocationData.map((location) => location.country),
);

export const getTuitionCityOptions = (
  countryName?: string,
): SelectOption[] =>
  toDedupedOptions(getTuitionCities(countryName).map((city) => city.name));

export const TUITION_CITY_OPTIONS: SelectOption[] = getTuitionCityOptions();

export const TUTORING_CATEGORY_OPTIONS: SelectOption[] = toDedupedOptions(
  tutoringCategoryData.data.map((category) => category.name),
);

export const getTuitionAreaOptions = (
  cityName?: string,
  countryName?: string,
): SelectOption[] => {
  if (!cityName) return [];

  return toDedupedOptions(
    getTuitionCities(countryName).flatMap((locationCity) =>
      locationCity.name === cityName ? locationCity.areas : [],
    ),
  );
};

export const getTutoringCourseOptions = (
  selectedCategories?: string[],
): SelectOption[] => {
  return toDedupedOptions(
    getSelectedTutoringCategories(selectedCategories).flatMap((category) =>
      category.courses.map((course) => course.course_name),
    ),
  );
};

export const getTutoringSubjectOptions = (
  selectedCategories?: string[],
  selectedCourses?: string[],
): SelectOption[] => {
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
  options: SelectOption[],
) => {
  if (!values?.length) return true;

  const validValues = new Set(options.map((option) => option.value));
  return values.every((value) => validValues.has(value));
};
