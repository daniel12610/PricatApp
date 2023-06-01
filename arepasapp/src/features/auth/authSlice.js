import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : [],
  logged: localStorage.getItem("logged") ? JSON.parse(localStorage.getItem("logged")) : false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.logged = true;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      localStorage.setItem("logged", true);
    },
    logOut: (state) => {
      state.userInfo = {};
      state.logged = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("logged");
      toast.success('Su sesión ha sido cerrada', {position: toast.POSITION.TOP_CENTER}); 
    },
  }
})

export const { setLoggedUserInfo, logOut } = authSlice.actions;

export const getLoggedUser = (state) => state.auth.userInfo;

export const isLogged = (state) => state.auth.logged;

export default authSlice.reducer;