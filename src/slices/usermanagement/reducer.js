import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userDetail: "",
  error: "", // for error message
  loading: false,
};

const userDetailSlice = createSlice({
  name: "user management",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload;
      state.loading = true;
      state.errorMsg = true;
    },
    userDetailSuccess(state, action) {
      state.userDetail = action.payload;
      state.loading = false;
      state.errorMsg = false;
    },
    userDetailFailure(state, action) {
      state.error = null;
      state.loading = false;
      state.errorMsg = false;
    },
  },
});

export const { apiError, userDetailSuccess, userDetailFailure } =
  userDetailSlice.actions;

export default userDetailSlice.reducer;
