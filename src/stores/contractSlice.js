import { createSlice } from "@reduxjs/toolkit";

const contractSlice = createSlice({
  name: "contract",
  initialState: {
    contract: {},
  },
  reducers: {
    setCurrentContract: (state, action) => {
      return {
        ...state,
        contract: { ...action.payload },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentContract } = contractSlice.actions;

export const getContract = (state) => state.contractSlice.contract;

export default contractSlice.reducer;
