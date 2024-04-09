import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userDetails } from '../constants';
import { axiosGetAPI, axiosPost } from '../../service/index';
import { API } from '../../constants';
import Cookies from 'js-cookie';
export const clearUserData = createAction('user/clearData');

export const getUserDetails = createAsyncThunk(
  'user/getData',
  async (arg, { rejectWithValue }) => {
    try {
      const resp = await axiosPost(
        `${API}/settings/login/`,
        { ...arg, HTTP_xUID_AGENT: Cookies.get('x-device-uuid') ?? '' },
        {
          accept: 'application/json',
          'Content-Type': 'application/json',
          // Cookie: 'csrftoken=EmZ1rpQpGgPuExCKHfGCyc32LkgssVgnsf5njVj58VowZaaCFeDixvnGIkfC0PnY'
        }
      );
      if (resp.isSuccessful) {
        console.log(resp.data);
        return resp?.data;
      } else {
        return rejectWithValue(resp?.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'user/verifyOTP',
  async (arg, { rejectWithValue }) => {
    try {
      const resp = await axiosPost(`${API}/settings/verify-otp/`, arg, {
        accept: 'application/json',
        'Content-Type': 'application/json',
        // Cookie: 'csrftoken=EmZ1rpQpGgPuExCKHfGCyc32LkgssVgnsf5njVj58VowZaaCFeDixvnGIkfC0PnY'
      });
      if (resp.isSuccessful) {
        return resp?.data;
      } else {
        return rejectWithValue(resp?.message);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const otpVerifyForgot = createAsyncThunk(
  'user/otpVerifyForgot',
  async (arg, { rejectWithValue }) => {
    try {
      const resp = await axiosPost(`${API}/settings/verify-forgot-otp/`, arg, {
        accept: 'application/json',
        'Content-Type': 'application/json',
        // Cookie: 'csrftoken=EmZ1rpQpGgPuExCKHfGCyc32LkgssVgnsf5njVj58VowZaaCFeDixvnGIkfC0PnY'
      });
      if (resp.isSuccessful) {
        return resp?.data;
      } else {
        return rejectWithValue(resp?.message);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getCreatePassword = createAsyncThunk(
  'user/createPassword',
  async (arg, { rejectWithValue }) => {
    // const query = qs.stringify(id);
    console.log(arg);
    try {
      const resp = await axiosPost(
        `${API}/settings/create_password/?id=${arg.id}`,
        {
          newPassword: arg.newPassword,
          confirmPassword: arg.confirmPassword,
        },
        {
          accept: 'application/json',
          'Content-Type': 'application/json',
          // Cookie: 'csrftoken=EmZ1rpQpGgPuExCKHfGCyc32LkgssVgnsf5njVj58VowZaaCFeDixvnGIkfC0PnY'
        }
      );
      console.log(resp);
      if (resp.isSuccessful) {
        return resp?.data;
      } else {
        rejectWithValue(resp?.message);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const verifyCreatePasswordOTP = createAsyncThunk(
  'user/verifyCreatePasswordOTP',
  async (arg, { rejectWithValue }) => {
    try {
      const resp = await axiosPost(
        `${API}/settings/validate_createpassword_OTP/?id=${arg.id}`,
        { otp: arg.otpNumber },
        {
          accept: 'application/json',
          'Content-Type': 'application/json',
          // Cookie: 'csrftoken=EmZ1rpQpGgPuExCKHfGCyc32LkgssVgnsf5njVj58VowZaaCFeDixvnGIkfC0PnY'
        }
      );
      if (resp.isSuccessful) {
        return resp?.data;
      } else {
        return rejectWithValue(resp?.message);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const resendOTP = createAsyncThunk(
  'user/resendOTP',
  async (arg, { rejectWithValue }) => {
    try {
      const resp = await axiosPost(
        `${API}/settings/resend-otp/?email=${arg?.email}&otp_type=${arg.otpType}`,
        {},
        {
          accept: 'application/json',
          'Content-Type': 'application/json',
          // Cookie: 'csrftoken=EmZ1rpQpGgPuExCKHfGCyc32LkgssVgnsf5njVj58VowZaaCFeDixvnGIkfC0PnY'
        }
      );
      if (resp.isSuccessful) {
        return resp?.data;
      } else {
        return rejectWithValue(resp?.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotPasswordOTP = createAsyncThunk(
  'user/forgotPasswordOTP',
  async (arg, { rejectWithValue }) => {
    try {
      const resp = await axiosPost(
        `${API}/settings/forgot-otp/?email=${arg?.email}`,
        {},
        {
          accept: 'application/json',
          'Content-Type': 'application/json',
          // Cookie: 'csrftoken=EmZ1rpQpGgPuExCKHfGCyc32LkgssVgnsf5njVj58VowZaaCFeDixvnGIkfC0PnY'
        }
      );
      if (resp.isSuccessful) {
        return resp?.data;
      } else {
        return rejectWithValue(resp?.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (arg, { rejectWithValue }) => {
    const { accessToken, ...payload } = arg;
    try {
      const resp = await axiosPost(
        `${API}/settings/update-password/`,
        payload,
        {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      );
      if (resp.isSuccessful) {
        return resp?.data;
      } else {
        return rejectWithValue(resp?.message);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (arg, { rejectWithValue }) => {
    try {
      const resp = await axiosPost(
        `${API}/settings/change_password/?id=${arg.id}`,
        {
          oldPassword: arg.currentPassword,
          newPassword: arg.newPassword,
          confirmPassword: arg.confirmPassword,
        },
        {
          accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${accessToken}`,
        }
      );
      if (resp.isSuccessful) {
        return resp?.data;
      } else {
        return rejectWithValue(resp?.message);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const verifyChangePasswordOTP = createAsyncThunk(
  'user/verifyChangePasswordOTP',
  async (arg, { rejectWithValue }) => {
    try {
      const resp = await axiosPost(
        `${API}/settings/validate_change_password/?id=${arg.id}`,
        { otp: arg.otpNumber },
        {
          accept: 'application/json',
          'Content-Type': 'application/json',
          // Cookie: 'csrftoken=EmZ1rpQpGgPuExCKHfGCyc32LkgssVgnsf5njVj58VowZaaCFeDixvnGIkfC0PnY'
        }
      );
      if (resp.isSuccessful) {
        return resp?.data;
      } else {
        return rejectWithValue(resp?.message);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const getUserDetailsAPI = createAsyncThunk(
  'user/getAPIData',
  async (arg) => {
    const response = await axiosGetAPI(`/settings/get-user/${arg}/`);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: userDetails,
  reducers: {
    userName: (state, action) => {
      state.name = action.payload;
    },
    userEmail: (state, action) => {
      state.email = action.payload;
    },
    userToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state, { payload }) => {
        state.loading = true;
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        localStorage.setItem('data', JSON.stringify(payload));
        state.token = payload?.token || '';
        // localStorage.setItem('token', payload?.token);
        state.userName = payload?.username || '';
        state.email = payload?.email || '';
        state.isSuccess = true;
      })
      .addCase(clearUserData, (state) => {
        state.loading = false;
        state.data = null;
        state.token = '';
        state.userName = '';
        state.email = '';
        state.isSuccess = false;
        localStorage.removeItem('data');
        localStorage.removeItem('token');
      })
      // You can match a range of action types
      .addMatcher(
        getUserDetails.rejected,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, { payload }) => {
          state.message = payload;
          state.loading = false;
        }
      )

      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {});
  },
  // extraReducers: {
  //   [getUserDetails.pending]: (state, { payload }) => {
  //     state.loading = true;
  //   },
  //   [getUserDetails.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     state.data = payload;
  //     state.isSuccess = true;
  //   },
  //   [getUserDetails.rejected]: (state, { payload }) => {
  //     state.message = payload;
  //     state.loading = false;
  //   },
  // },
});

export const { userName, userEmail, userToken } = userSlice.actions;

export default userSlice.reducer;
