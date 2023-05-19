import { createSlice } from "@reduxjs/toolkit";
import { addBenchmark } from "./thunk";

export const initialState = {
  benchmarks: "",
  error: "", // for error message
  loading: false,
  errorMsg: false, // for error
};

const benchmarkSlice = createSlice({
  name: "benchmark",
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
  // extraReducers: (builder) => {

  //   builder.addCase(addBenchmark.fulfilled, (state, action) => {
  //     state.benchmarks.push(action.payload);
  //     state.isBenchmarkCreated = false;
  //     state.isBenchmarkSuccess = true;
  //   });

  //   builder.addCase(addBenchmark.rejected, (state, action) => {
  //     console.log("action", action.payload)
  //     state.error = action.payload.error || null;
  //     state.isBenchmarkCreated = false;
  //     state.isBenchmarkSuccess = false;
  //   });

  // },
});

export const { benchmarkSuccess, apiError } = benchmarkSlice.actions;

export default benchmarkSlice.reducer;
