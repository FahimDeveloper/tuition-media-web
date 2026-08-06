import locationDataRaw from "@/constants/bangladesh_tuition_locations.json";
import educationDataRaw from "@/constants/tutoring_category_courses_subjects.json";

// --- Interfaces: Define the "shape" of your JSON data to prevent runtime errors ---
export interface SelectOption {
  label: string;
  value: string;
}
export interface CityData {
  name: string;
  areas: string[];
}
export interface CountryLocationData {
  country: string;
  cities: CityData[];
}
export interface SubjectData {
  subject_name: string;
}
export interface CourseData {
  course_name: string;
  subjects: SubjectData[];
}
export interface EducationCategoryData {
  name: string;
  courses: CourseData[];
}
export interface EducationJsonStructure {
  data: EducationCategoryData[];
}

// Type assertion for imported JSON modules
const locationData = locationDataRaw as CountryLocationData[];
const educationCategoryData = (educationDataRaw as EducationJsonStructure).data;

/**
 * Utility: Standardizes array inputs into consistent label/value objects.
 * Cleans whitespace and removes duplicates automatically.
 */
const toUniqueOptions = (
  values: (string | undefined | null)[],
): SelectOption[] => {
  const cleanValues = values.filter(
    (val): val is string => typeof val === "string" && val.trim() !== "",
  );
  return Array.from(new Set(cleanValues)).map((value) => ({
    label: value,
    value: value,
  }));
};

/**
 * Utility: Security check to ensure the value selected by the user is actually valid.
 * Useful for validating API payloads before hitting the database.
 */
export const areValidOptionValues = (
  values: string[] | undefined,
  options: SelectOption[],
): boolean => {
  if (!values?.length) return true;
  const validSet = new Set(options.map((opt) => opt.value));
  return values.every((val) => validSet.has(val));
};

// --- LOCATION HELPERS ---

export const COUNTRY_OPTIONS: SelectOption[] = toUniqueOptions(
  locationData.map((loc) => loc.country),
);

/** Fetches list of cities based on a specific country. If no country is provided, returns all cities. */
const getCitiesByCountry = (countryName?: string): CityData[] => {
  const filteredCountries = countryName
    ? locationData.filter(
        (loc) => loc.country.toLowerCase() === countryName.toLowerCase(),
      )
    : locationData;
  return filteredCountries.flatMap((loc) => loc.cities);
};

export const getCityOptions = (countryName?: string): SelectOption[] =>
  toUniqueOptions(getCitiesByCountry(countryName).map((city) => city.name));

/** Returns areas for a specific city. Requires city name as context. */
export const getAreaOptions = (
  cityName?: string,
  countryName?: string,
): SelectOption[] => {
  if (!cityName) return [];
  const matchedAreas = getCitiesByCountry(countryName).flatMap((city) =>
    city.name.toLowerCase() === cityName.toLowerCase() ? city.areas : [],
  );
  return toUniqueOptions(matchedAreas);
};

// --- EDUCATION HELPERS ---

export const CATEGORY_OPTIONS: SelectOption[] = toUniqueOptions(
  educationCategoryData.map((cat) => cat.name),
);

/** Helper to filter the master category list down to selected items only. */
const getFilteredCategories = (
  categoryNames?: string[],
): EducationCategoryData[] => {
  if (!categoryNames?.length) return [];
  const categorySet = new Set(categoryNames.map((name) => name.toLowerCase()));
  return educationCategoryData.filter((cat) =>
    categorySet.has(cat.name.toLowerCase()),
  );
};

/** Returns courses linked to the selected category (e.g., "Academic" -> "Class 1-5"). */
export const getCourseOptions = (
  selectedCategories?: string[],
): SelectOption[] => {
  if (!selectedCategories?.length) return [];
  const courses = getFilteredCategories(selectedCategories).flatMap((cat) =>
    cat.courses.map((course) => course.course_name),
  );
  return toUniqueOptions(courses);
};

/** Returns specific subjects based on the selected course list. */
export const getSubjectOptions = (
  selectedCategories?: string[],
  selectedCourses?: string[],
): SelectOption[] => {
  if (!selectedCourses?.length) return [];
  const courseSet = new Set(selectedCourses.map((c) => c.toLowerCase()));
  const categories = getFilteredCategories(selectedCategories);
  const subjects = categories.flatMap((cat) =>
    cat.courses.flatMap((course) =>
      courseSet.has(course.course_name.toLowerCase())
        ? course.subjects.map((sub) => sub.subject_name)
        : [],
    ),
  );
  return toUniqueOptions(subjects);
};
