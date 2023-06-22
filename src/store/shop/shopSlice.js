import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categoriesAndDocumentLoader } from "../../utils/firebase/firebase.utils";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

export const fetchShopData = createAsyncThunk("shop/fetchShopData", () => {
  return categoriesAndDocumentLoader();
});

const shopSlice = createSlice({
  name: "shop",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchShopData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchShopData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchShopData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const shopReducer = shopSlice.reducer;
