import { createSlice } from "@reduxjs/toolkit";
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
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      // Clear user details in state and local storage
      state.user = {};
      localStorage.removeItem("user");
    },
  },
});

// Export actions
export const { login, logout } = LoginAuth.actions;

// Export reducer
