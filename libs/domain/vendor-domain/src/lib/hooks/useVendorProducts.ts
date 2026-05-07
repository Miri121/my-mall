/**
 * Vendor Products Hook
 *
 * Hook for fetching vendor's products with optional filters for store,
 * category, and search.
 */

import { useFilteredProducts } from '@org/data-access';
import type { ProductFilters } from '@org/types';

interface VendorProductFilters {
  storeId?: string;
  categoryId?: string;
  search?: string;
}

/**
 * Hook for fetching vendor's products with filters
 *
 * Leverages the existing useFilteredProducts hook from @org/data-access and adds
 * vendor-specific filtering capabilities.
 *
 * @param vendorId - The vendor ID to filter products by
 * @param filters - Optional filters for storeId, categoryId, and search
 * @returns Query result with filtered products, same as useFilteredProducts
 */
export function useVendorProducts(
  vendorId: string,
  filters?: VendorProductFilters
) {
  // Build product filters combining vendorId with optional filters
  const productFilters: ProductFilters = {
    vendorId,
    ...(filters?.storeId && { storeId: filters.storeId }),
    ...(filters?.categoryId && { categoryId: filters.categoryId }),
    ...(filters?.search && { search: filters.search }),
  };

  // Use the existing useFilteredProducts hook with vendor-specific filters
  return useFilteredProducts(productFilters);
}
