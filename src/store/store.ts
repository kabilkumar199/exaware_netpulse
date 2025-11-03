import { configureStore } from "@reduxjs/toolkit";
import devicesReducer from "./slices/devicesSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
