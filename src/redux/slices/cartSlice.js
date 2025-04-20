import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // Проверяем, есть ли уже такой элемент в корзине
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice +=
        action.payload.price * (action.payload.count ? action.payload.count : 1)
    },
    removeItem(state, action) {
      // Уменьшаем количество товара в корзине

      const removedItem = state.items.find((item) => item.id === action.payload)
      if (removedItem.count > 1) {
        removedItem.count--
        state.totalPrice -= removedItem.price
      } else {
        state.totalPrice -= removedItem.price
        state.items = state.items.filter((item) => item.id !== action.payload)
      }
    },
    removeItemCompletely(state, action) {
      const itemToRemove = state.items.find((item) => item.id === action.payload)
      if (itemToRemove) {
        state.totalPrice -= itemToRemove.price * itemToRemove.count
        state.items = state.items.filter((item) => item.id !== action.payload)
      }
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
    setTotalPrice(state, action) {
      state.totalPrice = action.payload
    },
  },
})

export const selectCart = (state) => state.cart // Селектор для получения состояния корзины
export const selectCartItems =(id) =>(state) => state.cart.items.find((obj) => obj.id === id) // Селектор для получения элементов корзины
export const selectTotalPrice = (state) => state.cart.totalPrice // Селектор для получения общей цены корзины

export const { addItem, removeItem, clearItems, removeItemCompletely } = cartSlice.actions

export default cartSlice.reducer
