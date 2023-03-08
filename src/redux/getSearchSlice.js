import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../modules/api/axiosbase';

export const getSearchSlice = createAsyncThunk(
  'search/getSearchResult',
  async (search, thunkAPI) => {
    const response = await api
      .get(`/api/reviews/keyword-reviews?keyword=${search}`)
      .then((response) => thunkAPI.fulfillWithValue(response.data))
      .catch((error) => thunkAPI.rejectWithValue());
    return response;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        console.log(action.payload.data);
      })
      .addCase(getSearchSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
