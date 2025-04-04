import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   categoryId: 0,
  sort:{
    name: 'популярности(ASC)',
    sort: 'rating',
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action){
      console.log(action)
      state.categoryId = action.payload
    },
    setSort(state, action){
      console.log(action)
      console.log(state)
      state.sort = action.payload
    }
  }
})


export const {setCategoryId, setSort} = filterSlice.actions

export default filterSlice.reducer