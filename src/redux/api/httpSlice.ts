import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRefreshToken } from "./baseQuery";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["TeacherProfile"],
  endpoints: () => ({}),
});
