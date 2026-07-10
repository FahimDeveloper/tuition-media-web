type TApplicationStatus =
  | "applied"
  | "shortlisted"
  | "rejected"
  | "hired"
  | "cancelled";

type TApplicationSource = "website_application" | "admin_sourced";

// Interface matching your Mongoose Schema
export type TJobApplication = {
  _id: string;
  job: string | any; // Use 'string' for IDs or the full 'ITuitionJob' object if populated
  applicant: string | any; // Use 'string' for IDs or the full 'ITeacher' object if populated
  status: TApplicationStatus;
  source: TApplicationSource;
  managed_by?: string | null;
  createdAt: string;
  updatedAt: string;
};
