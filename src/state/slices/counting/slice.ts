import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface State {
  counter: number;
}

const initialState: State = {
  counter: 0,
};

export const countingSlice = createSlice({
  name: "counting",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    incrementBy: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
    decrementBy: (state, action: PayloadAction<number>) => {
      state.counter -= action.payload;
    },
  },
});
