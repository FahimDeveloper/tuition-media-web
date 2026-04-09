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

    registration: builder.mutation({
      query: (credentials) => ({
        url: '/auth/teacher/registration',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useLoginMutation, useRegistrationMutation} = authApi;
