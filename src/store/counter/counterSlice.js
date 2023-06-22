import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    calc(state, action) {
      return action.payload;
    },
  },
});

export const counterReducer = counterSlice.reducer;
export const { calc } = counterSlice.actions;
