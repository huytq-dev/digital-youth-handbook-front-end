import { baseApi } from "@/redux/baseApi";

/**
 * Web Stats API - RTK Query endpoint for tracking website visits
 */
export const webStatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /api/webstats/track - Track a visit
    trackVisit: builder.mutation<void, void>({
      query: () => ({
        url: "webstats/track",
        method: "POST",
      }),
    }),
    // GET /api/webstats/total - Get total visits
    getTotalVisits: builder.query<number, void>({
      query: () => ({
        url: "webstats/total",
        method: "GET",
      }),
    }),
  }),
});

export const { useTrackVisitMutation, useGetTotalVisitsQuery } = webStatsApi;
