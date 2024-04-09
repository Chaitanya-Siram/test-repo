import { createSlice } from '@reduxjs/toolkit';
import { selectedTheme } from '../constants';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: selectedTheme,
  reducers: {
    updateTheme: (state, action) => {
      state = action.payload;
    },
  },
});

export const { updateTheme } = themeSlice.actions;

export default themeSlice.reducer;
