import { configureStore } from "@reduxjs/toolkit"
import userDetail from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    users: userDetail,
  },
})
