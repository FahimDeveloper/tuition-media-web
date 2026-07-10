import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

interface TState {
  user: null;
  accessToken: null;
}

const initialState: TState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    loggedOutUser: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { loggedInUser, loggedOutUser } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export default authSlice.reducer;
