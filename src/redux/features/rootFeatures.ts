import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const rootReducers = combineReducers({
  auth: persistedAuthReducer,
});

export const rootMiddlewares = [];
