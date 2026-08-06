import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRefreshToken } from "./baseQuery";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["TeacherProfile", "AppliedTuitionJobs"],
  endpoints: () => ({}),
});

export const leadApiSlice = createApi({
  reducerPath: "leadApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["leads"],
  endpoints: () => ({}),
});

export const tuitionJobsApiSlice = createApi({
  reducerPath: "tuitionJobsApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["TuitionJobs"],
  endpoints: () => ({}),
});

export const teachersApiSlice = createApi({
  reducerPath: "teachersApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["Teachers"],
  endpoints: () => ({}),
});

