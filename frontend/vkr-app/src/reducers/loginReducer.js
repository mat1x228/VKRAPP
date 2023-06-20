// import { createSlice } from '@reduxjs/toolkit';
// import { loginSuccess, loginFailure, logout } from '../authSlice';

// const loginReducer = createSlice({
//   name: 'login',
//   initialState: {
//     accessToken: null,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginSuccess, (state, action) => {
//         state.accessToken = action.payload;
//         state.error = null;
//       })
//       .addCase(loginFailure, (state, action) => {
//         state.accessToken = null;
//         state.error = action.payload;
//       })
//       .addCase(logout, (state) => {
//         state.accessToken = null;
//         state.error = null;
//       });
//   },
// });

// export default loginReducer.reducer;
