/**
 * TanStack Query Key Factory
 *
 * Centralized query key definitions for all entities.
 * Provides type-safe query key generation for caching and invalidation.
 *
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
 */

import type { QueryParams, ProductFilters } from '@org/types';

/**
 * Query key factory
 *
 * Hierarchical query keys for proper cache invalidation.
 * Each entity has keys for lists, details, and related data.
 */
export const queryKeys = {
  /**
   * Authentication query keys
   */
  auth: {
    /** Base key for all auth queries */
    all: ['auth'] as const,
    /** Current user query key */
    me: ['auth', 'me'] as const,
  },

  /**
   * Vendor query keys
   */
  vendors: {
    /** Base key for all vendor queries */
    all: ['vendors'] as const,
    /** List queries */
    lists: () => [...queryKeys.vendors.all, 'list'] as const,
    /** Specific list query with params */
    list: (params?: QueryParams) =>
      [...queryKeys.vendors.lists(), params] as const,
    /** Detail queries */
    details: () => [...queryKeys.vendors.all, 'detail'] as const,
    /** Specific vendor detail */
    detail: (id: string) => [...queryKeys.vendors.details(), id] as const,
    /** Vendor stores */
    stores: (id: string, params?: QueryParams) =>
      [...queryKeys.vendors.detail(id), 'stores', params] as const,
    /** Vendor statistics */
    stats: (id: string) => [...queryKeys.vendors.detail(id), 'stats'] as const,
  },

  /**
   * Store query keys
   */
  stores: {
    /** Base key for all store queries */
    all: ['stores'] as const,
    /** List queries */
    lists: () => [...queryKeys.stores.all, 'list'] as const,
    /** Specific list query with params */
    list: (params?: QueryParams) =>
      [...queryKeys.stores.lists(), params] as const,
    /** Detail queries */
    details: () => [...queryKeys.stores.all, 'detail'] as const,
    /** Specific store detail */
    detail: (id: string) => [...queryKeys.stores.details(), id] as const,
    /** Store by slug */
    bySlug: (slug: string) => [...queryKeys.stores.all, 'slug', slug] as const,
    /** Store products */
    products: (id: string, params?: QueryParams) =>
      [...queryKeys.stores.detail(id), 'products', params] as const,
    /** Store with statistics */
    withStats: (id: string) =>
      [...queryKeys.stores.detail(id), 'stats'] as const,
  },

  /**
   * Product query keys
   */
  products: {
    /** Base key for all product queries */
    all: ['products'] as const,
    /** List queries */
    lists: () => [...queryKeys.products.all, 'list'] as const,
    /** Specific list query with params */
    list: (params?: QueryParams) =>
      [...queryKeys.products.lists(), params] as const,
    /** Filtered product queries */
    filtered: (filters: ProductFilters) =>
      [...queryKeys.products.lists(), 'filtered', filters] as const,
    /** Detail queries */
    details: () => [...queryKeys.products.all, 'detail'] as const,
    /** Specific product detail */
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
  },

  /**
   * User query keys
   */
  users: {
    /** Base key for all user queries */
    all: ['users'] as const,
    /** List queries */
    lists: () => [...queryKeys.users.all, 'list'] as const,
    /** Specific list query with params */
    list: (params?: QueryParams) =>
      [...queryKeys.users.lists(), params] as const,
    /** Detail queries */
    details: () => [...queryKeys.users.all, 'detail'] as const,
    /** Specific user detail */
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    /** Current user profile */
    me: ['users', 'me'] as const,
  },

  /**
   * Category query keys
   */
  categories: {
    /** Base key for all category queries */
    all: ['categories'] as const,
    /** List queries */
    lists: () => [...queryKeys.categories.all, 'list'] as const,
    /** Basic category list */
    list: () => [...queryKeys.categories.lists()] as const,
    /** Categories with children */
    withChildren: () =>
      [...queryKeys.categories.lists(), 'with-children'] as const,
    /** Categories with product counts */
    withCounts: () => [...queryKeys.categories.lists(), 'with-counts'] as const,
    /** Detail queries */
    details: () => [...queryKeys.categories.all, 'detail'] as const,
    /** Specific category detail */
    detail: (id: string) => [...queryKeys.categories.details(), id] as const,
  },

  /**
   * Search query keys
   */
  search: {
    /** Base key for all search queries */
    all: ['search'] as const,
    /** Product search queries */
    products: (query: string, params?: QueryParams) =>
      [...queryKeys.search.all, 'products', query, params] as const,
    /** Store search queries */
    stores: (query: string, params?: QueryParams) =>
      [...queryKeys.search.all, 'stores', query, params] as const,
    /** Search suggestions */
    suggestions: (query: string) =>
      [...queryKeys.search.all, 'suggestions', query] as const,
  },
};
