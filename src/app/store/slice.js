import { createSlice } from "@reduxjs/toolkit";

export const ChangeColor = createSlice({
  name: "ChangeColor",
  initialState: {
    color: "#f2f2f2",
  },
  reducers: {
    ChangeColorToBlack(state, action) {
      state.color = action.payload;
    },
  },
});

export const { ChangeColorToBlack } = ChangeColor.actions;
