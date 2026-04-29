/**
 * Store Hooks
 *
 * TanStack Query hooks for store operations including CRUD,
 * product management, and image uploads with optimistic updates.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { storeService } from '../services/store.service.js';
import { queryKeys } from '../query-keys.js';
import { QUERY_CONFIG } from '@org/config';
import type {
  Store,
  StoreCreateInput,
  StoreUpdateInput,
  QueryParams,
} from '@org/types';

/**
 * Hook for fetching store list
 *
 * @param params - Query parameters for filtering and pagination
 */
export function useStores(params?: QueryParams) {
  return useQuery({
    queryKey: queryKeys.stores.list(params),
    queryFn: () => storeService.list(params),
    staleTime: QUERY_CONFIG.staleTime.stores,
  });
}

/**
 * Hook for fetching store by ID
 *
 * @param id - Store ID
 */
export function useStore(id: string) {
  return useQuery({
    queryKey: queryKeys.stores.detail(id),
    queryFn: () => storeService.getById(id),
    staleTime: QUERY_CONFIG.staleTime.stores,
    enabled: Boolean(id),
  });
}

/**
 * Hook for fetching store by slug
 *
 * @param slug - Store URL slug
 */
export function useStoreBySlug(slug: string) {
  return useQuery({
    queryKey: queryKeys.stores.bySlug(slug),
    queryFn: () => storeService.getBySlug(slug),
    staleTime: QUERY_CONFIG.staleTime.stores,
    enabled: Boolean(slug),
  });
}

/**
 * Hook for fetching store with statistics
 *
 * @param id - Store ID
 */
export function useStoreWithStats(id: string) {
  return useQuery({
    queryKey: queryKeys.stores.withStats(id),
    queryFn: () => storeService.getWithStats(id),
    staleTime: QUERY_CONFIG.staleTime.stores,
    enabled: Boolean(id),
  });
}

/**
 * Hook for fetching store products
 *
 * @param id - Store ID
 * @param params - Query parameters for filtering and pagination
 */
export function useStoreProducts(id: string, params?: QueryParams) {
  return useQuery({
    queryKey: queryKeys.stores.products(id, params),
    queryFn: () => storeService.getProducts(id, params),
    staleTime: QUERY_CONFIG.staleTime.products,
    enabled: Boolean(id),
  });
}

/**
 * Hook for creating store
 *
 * Invalidates store list cache on success.
 */
export function useCreateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: StoreCreateInput) => storeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stores.lists() });
    },
  });
}

/**
 * Hook for updating store
 *
 * Uses optimistic updates for immediate UI feedback.
 */
export function useUpdateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: StoreUpdateInput }) =>
      storeService.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.stores.detail(id),
      });

      // Snapshot previous value
      const previousStore = queryClient.getQueryData<Store>(
        queryKeys.stores.detail(id)
      );

      // Optimistically update cache
      if (previousStore) {
        queryClient.setQueryData<Store>(queryKeys.stores.detail(id), {
          ...previousStore,
          ...data,
        });
      }

      return { previousStore };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousStore) {
        queryClient.setQueryData(
          queryKeys.stores.detail(id),
          context.previousStore
        );
      }
    },
    onSettled: (data, error, { id }) => {
      // Refetch after mutation settles
      queryClient.invalidateQueries({ queryKey: queryKeys.stores.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.stores.lists() });
    },
  });
}

/**
 * Hook for deleting store
 *
 * Invalidates store list cache on success.
 */
export function useDeleteStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => storeService.delete(id),
    onSuccess: (data, id) => {
      // Remove store from cache
      queryClient.removeQueries({ queryKey: queryKeys.stores.detail(id) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: queryKeys.stores.lists() });
    },
  });
}

/**
 * Hook for uploading store logo
 *
 * Updates store cache with new logo URL on success.
 */
export function useUploadStoreLogo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      storeService.uploadLogo(id, file),
    onSuccess: (updatedStore, { id }) => {
      // Update store cache
      queryClient.setQueryData(queryKeys.stores.detail(id), updatedStore);
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: queryKeys.stores.lists() });
    },
  });
}

/**
 * Hook for uploading store cover image
 *
 * Updates store cache with new cover URL on success.
 */
export function useUploadStoreCover() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      storeService.uploadCover(id, file),
    onSuccess: (updatedStore, { id }) => {
      // Update store cache
      queryClient.setQueryData(queryKeys.stores.detail(id), updatedStore);
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: queryKeys.stores.lists() });
    },
  });
}
