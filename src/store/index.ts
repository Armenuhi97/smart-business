import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../view/login/slice/login.slice';
import allUsersSlice from '../view/client/slice/all-clients.slice';
import allAccountantSlice from '../view/accountant/slice/all-accountant.slice';
import allBrokerSlice from '../view/broker/slice/all-broker.slice';
import allLawyerSlice from '../view/lawyer/slice/all-lawyer.slice';

const store = configureStore({
  reducer: {
    authorization: authSlice,
    allUsers: allUsersSlice,
    allAccountant: allAccountantSlice,
    allBrokers: allBrokerSlice,
    allLawyers:allLawyerSlice
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;