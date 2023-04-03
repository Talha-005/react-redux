import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./slices/cartSlice"
import productSlice from "./slices/productSlice"

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products:productSlice
  },
})
