import { authApiSlice } from "@/redux/api/httpSlice";
import type {
  ITeacher,
  PublicTeacher,
  PublicTeachersQuery,
  TeacherProfilePatchPayload,
} from "@/types";
import { isRecord } from "@/utils/type-guards.utils";

type TeacherProfile = Partial<ITeacher>;

type UpdateTeacherProfileArgs = {
  teacherId: string;
  patch: TeacherProfilePatchPayload;
};

const isPublicTeacher = (value: unknown): value is PublicTeacher =>
  isRecord(value) &&
  typeof value._id === "string" &&
  typeof value.full_name === "string" &&
  typeof value.is_verified === "boolean" &&
  typeof value.is_active === "boolean";

const unwrapTeacherProfile = (
  response: unknown,
): TeacherProfile | undefined => {
  if (!isRecord(response)) return undefined;

  const profile =
    "results" in response
      ? response.results
      : "data" in response
        ? response.data
        : response;

  return isRecord(profile) ? (profile as TeacherProfile) : undefined;
};

const unwrapPublicTeachers = (response: unknown): PublicTeacher[] => {
  const teachers = Array.isArray(response)
    ? response
    : isRecord(response) && Array.isArray(response.results)
      ? response.results
      : isRecord(response) && Array.isArray(response.data)
        ? response.data
        : [];

  return teachers.filter(isPublicTeacher);
};

const unwrapPublicTeacher = (response: unknown): PublicTeacher | undefined => {
  if (isRecord(response) && Array.isArray(response.results)) {
    return isPublicTeacher(response.results[0])
      ? response.results[0]
      : undefined;
  }

  const teacher =
    isRecord(response) && "results" in response
      ? response.results
      : isRecord(response) && "data" in response
        ? response.data
        : response;

  return isPublicTeacher(teacher) ? teacher : undefined;
};

const profileApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allPublicTeachers: builder.query<
      PublicTeacher[],
      PublicTeachersQuery | void
    >({
      query: (query) => ({
        url: "/teachers/public",
        method: "GET",
        params: toPublicTeachersParams(query),
      }),
      transformResponse: unwrapPublicTeachers,
    }),
    singlePublicTeacher: builder.query<PublicTeacher | undefined, string>({
      query: (id) => ({
        url: `/teachers/public/profile/${id}`,
        method: "GET",
      }),
      transformResponse: unwrapPublicTeacher,
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

function toPublicTeachersParams(query?: PublicTeachersQuery | void) {
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
    ...(tutoring?.courses?.length
      ? { courses: tutoring.courses.join(",") }
      : {}),
    ...(tutoring?.subjects?.length
      ? { subjects: tutoring.subjects.join(",") }
      : {}),
  };
}
