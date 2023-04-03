import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
axios.defaults.baseURL = "https://fakestoreapi.com"

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
    status: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false
        state.status = 200
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false
        state.status = action.payload.status
        state.error = action.payload.message
      })
  },
})

export const getProducts = createAsyncThunk(
  "getProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("/products?limit=10")
      return res.data
    } catch (error) {
      console.log(error)
      return rejectWithValue({
        message: error.response.statusText,
        status: error.response.status,
      })
    }
  },
)

export default productSlice.reducer
