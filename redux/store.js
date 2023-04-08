import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import loaderReducer from './slices/loaderSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
