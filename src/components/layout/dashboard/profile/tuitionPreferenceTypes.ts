import {getArrayDisplayValue, getDisplayValue} from './profileUtils';

export type TeachingMethod = 'Home Tuition' | 'Online Tuition' | 'Group Tuition';

export type SalaryRange = {
  min?: number;
  max?: number;
};

export type TuitionPreferenceValues = {
  tuitionCountry: string;
  tuitionCity: string;
  preferredTuitionLocations: string[];
  preferredTutoringCategories: string[];
  favoriteSubjects: string[];
  preferredCoursesOrClasses: string[];
  tutoringExperience: string;
  availableDays: string[];
  preferredTeachingMethods: TeachingMethod[];
  expectedSalaryRange: SalaryRange;
};

export type TuitionPreferenceFieldConfig<
  T extends keyof TuitionPreferenceValues = keyof TuitionPreferenceValues,
> = {
  key: T;
  label: string;
};

export const TEACHING_METHOD_OPTIONS: {
  label: TeachingMethod;
  value: TeachingMethod;
}[] = [
  {label: 'Home Tuition', value: 'Home Tuition'},
  {label: 'Online Tuition', value: 'Online Tuition'},
  {label: 'Group Tuition', value: 'Group Tuition'},
];

export const AVAILABLE_DAY_OPTIONS = [
  {label: 'Saturday', value: 'Saturday'},
  {label: 'Sunday', value: 'Sunday'},
  {label: 'Monday', value: 'Monday'},
  {label: 'Tuesday', value: 'Tuesday'},
  {label: 'Wednesday', value: 'Wednesday'},
  {label: 'Thursday', value: 'Thursday'},
  {label: 'Friday', value: 'Friday'},
];

export const INITIAL_TUITION_PREFERENCE_VALUES: TuitionPreferenceValues = {
  tuitionCountry: 'Bangladesh',
  tuitionCity: '',
  preferredTuitionLocations: [],
  preferredTutoringCategories: [],
  favoriteSubjects: [],
  preferredCoursesOrClasses: [],
  tutoringExperience: '',
  availableDays: [],
  preferredTeachingMethods: [],
  expectedSalaryRange: {
    min: undefined,
    max: undefined,
  },
};

export const TUITION_PREFERENCE_ITEMS: TuitionPreferenceFieldConfig[] = [
  {key: 'tuitionCountry', label: 'Tuition Country'},
  {key: 'tuitionCity', label: 'Tuition City'},
  {key: 'preferredTuitionLocations', label: 'Preferred Tuition Locations'},
  {key: 'preferredTutoringCategories', label: 'Preferred Tutoring Categories'},
  {key: 'favoriteSubjects', label: 'Favorite Subjects for Tutoring'},
  {key: 'preferredCoursesOrClasses', label: 'Preferred Courses / Classes'},
  {key: 'tutoringExperience', label: 'Tutoring Experience'},
  {key: 'availableDays', label: 'Available Days'},
  {key: 'preferredTeachingMethods', label: 'Preferred Teaching Methods'},
  {key: 'expectedSalaryRange', label: 'Expected Salary Range'},
];

export const getSalaryDisplayValue = (salaryRange?: SalaryRange) => {
  if (!salaryRange?.min && !salaryRange?.max) return 'Not provided';

  const min = salaryRange.min ? `à§³${salaryRange.min}` : 'Any';
  const max = salaryRange.max ? `à§³${salaryRange.max}` : 'Any';

  return `${min} - ${max}`;
};

export const formatTuitionPreferenceValue = (
  key: keyof TuitionPreferenceValues,
  values: TuitionPreferenceValues,
) => {
  const value = values[key];

  if (Array.isArray(value)) {
    return getArrayDisplayValue(value);
  }

  if (key === 'expectedSalaryRange') {
    return getSalaryDisplayValue(values.expectedSalaryRange);
  }

  return getDisplayValue(value as string);
};
