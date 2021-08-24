import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
}

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading } = commonSlice.actions;

export const getLoading = (state) => {
  return state.commonSlice.loading
};

export default commonSlice.reducer;
