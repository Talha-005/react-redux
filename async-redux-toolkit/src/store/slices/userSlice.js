import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
axios.defaults.baseURL = ""

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: [],
    status: 0,
    loading: false,
    error: null,
    searchUser: "",
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false
        state.status = 200
        state.users = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false
        state.status = action.payload.status
        state.error = action.payload.message
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.status = 201
        state.users.push(action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.status = action.payload.status
        state.error = action.payload.message
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = false
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.status = 201
        state.users = state.users.filter(({ id }) => id !== action.payload.id)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.status = action.payload.status
        state.error = action.payload.message
      })
      .addCase(editUser.pending, (state) => {
        state.loading = false
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false
        state.status = 201
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        )
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false
        state.status = action.payload.status
        state.error = action.payload.message
      })
  },
})

//user get Action
export const getUsers = createAsyncThunk(
  "getUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/users")
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

//user create Action
export const createUser = createAsyncThunk(
  "createUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/v1/users", payload)
      return res.data
    } catch (error) {
      return rejectWithValue({
        message: error.response.statusText,
        status: error.response.status,
      })
    }
  },
)

//user delete Action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/v1/users/${id}`)
      return res.data
    } catch (error) {
      return rejectWithValue({
        message: error.response.statusText,
        status: error.response.status,
      })
    }
  },
)

//user edit Action
export const editUser = createAsyncThunk(
  "editUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/v1/users/${payload.id}`, payload)
      return res.data
    } catch (error) {
      return rejectWithValue({
        message: error.response.statusText,
        status: error.response.status,
      })
    }
  },
)

export const { searchUser } = userSlice.actions
export default userSlice.reducer
