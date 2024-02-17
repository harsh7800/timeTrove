import { createSlice } from "@reduxjs/toolkit";
// import { cookies } from "next/headers";
import Cookies from "js-cookie";
export const LoginAuth = createSlice({
  name: "LoginAuth",
  initialState: {
    user: {},
  },
  reducers: {
    login: (state, action) => {
      // Your authentication logic goes here
      // For simplicity, let's assume a successful login for any username/password
      state.user = action.payload.user;
      // Save user details in local storage
      // cookies.set("user", JSON.stringify(state.user), { secure: true });
    },
    logout: (state) => {
      // Clear user details in state and local storage
      state.user = {};
      // cookies.delete("user");
    },
  },
});

// Export actions
export const { login, logout } = LoginAuth.actions;

// Export reducer
