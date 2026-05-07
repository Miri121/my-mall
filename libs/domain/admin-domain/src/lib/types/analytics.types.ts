/**
 * Analytics Types
 *
 * Type definitions for admin analytics and platform statistics.
 */

/**
 * Growth metric with comparison data
 */
export interface GrowthMetric {
  /** Current period count */
  current: number;
  /** Previous period count (optional) */
  previous?: number;
  /** Percentage change from previous period (optional) */
  percentage?: number;
}

/**
 * Store with product count for top stores ranking
 */
export interface TopStore {
  /** Store unique identifier */
  storeId: string;
  /** Store name */
  storeName: string;
  /** Total number of products in the store */
  productCount: number;
}

/**
 * Platform-wide statistics aggregated across all entities
 */
export interface PlatformStatistics {
  /** Total number of vendors */
  totalVendors: number;
  /** Total number of users */
  totalUsers: number;
  /** Total number of stores */
  totalStores: number;
  /** Total number of products */
  totalProducts: number;
}
