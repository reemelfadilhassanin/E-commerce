import { configureStore } from '@reduxjs/toolkit'
import signin from './slices/signin'

export const store = configureStore({
  reducer: {
    signin,
  },
})
