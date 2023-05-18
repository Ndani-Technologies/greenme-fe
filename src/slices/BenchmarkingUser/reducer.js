import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  benchmarks: "",
  error: "", // for error message
  loading: false,
  errorMsg: false, // for error
};

const benchmarkSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.data;
      state.loading = true;
      state.errorMsg = true;
    },
    benchmarkSuccess(state, action) {
      state.benchmarks = action.payload;
      state.loading = false;
      state.errorMsg = false;
    },
  },
});

export const { benchmarkSuccess, apiError } = benchmarkSlice.actions;

export default benchmarkSlice.reducer;
