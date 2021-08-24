import { createSlice } from "@reduxjs/toolkit";

const mockUserByRoles = ["admin@gmail.com", "staff@gmail.com", "management@gmail.com", "monitoring@gmail.com"];

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userProfile: {},
  },
  reducers: {
    setCurrentUser: (state, action) => {
      return {
        ...state,
        userProfile: { ...action.payload },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser } = authSlice.actions;

export const getUser = (state) => state.authSlice.userProfile;

export default authSlice.reducer;
