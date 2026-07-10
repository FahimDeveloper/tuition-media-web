import { authApiSlice } from "@/redux/api/httpSlice";
import type {
  AppliedApplication,
  AppliedApplicationJob,
  AppliedApplicationPayload,
  AppliedApplicationStatus,
  ApplyTuitionJobResponse,
} from "@/types";
import { isRecord } from "@/utils/type-guards.utils";

const applicationStatuses: AppliedApplicationStatus[] = [
  "applied",
  "shortlisted",
  "rejected",
  "hired",
];

const tuitionJobApplicationApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyTuitionJob: builder.mutation<
      ApplyTuitionJobResponse | undefined,
      AppliedApplicationPayload
    >({
      query: (payload) => ({
        url: "/apply-applications/apply",
        method: "POST",
        body: payload,
      }),
      transformResponse: unwrapApplyTuitionJobResponse,
      invalidatesTags: (_result, _error, payload) => [
        { type: "AppliedTuitionJobs", id: payload.applicant },
      ],
    }),
    appliedTuitionJobs: builder.query<AppliedApplication[], string>({
      query: (userId) => ({
        url: `/apply-applications/applicant/${userId}`,
        method: "GET",
      }),
      transformResponse: unwrapAppliedApplications,
      providesTags: (_result, _error, userId) => [
        { type: "AppliedTuitionJobs", id: userId },
      ],
    }),
  }),
});

export const { useApplyTuitionJobMutation, useAppliedTuitionJobsQuery } =
  tuitionJobApplicationApi;

function unwrapApplyTuitionJobResponse(
  response: unknown,
): ApplyTuitionJobResponse | undefined {
  if (!isRecord(response)) {
    return undefined;
  }

  const results = isAppliedApplication(response.results)
    ? response.results
    : undefined;

  return {
    ...(typeof response.message === "string" ? { message: response.message } : {}),
    ...(results ? { results } : {}),
  };
}

function unwrapAppliedApplications(response: unknown): AppliedApplication[] {
  if (Array.isArray(response)) {
    return response.filter(isAppliedApplication);
  }

  if (!isRecord(response)) {
    return [];
  }

  const candidate =
    "results" in response
      ? response.results
      : "data" in response
        ? response.data
        : undefined;

  return Array.isArray(candidate) ? candidate.filter(isAppliedApplication) : [];
}

// The apply endpoint returns a job id, while the list endpoint expands job data.
function isAppliedApplication(value: unknown): value is AppliedApplication {
  return (
    isRecord(value) &&
    isApplicationJob(value.job) &&
    typeof value.applicant === "string" &&
    applicationStatuses.includes(value.status as AppliedApplicationStatus)
  );
}

function isApplicationJob(
  value: unknown,
): value is string | AppliedApplicationJob {
  return (
    typeof value === "string" ||
    (isRecord(value) &&
      (typeof value._id === "string" || typeof value.id === "string"))
  );
}
