import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  role: "",
};

export const signin = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    signout: (state,) => {
      state.email = null;
      state.role = null;
    },
  },
});

export const { signIn, signout } = signin.actions;

export default signin.reducer;
