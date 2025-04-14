import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

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
      return thunkAPI.rejectWithValue('Ошибка при загрузке пицц')
    }
  }
)
const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;