import type { IncomingQueryType, TuitionJob } from "@/types";

export type TuitionJobsQueryResponse = IncomingQueryType<TuitionJob>;

export type SingleTuitionJobQueryResponse = {
  message: string;
  result: TuitionJob;
};

export const tuitionJobsEndpoints = {
  all: "/tuition-jobs",
  single: (id: string) => `/tuition-jobs/${id}`,
} as const;

/*
 * RTK Query implementation note:
 * Keep this file type-only until the backend response shape is confirmed.
 * When ready, inject these endpoints into authApiSlice and export:
 * useAllTuitionJobsQuery and useSingleTuitionJobQuery.
 *
 * Example:
 *
 * const tuitionJobsApi = authApiSlice.injectEndpoints({
 *   endpoints: (builder) => ({
 *     allTuitionJobs: builder.query<TuitionJobsQueryResponse, void>({
 *       query: () => ({ url: tuitionJobsEndpoints.all, method: "GET" }),
 *     }),
 *     singleTuitionJob: builder.query<SingleTuitionJobQueryResponse, string>({
 *       query: (id) => ({ url: tuitionJobsEndpoints.single(id), method: "GET" }),
 *     }),
 *   }),
 * });
 */
