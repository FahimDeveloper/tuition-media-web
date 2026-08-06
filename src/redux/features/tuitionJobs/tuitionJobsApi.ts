import { tuitionJobsApiSlice } from "@/redux/api/httpSlice";
import type { TGlobalResponse, IncomingQueryType } from "@/types/index.types";
import { type TTuitionJob } from "@/types/jobs.types";

const extendedApi = tuitionJobsApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetches all jobs with optional query parameters
    getAllTuitionJobs: builder.query<IncomingQueryType<TTuitionJob>, unknown>({
      query: (params) => ({
        url: "/tuition-jobs",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["TuitionJobs"],
    }),

    // Fetches a single job by ID
    getTuitionJob: builder.query<TGlobalResponse<TTuitionJob>, string>({
      query: (id) => ({
        url: `/tuition-jobs/${id}`,
        method: "GET",
      }),
      providesTags: ["TuitionJobs"],
    }),
  }),
});

export const { useGetAllTuitionJobsQuery, useGetTuitionJobQuery } = extendedApi;
