/**
 * TanStack Query Client Configuration
 *
 * Centralized QueryClient instance with default options for all queries.
 * Configures caching, refetching, and retry behavior.
 */

import { QueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG } from '@org/config';

/**
 * QueryClient instance
 *
 * Pre-configured with default options for queries and mutations.
 * Use this instance throughout the application for consistent behavior.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.staleTime.default,
      gcTime: QUERY_CONFIG.cacheTime,
      refetchOnWindowFocus: QUERY_CONFIG.refetchOnWindowFocus,
      retry: QUERY_CONFIG.retry,
    },
    mutations: {
      retry: QUERY_CONFIG.retry,
    },
  },
});
