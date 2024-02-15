import { configureStore } from "@reduxjs/toolkit";
import { ChangeColor } from "./slice";
import { LoginAuth } from "./loginAuth";

export const store = configureStore({
  reducer: {
    ChangeColor: ChangeColor.reducer,
    LoginAuth: LoginAuth.reducer,
  },
});
