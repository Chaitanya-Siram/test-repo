import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchKeyword: '',
};

const searchInputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.searchKeyword = action.payload;
    },
  },
});

export const { setInput } = searchInputSlice.actions;
export default searchInputSlice.reducer;
