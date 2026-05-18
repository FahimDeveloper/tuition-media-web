import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "@/redux/features/auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { authApiSlice } from "@/redux/api/httpSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const rootReducers = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  auth: persistedAuthReducer,
});

export const rootMiddlewares = [authApiSlice.middleware];
