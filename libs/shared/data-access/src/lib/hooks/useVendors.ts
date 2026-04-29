/**
 * Vendor Hooks
 *
 * TanStack Query hooks for vendor operations including CRUD,
 * statistics, and store management with optimistic updates.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { vendorService } from '../services/vendor.service.js';
import { queryKeys } from '../query-keys.js';
import { QUERY_CONFIG } from '@org/config';
import type {
  Vendor,
  VendorCreateInput,
  VendorUpdateInput,
  QueryParams,
} from '@org/types';

/**
 * Hook for fetching vendor list
 *
 * @param params - Query parameters for filtering and pagination
 */
export function useVendors(params?: QueryParams) {
  return useQuery({
    queryKey: queryKeys.vendors.list(params),
    queryFn: () => vendorService.list(params),
    staleTime: QUERY_CONFIG.staleTime.vendors,
  });
}

/**
 * Hook for fetching vendor by ID
 *
 * @param id - Vendor ID
 */
export function useVendor(id: string) {
  return useQuery({
    queryKey: queryKeys.vendors.detail(id),
    queryFn: () => vendorService.getById(id),
    staleTime: QUERY_CONFIG.staleTime.vendors,
    enabled: Boolean(id),
  });
}

/**
 * Hook for fetching vendor statistics
 *
 * @param id - Vendor ID
 */
export function useVendorStats(id: string) {
  return useQuery({
    queryKey: queryKeys.vendors.stats(id),
    queryFn: () => vendorService.getStats(id),
    staleTime: QUERY_CONFIG.staleTime.vendors,
    enabled: Boolean(id),
  });
}

/**
 * Hook for fetching vendor stores
 *
 * @param id - Vendor ID
 * @param params - Query parameters for filtering and pagination
 */
export function useVendorStores(id: string, params?: QueryParams) {
  return useQuery({
    queryKey: queryKeys.vendors.stores(id, params),
    queryFn: () => vendorService.getStores(id, params),
    staleTime: QUERY_CONFIG.staleTime.stores,
    enabled: Boolean(id),
  });
}

/**
 * Hook for creating vendor
 *
 * Invalidates vendor list cache on success.
 */
export function useCreateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VendorCreateInput) => vendorService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vendors.lists() });
    },
  });
}

/**
 * Hook for updating vendor
 *
 * Uses optimistic updates for immediate UI feedback.
 */
export function useUpdateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: VendorUpdateInput }) =>
      vendorService.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.vendors.detail(id),
      });

      // Snapshot previous value
      const previousVendor = queryClient.getQueryData<Vendor>(
        queryKeys.vendors.detail(id)
      );

      // Optimistically update cache
      if (previousVendor) {
        queryClient.setQueryData<Vendor>(queryKeys.vendors.detail(id), {
          ...previousVendor,
          ...data,
        });
      }

      return { previousVendor };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousVendor) {
        queryClient.setQueryData(
          queryKeys.vendors.detail(id),
          context.previousVendor
        );
      }
    },
    onSettled: (data, error, { id }) => {
      // Refetch after mutation settles
      queryClient.invalidateQueries({ queryKey: queryKeys.vendors.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.vendors.lists() });
    },
  });
}

/**
 * Hook for deleting vendor
 *
 * Invalidates vendor list cache on success.
 */
export function useDeleteVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => vendorService.delete(id),
    onSuccess: (data, id) => {
      // Remove vendor from cache
      queryClient.removeQueries({ queryKey: queryKeys.vendors.detail(id) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: queryKeys.vendors.lists() });
    },
  });
}
