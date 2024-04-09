import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import dashbaordSlice from './slices/dashboardSlice';
import themeSlice from './slices/themeSlice';
import searchSlice from './slices/searchSlice';
import searchInputSlice from './slices/searchInputSlice';
import peopleDashboard from './slices/peopleDashboard';

// const storedUserData = localStorage.getItem('data');
const storedToken = localStorage.getItem('token');

const initialUserState = {
  data: null,
  token: storedToken || '',
};

const store = configureStore({
  reducer: {
    user: userSlice,
    dashboard: dashbaordSlice,
    theme: themeSlice,
    search: searchSlice,
    searchInput: searchInputSlice,
    peopleArray: peopleDashboard,
  },
  preloadedState: {
    user: initialUserState,
  },
});

export default store;
