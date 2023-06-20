import { createSlice } from '@reduxjs/toolkit';
import { getStats } from '../api';
const initialState = {
  data: null,
  error: null,
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    fetchStatsSuccess: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },
    fetchStatsFailure: (state, action) => {
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { fetchStatsSuccess, fetchStatsFailure } = statsSlice.actions;

export const fetchStats = (conferenceId) => async (dispatch) => {
  try {
    const stats = await getStats(conferenceId);
    dispatch(fetchStatsSuccess(stats));
  } catch (error) {
    dispatch(fetchStatsFailure(error.message));
  }
};

export default statsSlice.reducer;
