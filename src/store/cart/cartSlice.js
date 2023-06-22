import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    click(state) {
      return !state;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { click } = cartSlice.actions;
