import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToast } from './baseQueryWithToast';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithToast,
  tagTypes: ['Auth', 'Common'],
  keepUnusedDataFor: 60,
  endpoints: () => ({}),
});

