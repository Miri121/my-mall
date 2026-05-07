/**
 * useAdminDashboard Hook
 *
 * Aggregates platform-wide dashboard statistics for admin overview.
 * Combines data from multiple sources to provide a comprehensive dashboard view.
 */

import { useVendors, useUsers, useStores, useProducts } from '@org/data-access';
import type { Vendor, User, Store } from '@org/types';

/**
 * Admin dashboard return type with aggregated platform statistics
 */
export interface UseAdminDashboardReturn {
  /** Total number of vendors on the platform */
  totalVendors: number;
  /** Total number of users on the platform */
  totalUsers: number;
  /** Total number of stores on the platform */
  totalStores: number;
  /** Total number of products on the platform */
  totalProducts: number;
  /** Last 5 registered vendors */
  recentVendors: Vendor[];
  /** Last 5 registered users */
  recentUsers: User[];
  /** Last 5 created stores */
  recentStores: Store[];
  /** Combined loading state - true if any query is loading */
  isLoading: boolean;
  /** First error encountered from any query, if present */
  error: Error | null;
}

/**
 * Hook for fetching admin dashboard statistics
 *
 * Aggregates data from vendors, users, stores, and products to provide
 * a comprehensive platform overview. Fetches both total counts and recent items.
 *
 * @returns Dashboard statistics with combined loading and error states
 *
 * @example
 * ```tsx
 * function AdminDashboard() {
 *   const {
 *     totalVendors,
 *     totalUsers,
 *     recentVendors,
 *     isLoading,
 *     error
 *   } = useAdminDashboard();
 *
 *   if (isLoading) return <LoadingSpinner />;
 *   if (error) return <ErrorMessage error={error} />;
 *
 *   return (
 *     <div>
 *       <h1>Platform Statistics</h1>
 *       <p>Total Vendors: {totalVendors}</p>
 *       <p>Total Users: {totalUsers}</p>
 *       <VendorList vendors={recentVendors} />
 *     </div>
 *   );
 * }
 * ```
 */
export function useAdminDashboard(): UseAdminDashboardReturn {
  // Fetch all vendors for total count
  const vendorsQuery = useVendors();

  // Fetch last 5 vendors
  const recentVendorsQuery = useVendors({
    page: 1,
    limit: 5,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Fetch all users for total count
  const usersQuery = useUsers();

  // Fetch last 5 users
  const recentUsersQuery = useUsers({
    page: 1,
    limit: 5,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Fetch all stores for total count
  const storesQuery = useStores();

  // Fetch last 5 stores
  const recentStoresQuery = useStores({
    page: 1,
    limit: 5,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Fetch all products for total count
  const productsQuery = useProducts();

  // Combine loading states - loading if any query is loading
  const isLoading =
    vendorsQuery.isLoading ||
    recentVendorsQuery.isLoading ||
    usersQuery.isLoading ||
    recentUsersQuery.isLoading ||
    storesQuery.isLoading ||
    recentStoresQuery.isLoading ||
    productsQuery.isLoading;

  // Collect first error if any query has an error
  const error =
    vendorsQuery.error ||
    recentVendorsQuery.error ||
    usersQuery.error ||
    recentUsersQuery.error ||
    storesQuery.error ||
    recentStoresQuery.error ||
    productsQuery.error ||
    null;

  return {
    // Total counts from full queries
    totalVendors: vendorsQuery.data?.data?.length ?? 0,
    totalUsers: usersQuery.data?.data?.length ?? 0,
    totalStores: storesQuery.data?.data?.length ?? 0,
    totalProducts: productsQuery.data?.data?.length ?? 0,

    // Recent items from limited queries
    recentVendors: recentVendorsQuery.data?.data ?? [],
    recentUsers: recentUsersQuery.data?.data ?? [],
    recentStores: recentStoresQuery.data?.data ?? [],

    // Combined states
    isLoading,
    error: error as Error | null,
  };
}
