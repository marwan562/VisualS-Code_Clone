import { configureStore } from "@reduxjs/toolkit";
import fileTree from "./reducers/fileTreeSlice";

export const store = configureStore({
  reducer: {
    fileTree,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
