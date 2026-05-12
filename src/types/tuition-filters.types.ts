export type JobBoardFilterQuery = {
  preferred_teaching_locations?: {
    country?: string;
    city?: string;
    area?: string[];
  };
  preferred_tutoring?: {
    categories?: string[];
    courses?: string[];
    subjects?: string[];
  };
};
