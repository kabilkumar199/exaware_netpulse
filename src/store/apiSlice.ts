import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axiosInstance from '../services/api';

// Custom base query using axios
const axiosBaseQuery = ({ baseUrl }: { baseUrl: string }) =>
  async ({ url, method = 'GET', data, params, headers }: any) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError: any) {
      const error = {
        status: axiosError.response?.status,
        data: axiosError.response?.data || axiosError.message,
      };
      return { error };
    }
  };

// Create API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  }),
  tagTypes: [
    'Device',
    'Site',
    'Region',
    'Location',
    'DiscoveryScan',
    'Topology',
    'User',
    'Alert',
    'Backup',
    'Firmware',
    'Manufacturer',
    'Rack',
    'DeviceRole',
  ],
  endpoints: () => ({}),
});

export default apiSlice;
