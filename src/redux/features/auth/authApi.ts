import {authApiSlice} from '@/redux/api/httpSlice';

const authApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/teacher/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/teacher/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation} = authApi;
