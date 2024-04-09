import { createSlice } from '@reduxjs/toolkit';
import { dashboardDetails } from '../constants';

export const dashbaordSlice = createSlice({
  name: 'dashboard',
  initialState: dashboardDetails,
  reducers: {
    updateDashboard: (state, action) => {
      state = action.payload;
    },
  },
});

export const { updateDashboard } = dashbaordSlice.actions;

export default dashbaordSlice.reducer;
