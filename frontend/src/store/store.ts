import { configureStore } from "@reduxjs/toolkit";
import gdacsSlice from "./slices/gdacsSlice";
import userSlice from "./slices/userSlice";
import newsSlice from "./slices/newsSlice";
export const store = configureStore({
  reducer: {
    gdacs: gdacsSlice,
    user: userSlice,
    news: newsSlice,
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Optionally, if you need dispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
