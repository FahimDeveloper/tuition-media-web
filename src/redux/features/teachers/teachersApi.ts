import { teachersApiSlice } from "@/redux/api/httpSlice";
import type { TGlobalResponse, IncomingQueryType } from "@/types/index.types";
import type { TPublicTeacher } from "@/types/teacher.types";

const teachersApi = teachersApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetches all teachers
    getAllTeachersProfile: builder.query<
      IncomingQueryType<TPublicTeacher>,
      unknown
    >({
      query: (params) => ({
        url: "/teachers/public",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["Teachers"],
    }),

    // Fetches a single teacher by ID
    getSingleTeacherProfile: builder.query<
      TGlobalResponse<TPublicTeacher>,
      string
    >({
      query: (id) => ({
        url: `/teachers/public/${id}`,
        method: "GET",
      }),
      providesTags: ["Teachers"],
    }),
  }),
});

export const {
  useGetAllTeachersProfileQuery,
  useGetSingleTeacherProfileQuery,
} = teachersApi;
