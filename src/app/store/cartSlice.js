import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "CartSlice",
  initialState: {},
  reducers: {
    addToCart: (state, action) => {},
    removeFromCart: (state, action) => {},
    incrementQty: (state, action) => {},
    decrementQty: (state, action) => {},
  },
});

export const { addToCart, removeFromCart, incrementQty, decrementQty } =
  CartSlice.actions;
