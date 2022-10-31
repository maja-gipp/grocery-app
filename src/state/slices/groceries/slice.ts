import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { groceriesApi } from "services/groceriesApi";

export interface State {
  activeTabId: null | number;
  editId: null | number;
}

const initialState: State = {
  activeTabId: null,
  editId: null,
};

export const groceriesSlice = createSlice({
  name: "groceries",
  initialState,
  reducers: {
    setActiveTabId: (state, action: PayloadAction<number>) => {
      state.activeTabId = action.payload;
    },
    setEditId: (state, action: PayloadAction<number>) => {
      state.editId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      groceriesApi.endpoints.getGroceryLists.matchFulfilled,
      (state, { payload }) => {
        if (payload.length > 0) {
          state.activeTabId = payload[0].id;
        }
      }
    );
    builder.addMatcher(
      groceriesApi.endpoints.patchGrocery.matchFulfilled,
      (state) => {
        state.editId = null;
      }
    );
    builder.addMatcher(
      groceriesSlice.actions.setActiveTabId.match,
      (_, { payload }) => {
        groceriesApi.endpoints.getGroceriesFromList.initiate(payload);
      }
    );
  },
});

export default groceriesSlice.reducer;
