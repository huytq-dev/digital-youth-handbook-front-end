import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToast } from './baseQueryWithToast';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithToast,
  tagTypes: ['Auth', 'Common', 'Quiz', 'Quizzes'],
  keepUnusedDataFor: 60,
  endpoints: () => ({}),
});

