/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DefinitionType,
  fetchBaseQuery,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";

import { baseUrl } from "../../config";
import type { RootState } from "../store";
import { loggedInUser, loggedOutUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl.BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const res = await fetch(`${baseUrl.AUTH_REFRESH_URL}`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (data.results) {
      api.dispatch(loggedInUser(data.results));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(loggedOutUser());
    }
  }
  return result;
};
