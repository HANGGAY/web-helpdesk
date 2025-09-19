import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from './ticketSlice';

export const store = configureStore({
  reducer: {
    tickets: ticketReducer,
  },
});
