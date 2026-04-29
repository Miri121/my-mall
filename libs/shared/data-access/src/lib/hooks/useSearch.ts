/**
 * Search Hooks
 *
 * TanStack Query hooks for search operations including
 * product search, store search, and search suggestions.
 */

import { useQuery } from '@tanstack/react-query';
import { searchService } from '../services/search.service.js';
import { queryKeys } from '../query-keys.js';
import { QUERY_CONFIG } from '@org/config';
import type { QueryParams } from '@org/types';

/**
 * Hook for searching products
 *
 * @param query - Search query string
 * @param params - Additional query parameters for filtering and pagination
 * @param enabled - Whether the query should run
 */
export function useSearchProducts(
  query: string,
  params?: QueryParams,
  enabled = true
) {
  return useQuery({
    queryKey: queryKeys.search.products(query, params),
    queryFn: () => searchService.searchProducts(query, params),
    staleTime: QUERY_CONFIG.staleTime.search,
    enabled: enabled && Boolean(query.trim()),
  });
}

/**
 * Hook for searching stores
 *
 * @param query - Search query string
 * @param params - Additional query parameters for filtering and pagination
 * @param enabled - Whether the query should run
 */
export function useSearchStores(
  query: string,
  params?: QueryParams,
  enabled = true
) {
  return useQuery({
    queryKey: queryKeys.search.stores(query, params),
    queryFn: () => searchService.searchStores(query, params),
    staleTime: QUERY_CONFIG.staleTime.search,
    enabled: enabled && Boolean(query.trim()),
  });
}

/**
 * Hook for getting search suggestions
 *
 * @param query - Partial search query
 * @param enabled - Whether the query should run
 */
export function useSearchSuggestions(query: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.search.suggestions(query),
    queryFn: () => searchService.getSuggestions(query),
    staleTime: QUERY_CONFIG.staleTime.search,
    enabled: enabled && query.trim().length >= 2,
  });
}
