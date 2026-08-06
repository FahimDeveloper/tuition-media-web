export type SelectOption = {
  label: string;
  value: string;
};

export type TuitionLocationCity = {
  name: string;
  areas: string[];
};

export type TuitionLocationCountry = {
  country: string;
  generatedAt?: string;
  cities: TuitionLocationCity[];
};

export type TuitionLocationsData = TuitionLocationCountry[];

export type TutoringSubject = {
  subject_id: number;
  subject_name: string;
  course_id: number;
  course_name: string;
  category_id: number;
  category_name: string;
};

export type TutoringCourse = {
  course_id: number;
  course_name: string;
  category_id: number;
  category_name: string;
  course_image: string | null;
  subjects: TutoringSubject[];
};

export type TutoringCategory = {
  id: number;
  name: string;
  courses: TutoringCourse[];
};

export type TutoringCategoriesData = {
  status?: boolean;
  message?: string;
  data: TutoringCategory[];
};
