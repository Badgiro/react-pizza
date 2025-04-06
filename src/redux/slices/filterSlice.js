import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности(ASC)',
    sort: 'rating',
  },
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      console.log(action)
      state.categoryId = action.payload
    },
    setSort(state, action) {
      console.log(action)
      console.log(state)
      state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      const { categoryId, currentPage, sort } = action.payload
      state.categoryId = Number(categoryId)
      state.currentPage = Number(currentPage)
      state.sort = sort
    },
  },
})

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions

export default filterSlice.reducer
