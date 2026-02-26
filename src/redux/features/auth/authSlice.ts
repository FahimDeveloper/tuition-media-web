import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface TState {
  user: null | {
    _id: string;
    full_name: string;
    image: string;
    email: string;
    role: string;
    phone: string;
    gender: string;
    date_of_birth: string;
  };
  accessToken: null | string;
  refreshToken: null | string;
}

const initialState: TState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    loggedOutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { loggedInUser, loggedOutUser } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export default authSlice.reducer;
