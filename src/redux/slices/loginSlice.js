import { createSlice } from '@reduxjs/toolkit';
import { loginDetails } from '../constants';


export const loginSlice = createSlice({
  name: 'login',
  initialState: loginDetails,
  reducers: {
    userLogin: (state, action) => {
      state.isLoginFlag = action?.payload;
    }
  },

});

export const { userLogin } = loginSlice.actions;

export default loginSlice.reducer;
