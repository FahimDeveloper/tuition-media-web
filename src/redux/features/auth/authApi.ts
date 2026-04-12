import {authApiSlice} from '@/redux/api/httpSlice';
import type {
  AuthSuccessResponse,
  LoginPayload,
  RegistrationPayload,
} from '@/redux/features/auth/auth.types';

const authApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthSuccessResponse, LoginPayload>({
      query: (credentials) => ({
        url: '/auth/teacher/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    registration: builder.mutation<AuthSuccessResponse, RegistrationPayload>({
      query: (credentials) => ({
        url: '/auth/teacher/registration',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useLoginMutation, useRegistrationMutation} = authApi;
