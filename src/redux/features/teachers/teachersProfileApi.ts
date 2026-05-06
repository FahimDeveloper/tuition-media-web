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
      query: (id) => ({
        url: `/teachers/profile/${id}`,
        method: "GET",
      }),
    }),
    updateTeacher: builder.mutation({
      query: (payload) => ({
        url: `/teachers/profile${payload._id}`,
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
