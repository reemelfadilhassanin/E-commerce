import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",    
  role: "",
}

export const signin = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    signIn: (state, action) => {  
      state.email = action.payload; 
      state.role = "loggedIn";  
    },
    signout: (state) => {
      state.email = "";
      state.role = "";
    },
  },
})

export const { signIn, signout } = signin.actions;

export default signin.reducer;
