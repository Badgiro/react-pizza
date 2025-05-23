import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizza from './slices/pizzasSlice'

export const store = configureStore({
  reducer: {
    filters: filter,
    cart,
    pizza,
  },
})
