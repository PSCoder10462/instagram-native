import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
  },
});

// actions
export const { startLoading, endLoading } = loaderSlice.actions;

// selectors
export const isLoadingSelector = (state) => state.loader.isLoading;

// reducer
export default loaderSlice.reducer;
