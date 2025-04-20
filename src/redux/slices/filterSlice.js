import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  currentPage: 1,
  search: '',
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
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setSearch(state, action) {
      state.search = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      const { categoryId, currentPage, sort, search } = action.payload
      state.categoryId = Number(categoryId)
      state.currentPage = Number(currentPage)
      state.sort = sort
      state.search = search
    },
  },
})

export const selectFilter = (state) => state.filters // Селектор для получения состояния фильтров
export const selectSort = (state) => state.filters.sort // Селектор для получения состояния сортировки

export const { setCategoryId, setSort, setCurrentPage, setSearch, setFilters } =
  filterSlice.actions

export default filterSlice.reducer
