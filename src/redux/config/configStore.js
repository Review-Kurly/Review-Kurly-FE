import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authSlice';
import searchSlice from '../getSearchSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    searchSlice,
  },
});

export default store;
