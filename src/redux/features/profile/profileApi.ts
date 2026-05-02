import { authApiSlice } from "@/redux/api/httpSlice";

const profileApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allTeachers: builder.query({
      query: () => ({
        url: "/teachers",
        method: "GET",
      }),
    }),
    singleTeacher: builder.query({
      query: () => ({
        url: `/teachers/profile`,
        method: "GET",
      }),
    }),
    updateTeacher: builder.mutation({
      query: (payload) => ({
        url: `/teachers/profile`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const {
  useAllTeachersQuery,
  useSingleTeacherQuery,
  useUpdateTeacherMutation,
} = profileApi;
