import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const isFound = state.cart.find((item) => item.id === action.payload.id)
      if (!isFound) {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload)
    },
    incrementQuantity: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
    },
    decrementQuantity: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity > 2 ? item.quantity - 1 : 1 }
          : item,
      )
    },
    getCartTotal: (state) => {
      const { totalPrice, totalQuantity } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem
          const itemTotal = price * quantity
          cartTotal.totalPrice += itemTotal
          cartTotal.totalQuantity += quantity
          return cartTotal
        },
        { totalPrice: 0, totalQuantity: 0 },
      )
      state.totalQuantity = totalQuantity
      state.totalPrice = totalPrice.toFixed(2)
    },
  },
})

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  getCartTotal,
} = cartSlice.actions
export default cartSlice.reducer
