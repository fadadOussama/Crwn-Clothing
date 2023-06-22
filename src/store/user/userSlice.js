import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userDataLoading(state) {
      state.loading = true;
    },
    userDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    userDataFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { userDataLoading, userDataSuccess, userDataFailure } = userSlice.actions;
