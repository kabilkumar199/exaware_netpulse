import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import apiSlice from './apiSlice';
import devicesSlice from './slices/devicesSlice';
import discoverySlice from './slices/discoverySlice';
import uiSlice from './slices/uiSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    devices: devicesSlice,
    discovery: discoverySlice,
    ui: uiSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['ui/setSelectedDevice', 'ui/setSelectedSite'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['devices.devices', 'discovery.scans'],
      },
    }).concat(apiSlice.middleware),
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
