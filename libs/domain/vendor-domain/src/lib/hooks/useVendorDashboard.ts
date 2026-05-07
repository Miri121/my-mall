/**
 * Vendor Dashboard Hook
 *
 * Aggregates vendor dashboard data from multiple queries including
 * statistics, stores, and recent products.
 */

import {
  useVendorStats,
  useVendorStores,
  useFilteredProducts,
} from '@org/data-access';
import type { VendorWithStats, Store, Product } from '@org/types';

interface VendorDashboardData {
  statistics: VendorWithStats | undefined;
  stores: Store[] | undefined;
  recentProducts: Product[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook that aggregates vendor dashboard data from multiple sources
 *
 * @param vendorId - The vendor ID to fetch dashboard data for
 * @returns Combined dashboard data with loading and error states
 */
export function useVendorDashboard(vendorId: string): VendorDashboardData {
  // Fetch vendor statistics
  const statsQuery = useVendorStats(vendorId);

  // Fetch vendor stores
  const storesQuery = useVendorStores(vendorId);

  // Fetch recent products (last 5 from vendor's stores)
  const productsQuery = useFilteredProducts({
    vendorId,
  });

  // Combine loading states - dashboard is loading if any query is loading
  const isLoading =
    statsQuery.isLoading || storesQuery.isLoading || productsQuery.isLoading;

  // Get the first error from any of the queries
  const error =
    statsQuery.error || storesQuery.error || productsQuery.error || null;

  return {
    statistics: statsQuery.data,
    stores: storesQuery.data?.data,
    recentProducts: productsQuery.data?.data,
    isLoading,
    error,
  };
}
