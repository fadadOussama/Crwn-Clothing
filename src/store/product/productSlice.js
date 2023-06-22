import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setData(state, action) {
      state.quantity;
      return action.payload;
    },
    setQuantity(state, action) {
      state.map((productItem) => {
        if (productItem.id === action.payload) {
          productItem.quantity += 1;
        }
      });
    },
  },
});

export const productReducer = productSlice.reducer;
export const { setData, setQuantity } = productSlice.actions;
