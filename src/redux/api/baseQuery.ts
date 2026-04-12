import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import {baseUrl} from '@/config';
import {loggedInUser, loggedOutUser} from '@/redux/features/auth/authSlice';
import type {AuthSuccessResponse} from '@/redux/features/auth/auth.types';
import type {RootState} from '@/redux/store';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl.BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const token = (api.getState() as RootState).auth.refreshToken;
    const res = await fetch(`${baseUrl.AUTH_REFRESH_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: token }),
    });
    const data = (await res.json()) as AuthSuccessResponse;

    if (data.results) {
      api.dispatch(loggedInUser(data.results));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(loggedOutUser());
    }
  }
  return result;
};
