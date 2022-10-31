import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./common";
import type { GroceryItem, GroceryList } from "./types";

const GROCERY_LISTS_URL = "/groceryLists";
const GROCERIES_URL = "/groceries";

export type GroceryListWithGroceries = GroceryList & { groceries: GroceryItem[] }

export const groceriesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  reducerPath: "groceriesApi",
  tagTypes: ["groceries"],
  endpoints: (build) => ({
    getGroceryLists: build.query<GroceryList[], void>({
      query: () => `${GROCERY_LISTS_URL}`,
      providesTags: ["groceries"]
    }),
    getGroceriesFromList: build.query<GroceryListWithGroceries, number>({
      query: (listId) => `${GROCERY_LISTS_URL}/${listId}?_embed=groceries`,
      providesTags: ["groceries"],
    }),
    patchGroceryList: build.mutation<GroceryList, Pick<GroceryList, "id"> & Partial<GroceryList>>({
      query: ({ id, ...patch }) => ({
        url: `${GROCERY_LISTS_URL}/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["groceries"],
    }),
    createGroceryList: build.mutation<GroceryList, Pick<GroceryList, 'title'>>({
      query: (data) => ({
        url: `${GROCERY_LISTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['groceries']
    }),
    patchGrocery: build.mutation<GroceryItem, Pick<GroceryItem, "id"> & Partial<GroceryItem>>(
      {
        query: ({ id, ...patch }) => ({
          url: `${GROCERIES_URL}/${id}`,
          method: "PATCH",
          body: patch,
        }),
        invalidatesTags: ["groceries"],
      }
    ),
    createGrocery: build.mutation<
      GroceryItem,
      Pick<GroceryItem, "item" | "groceryListId" | "price" | "notes" >
    >({
      query: ({ ...data }) => ({
        url: `${GROCERIES_URL}`,
        method: "POST",
        body: {
          complete: false,
          ...data,
        },
      }),
      invalidatesTags: ["groceries"],
    }),
    removeGrocery: build.mutation<GroceryItem, number>({
      query: (id) => ({
        url: `${GROCERIES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["groceries"],
    }),
    completeGrocery: build.mutation<
      GroceryItem,
      { id: GroceryItem["id"]; shouldBeComplete: boolean }
    >({
      query: ({ id, shouldBeComplete }) => ({
        url: `${GROCERIES_URL}/${id}`,
        method: "PATCH",
        body: { complete: shouldBeComplete },
      }),
      invalidatesTags: ["groceries"],
    }),
  }),
});
