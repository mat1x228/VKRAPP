import { createSlice } from '@reduxjs/toolkit';
import { login, generateToken } from '../utils/api';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.accessToken = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.accessToken = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export const loginUser = (login, password, doRegister) => async (dispatch) => {
  try {
    const accessToken = await login(login, password, doRegister);
    dispatch(loginSuccess(accessToken));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const generateUserToken = () => async (dispatch) => {
  try {
    const token = await generateToken();
  } catch (error) {
    // Обработка ошибки
  }
};

export default authSlice.reducer;
