import { configureStore } from "@reduxjs/toolkit";
import { groceriesApi } from "services/groceriesApi";
import { shopsApi } from "services/shopsApi";
import { countingSlice } from "./slices/counting/slice";
import { groceriesSlice } from "./slices/groceries/slice";

export const store = configureStore({
  reducer: {
    [countingSlice.name]: countingSlice.reducer,
    [groceriesSlice.name]: groceriesSlice.reducer,
    [groceriesApi.reducerPath]: groceriesApi.reducer,
    [shopsApi.reducerPath]: shopsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(groceriesApi.middleware)
      .concat(shopsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
