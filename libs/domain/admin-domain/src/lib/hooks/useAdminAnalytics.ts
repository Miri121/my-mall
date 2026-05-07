/**
 * useAdminAnalytics Hook
 *
 * Provides analytics and statistics calculations for admin insights.
 * Aggregates growth metrics and top performers across platform entities.
 */

import { useMemo } from 'react';
import { useVendors, useUsers, useStores, useProducts } from '@org/data-access';
import type { GrowthMetric, TopStore } from '../types/analytics.types.js';

/**
 * Admin analytics return type with calculated metrics
 */
export interface UseAdminAnalyticsReturn {
  /** Vendor growth trend metrics */
  vendorGrowth: GrowthMetric;
  /** User growth trend metrics */
  userGrowth: GrowthMetric;
  /** Store growth trend metrics */
  storeGrowth: GrowthMetric;
  /** Product growth trend metrics */
  productGrowth: GrowthMetric;
  /** Top stores ranked by product count */
  topStores: TopStore[];
  /** Combined loading state - true if any query is loading */
  isLoading: boolean;
  /** First error encountered from any query, if present */
  error: Error | null;
}

/**
 * Hook for fetching and calculating admin analytics
 *
 * Aggregates platform statistics and calculates growth metrics for vendors,
 * users, stores, and products. Also determines top stores by product count.
 * Uses memoization to prevent unnecessary recalculations.
 *
 * @returns Analytics data with growth metrics and top performers
 *
 * @example
 * ```tsx
 * function AdminAnalytics() {
 *   const {
 *     vendorGrowth,
 *     userGrowth,
 *     topStores,
 *     isLoading,
 *     error
 *   } = useAdminAnalytics();
 *
 *   if (isLoading) return <LoadingSpinner />;
 *   if (error) return <ErrorMessage error={error} />;
 *
 *   return (
 *     <div>
 *       <h2>Platform Growth</h2>
 *       <p>Vendors: {vendorGrowth.current}</p>
 *       <p>Growth: {vendorGrowth.percentage}%</p>
 *       <TopStoresList stores={topStores} />
 *     </div>
 *   );
 * }
 * ```
 */
export function useAdminAnalytics(): UseAdminAnalyticsReturn {
  // Fetch all data
  const vendorsQuery = useVendors();
  const usersQuery = useUsers();
  const storesQuery = useStores();
  const productsQuery = useProducts();

  // Combine loading states
  const isLoading =
    vendorsQuery.isLoading ||
    usersQuery.isLoading ||
    storesQuery.isLoading ||
    productsQuery.isLoading;

  // Collect first error if any
  const error =
    vendorsQuery.error ||
    usersQuery.error ||
    storesQuery.error ||
    productsQuery.error ||
    null;

  // Calculate vendor growth metrics
  const vendorGrowth = useMemo<GrowthMetric>(() => {
    const vendors = vendorsQuery.data?.data ?? [];
    const current = vendors.length;

    // For growth calculation, we'd typically compare with historical data
    // Here we provide current count; previous/percentage can be calculated
    // when historical data is available
    return {
      current,
      previous: undefined,
      percentage: undefined,
    };
  }, [vendorsQuery.data]);

  // Calculate user growth metrics
  const userGrowth = useMemo<GrowthMetric>(() => {
    const users = usersQuery.data?.data ?? [];
    const current = users.length;

    return {
      current,
      previous: undefined,
      percentage: undefined,
    };
  }, [usersQuery.data]);

  // Calculate store growth metrics
  const storeGrowth = useMemo<GrowthMetric>(() => {
    const stores = storesQuery.data?.data ?? [];
    const current = stores.length;

    return {
      current,
      previous: undefined,
      percentage: undefined,
    };
  }, [storesQuery.data]);

  // Calculate product growth metrics
  const productGrowth = useMemo<GrowthMetric>(() => {
    const products = productsQuery.data?.data ?? [];
    const current = products.length;

    return {
      current,
      previous: undefined,
      percentage: undefined,
    };
  }, [productsQuery.data]);

  // Calculate top stores by product count
  const topStores = useMemo<TopStore[]>(() => {
    const stores = storesQuery.data?.data ?? [];
    const products = productsQuery.data?.data ?? [];

    // Count products per store
    const storeProductCounts = new Map<string, number>();

    products.forEach((product) => {
      const storeId = product.storeId;
      if (storeId) {
        storeProductCounts.set(
          storeId,
          (storeProductCounts.get(storeId) ?? 0) + 1
        );
      }
    });

    // Create top stores array with product counts
    const topStoresData = stores
      .map((store) => ({
        storeId: store.id,
        storeName: store.name,
        productCount: storeProductCounts.get(store.id) ?? 0,
      }))
      .sort((a, b) => b.productCount - a.productCount)
      .slice(0, 10); // Top 10 stores

    return topStoresData;
  }, [storesQuery.data, productsQuery.data]);

  return {
    vendorGrowth,
    userGrowth,
    storeGrowth,
    productGrowth,
    topStores,
    isLoading,
    error: error as Error | null,
  };
}
