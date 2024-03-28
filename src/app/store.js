import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice";
import { authApi } from "../api/auth";
import { postApi } from "../api/post";
import { commentApi } from "../api/comment";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      postApi.middleware,
      commentApi.middleware
    ),

  devTools: true,
});

export default store;
