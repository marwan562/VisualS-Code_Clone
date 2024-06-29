import { configureStore } from "@reduxjs/toolkit";
import fileTree from "./reducers/fileTreeSlice";
import leftBarSlice from "./reducers/leftBarSlice";

export const store = configureStore({
  reducer: {
    leftBarSlice,
    fileTree,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
