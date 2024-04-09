import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchDetails } from '../constants';
import { axiosPostRequest } from '../../service';

export const getSearchResults = createAsyncThunk(
  'user/getSearchResults',
  async (arg, { rejectWithValue }) => {
    try {
      const resp = await axiosPostRequest('/api/search', {}, arg);
      return resp.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState: searchDetails,
  reducers: {
    updateSearchQuery: (state, action) => {
      state.search = action.payload;
    },
    reset: (state) => searchDetails,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.results = payload.data.data;
        state.search = payload.searchQuery;
        state.isSuccess = true;
      })
      .addCase(getSearchResults.rejected, (state, { payload }) => {
        state.loading = false;
        state.isError = true;
        state.message = payload;
      })
      .addDefaultCase((state, action) => {});
  },
});

export const { updateSearchQuery, reset } = searchSlice.actions;

export default searchSlice.reducer;
