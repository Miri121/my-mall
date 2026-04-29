/**
 * Search Service
 *
 * Handles all search-related API calls including product search,
 * store search, and search suggestions.
 */

import { httpClient } from '../http-client.js';
import { API_ENDPOINTS } from '@org/config';
import type {
  Product,
  Store,
  PaginatedResponse,
  QueryParams,
} from '@org/types';

/**
 * Search suggestion result
 */
export interface SearchSuggestion {
  /** Suggestion text */
  text: string;
  /** Suggestion type */
  type: 'product' | 'store' | 'category';
  /** Number of results for this suggestion */
  count: number;
}

/**
 * Search service object containing all search-related API methods
 */
export const searchService = {
  /**
   * Search products
   *
   * @param query - Search query string
   * @param params - Additional query parameters for filtering and pagination
   * @returns Paginated product search results
   */
  async searchProducts(
    query: string,
    params?: QueryParams
  ): Promise<PaginatedResponse<Product>> {
    const response = await httpClient.get<PaginatedResponse<Product>>(
      API_ENDPOINTS.search.products,
      {
        params: {
          q: query,
          ...params,
        },
      }
    );
    return response.data;
  },

  /**
   * Search stores
   *
   * @param query - Search query string
   * @param params - Additional query parameters for filtering and pagination
   * @returns Paginated store search results
   */
  async searchStores(
    query: string,
    params?: QueryParams
  ): Promise<PaginatedResponse<Store>> {
    const response = await httpClient.get<PaginatedResponse<Store>>(
      API_ENDPOINTS.search.stores,
      {
        params: {
          q: query,
          ...params,
        },
      }
    );
    return response.data;
  },

  /**
   * Get search suggestions
   *
   * @param query - Partial search query
   * @returns Array of search suggestions
   */
  async getSuggestions(query: string): Promise<SearchSuggestion[]> {
    const response = await httpClient.get<{ data: SearchSuggestion[] }>(
      API_ENDPOINTS.search.suggestions,
      {
        params: { q: query },
      }
    );
    return response.data.data;
  },
};
