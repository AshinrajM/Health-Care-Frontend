import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem('access') ? true : false,
  userData: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state) {
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      state.isAuthenticated = false   
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
    }
  }
})

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;