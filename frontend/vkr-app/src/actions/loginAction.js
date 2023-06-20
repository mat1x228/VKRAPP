import { loginUser, loginSuccess, loginFailure } from '../authSlice';

export const loginAction = (login, password, doRegister) => async (dispatch) => {
  try {
    const accessToken = await login(login, password, doRegister);
    dispatch(loginSuccess(accessToken));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
