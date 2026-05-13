import { authApiSlice } from "@/redux/api/httpSlice";

const tuitionJobsApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allTuitionJobs: builder.query({
      query: () => ({
        url: "/tuition-jobs",
        method: "GET",
      }),
    }),
    singleTuitionJobs: builder.query({
      query: (id) => ({
        url: `/tuition-jobs/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllTuitionJobsQuery, useSingleTuitionJobsQuery } =
  tuitionJobsApi;
