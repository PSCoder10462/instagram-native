import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

// actions
export const { signIn, signOut } = userSlice.actions;

// selectors
export const userSelector = (state) => state.user.user;

// reducer
export default userSlice.reducer;
