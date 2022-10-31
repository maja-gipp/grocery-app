import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./common";
import type { Shop } from "./types";

const SHOPS_URL = "/shops";

export const shopsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  reducerPath: "shopsApi",
  tagTypes: ["shops"],
  endpoints: (build) => ({
    getShops: build.query<Shop[], void>({
      query: () => `${SHOPS_URL}`,
      providesTags: ["shops"]
    }),

    createShop: build.mutation<Shop, Pick<Shop, "name">>({
      query: ({ ...data }) => ({
        url: `${SHOPS_URL}`,
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: ["shops"],
    }),
    removeShop: build.mutation<Shop, number>({
      query: (id) => ({
        url: `${SHOPS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["shops"],
    }),
  }),
});
