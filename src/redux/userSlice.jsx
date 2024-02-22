import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuthenticated: localStorage.getItem('userAccess') ? true : false,
  adminAuthenticated: localStorage.getItem('adminAccess') ? true : false,
  associateAuthenticated: localStorage.getItem('associateAccess') ? true : false,
  userData: '',

}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state) {
      state.userAuthenticated = true;
    },
    logoutUser(state) {
      state.userAuthenticated = false
      localStorage.removeItem('userAccess')
      localStorage.removeItem('userRefresh')
    },
    loginAdmin(state) {
      state.adminAuthenticated = true;
    },
    logoutAdmin(state) {
      state.adminAuthenticated = false
      localStorage.removeItem('adminAccess')
      localStorage.removeItem('adminRefresh')
    },
    loginAssociate(state) {
      state.associateAuthenticated = true;
    },
    logoutAssociate(state) {
      localStorage.removeItem('associateAccess')
      localStorage.removeItem('associateRefresh')
      state.associateAuthenticated = false

    }
  }
})

export const { loginUser, logoutUser, loginAdmin, logoutAdmin, loginAssociate, logoutAssociate } = userSlice.actions;
export default userSlice.reducer;