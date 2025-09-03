import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from './vehiclesSlice';
import filtersReducer from './filtersSlice';

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    filters: filtersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
