import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../view/login/slice/login.slice';
import allUsersSlice from '../view/client/slice/all-clients.slice';

const store = configureStore({
  reducer: {
    authorization: authSlice,
    allUsers: allUsersSlice
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;