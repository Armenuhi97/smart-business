import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../view/login/slice/login.slice';

const store = configureStore({
  reducer: {
    authorization: authSlice
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;