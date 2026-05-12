import { authApiSlice } from "@/redux/api/httpSlice";
import type { ITeacher, TeacherProfilePatchPayload } from "@/types";
import { isRecord } from "@/utils/type-guards.utils";

type TeacherProfile = Partial<ITeacher>;

type UpdateTeacherProfileArgs = {
  teacherId: string;
  patch: TeacherProfilePatchPayload;
};

const unwrapTeacherProfile = (response: unknown): TeacherProfile | undefined => {
  if (!isRecord(response)) return undefined;

  const profile =
    "results" in response
      ? response.results
      : "data" in response
        ? response.data
        : response;

  return isRecord(profile) ? (profile as TeacherProfile) : undefined;
};

const profileApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allPublicTeachers: builder.query({
      query: () => ({
        url: "/teachers/public",
        method: "GET",
      }),
    }),
    singlePublicTeacher: builder.query({
      query: (id) => ({
        url: `/teachers/public/profile/${id}`,
        method: "GET",
      }),
    }),

    teacherProfile: builder.query<TeacherProfile | undefined, string>({
      query: (teacherId) => ({
        url: `/teachers/own/profile/${teacherId}`,
        method: "GET",
      }),
      transformResponse: unwrapTeacherProfile,
      providesTags: (_result, _error, id) => [{ type: "TeacherProfile", id }],
    }),

    updateTeacherProfile: builder.mutation<
      TeacherProfile | undefined,
      UpdateTeacherProfileArgs
    >({
      query: ({ teacherId, patch }) => ({
        url: `/teachers/profile/update/${teacherId}`,
        method: "PATCH",
        body: patch,
      }),
      transformResponse: unwrapTeacherProfile,
      invalidatesTags: (_result, _error, { teacherId }) => [
        { type: "TeacherProfile", id: teacherId },
      ],
    }),
  }),
});

export const {
  useAllPublicTeachersQuery,
  useSinglePublicTeacherQuery,
  useTeacherProfileQuery,
  useUpdateTeacherProfileMutation,
} = profileApi;
