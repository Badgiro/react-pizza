import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    filters: filter,
  },
})

console.log(store)