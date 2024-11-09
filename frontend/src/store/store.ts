import { configureStore } from "@reduxjs/toolkit";
import gdacsSlice from "./slices/gdacsSlice";

export const store = configureStore({
  reducer: {
    gdacs: gdacsSlice,
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Optionally, if you need dispatch type
export type AppDispatch = typeof store.dispatch;

export default store;