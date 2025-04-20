import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const PIZZAS_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
}

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async ({ categoryId, currentPage, sortBy, search }, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://6758135e60576a194d0eb1a9.mockapi.io/items`,
        {
          params: {
            category: categoryId > 0 ? categoryId : '',
            limit: 4,
            page: currentPage,
            title: search || '',
            sortBy: sortBy.includes('-') ? sortBy.replace('-', '') : sortBy,
            order: sortBy.includes('-') ? 'asc' : 'desc',
          },
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || 'Ошибка при загрузке пицц'
      )
    }
  }
)

const initialState = {
  items: [],
  status: PIZZAS_STATUS.IDLE,
  error: null,
}

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = PIZZAS_STATUS.LOADING
        state.error = null
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = PIZZAS_STATUS.SUCCEEDED
        state.items = action.payload
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = PIZZAS_STATUS.FAILED
        state.error = action.payload
      })
  },
})

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer
