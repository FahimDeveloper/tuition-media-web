import { authApiSlice } from "@/redux/api/httpSlice";
import type { TuitionJob, TuitionJobsQuery } from "@/types";
import { isRecord } from "@/utils/type-guards.utils";

const tuitionJobsApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allTuitionJobs: builder.query<TuitionJob[], TuitionJobsQuery | void>({
      query: (query) => ({
        url: "/tuition-jobs",
        method: "GET",
        params: toTuitionJobsParams(query),
      }),
      transformResponse: unwrapTuitionJobs,
    }),
    singleTuitionJobs: builder.query<TuitionJob | undefined, string>({
      query: (id) => ({
        url: `/tuition-jobs/${id}`,
        method: "GET",
      }),
      transformResponse: unwrapTuitionJob,
    }),
  }),
});

export const { useAllTuitionJobsQuery, useSingleTuitionJobsQuery } =
  tuitionJobsApi;

function toTuitionJobsParams(query?: TuitionJobsQuery | void) {
  const location = query?.preferred_teaching_locations;
  const tutoring = query?.preferred_tutoring;

  return {
    ...(query?.search ? { search: query.search } : {}),
    ...(location?.country ? { country: location.country } : {}),
    ...(location?.city ? { city: location.city } : {}),
    ...(location?.area?.length ? { area: location.area.join(",") } : {}),
    ...(tutoring?.categories?.length
      ? { categories: tutoring.categories.join(",") }
      : {}),
    ...(tutoring?.courses?.length ? { courses: tutoring.courses.join(",") } : {}),
    ...(tutoring?.subjects?.length
      ? { subjects: tutoring.subjects.join(",") }
      : {}),
  };
}

function unwrapTuitionJobs(response: unknown): TuitionJob[] {
  const directList = extractTuitionJobs(response);

  if (directList.length > 0 || Array.isArray(response)) {
    return directList;
  }

  if (!isRecord(response)) {
    return [];
  }

  const resultsList = extractTuitionJobs(response.results);

  if (resultsList.length > 0 || Array.isArray(response.results)) {
    return resultsList;
  }

  return extractTuitionJobs(response.data);
}

function unwrapTuitionJob(response: unknown): TuitionJob | undefined {
  if (isTuitionJob(response)) {
    return response;
  }

  if (!isRecord(response)) {
    return undefined;
  }

  const candidate =
    "results" in response
      ? response.results
      : "data" in response
        ? response.data
        : undefined;

  if (Array.isArray(candidate)) {
    return candidate.find(isTuitionJob);
  }

  return isTuitionJob(candidate) ? candidate : undefined;
}

function extractTuitionJobs(value: unknown): TuitionJob[] {
  if (Array.isArray(value)) {
    return value.filter(isTuitionJob);
  }

  if (!isRecord(value)) {
    return [];
  }

  if (Array.isArray(value.results)) {
    return value.results.filter(isTuitionJob);
  }

  if (Array.isArray(value.data)) {
    return value.data.filter(isTuitionJob);
  }

  if (Array.isArray(value.docs)) {
    return value.docs.filter(isTuitionJob);
  }

  return [];
}

function isTuitionJob(value: unknown): value is TuitionJob {
  return (
    isRecord(value) &&
    (typeof value._id === "string" || typeof value.id === "string")
  );
}
