import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Device, Filters } from '../../types';

interface DevicesState {
  devices: Device[];
  selectedDevice: Device | null;
  filters: Filters;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: DevicesState = {
  devices: [],
  selectedDevice: null,
  filters: {},
  isLoading: false,
  error: null,
  totalCount: 0,
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setDevices: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
      state.totalCount = action.payload.length;
    },
    addDevice: (state, action: PayloadAction<Device>) => {
      state.devices.push(action.payload);
      state.totalCount += 1;
    },
    updateDevice: (state, action: PayloadAction<Device>) => {
      const index = state.devices.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = action.payload;
      }
    },
    removeDevice: (state, action: PayloadAction<string>) => {
      state.devices = state.devices.filter((d) => d.id !== action.payload);
      state.totalCount -= 1;
    },
    setSelectedDevice: (state, action: PayloadAction<Device | null>) => {
      state.selectedDevice = action.payload;
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setDevices,
  addDevice,
  updateDevice,
  removeDevice,
  setSelectedDevice,
  setFilters,
  setLoading,
  setError,
  clearError,
} = devicesSlice.actions;

export default devicesSlice.reducer;
