import { configureStore } from '@reduxjs/toolkit';
// import loginslice from './slices/loginSlice';
const storedToken = localStorage.getItem('token');

const initialUserState = {
  data: null,
  token: storedToken || '',
};

const store = configureStore({
  reducer: {
    // login: loginslice,
    login: '',
  },
  preloadedState: {
    loing: initialUserState,
  },
});

export default store;
