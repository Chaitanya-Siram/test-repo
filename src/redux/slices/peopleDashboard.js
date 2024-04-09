import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  peopleDashboard: [],
  updatePeople: false,
  chartTitle: {},
};

const peopleDashboardSlice = createSlice({
  name: 'peopleChart',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.peopleDashboard = action.payload;
    },
    setPeopleChart: (state) => {
      state.updatePeople = !state.updatePeople;
    },
    setChartTitle: (state, action) => {
      state.chartTitle = action.payload;
    },
  },
});

export const { setName, setPeopleChart, setChartTitle } =
  peopleDashboardSlice.actions;
export default peopleDashboardSlice.reducer;
