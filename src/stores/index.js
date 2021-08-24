import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice';
import authSlice from './authSlice';
import contractSlice from './contractSlice';
import commonSlice from './commonSlice';

export const store = configureStore({
  reducer: {
    counterSlice: counterSlice,
    authSlice: authSlice,
    contractSlice: contractSlice,
    commonSlice: commonSlice
  }
})

export default store