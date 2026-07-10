import type { TuitionJob } from "./tuition-job.types";

export type AppliedApplicationStatus =
  | "applied"
  | "shortlisted"
  | "rejected"
  | "hired";

export type AppliedApplicationJob = Partial<TuitionJob> & {
  _id?: string;
  id?: string;
};

export interface AppliedApplication {
  _id?: string;
  job: string | AppliedApplicationJob;
  applicant: string;
  status: AppliedApplicationStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppliedApplicationPayload {
  job: string;
  applicant: string;
}

export interface ApplyTuitionJobResponse {
  message?: string;
  results?: AppliedApplication;
}
