import storage from "redux-persist/lib/storage";
import authReducer from "@/redux/features/auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import {
  authApiSlice,
  leadApiSlice,
  teachersApiSlice,
  tuitionJobsApiSlice,
} from "@/redux/api/httpSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const rootReducers = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [leadApiSlice.reducerPath]: leadApiSlice.reducer,
  [tuitionJobsApiSlice.reducerPath]: tuitionJobsApiSlice.reducer,
  [teachersApiSlice.reducerPath]: teachersApiSlice.reducer,
  auth: persistedAuthReducer,
});

export const rootMiddlewares = [
  authApiSlice.middleware,
  leadApiSlice.middleware,
  tuitionJobsApiSlice.middleware,
  teachersApiSlice.middleware,
];
