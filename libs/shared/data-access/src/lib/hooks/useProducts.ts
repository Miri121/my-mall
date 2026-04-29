/**
 * Product Hooks
 *
 * TanStack Query hooks for product operations including CRUD,
 * filtering, and image management with optimistic updates.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/product.service.js';
import { queryKeys } from '../query-keys.js';
import { QUERY_CONFIG } from '@org/config';
import type {
  Product,
  ProductCreateInput,
  ProductUpdateInput,
  ProductFilters,
  QueryParams,
} from '@org/types';

/**
 * Hook for fetching product list
 *
 * @param params - Query parameters for filtering and pagination
 */
export function useProducts(params?: QueryParams) {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => productService.list(params),
    staleTime: QUERY_CONFIG.staleTime.products,
  });
}

/**
 * Hook for fetching filtered products
 *
 * @param filters - Product filter criteria
 */
export function useFilteredProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: queryKeys.products.filtered(filters),
    queryFn: () => productService.filter(filters),
    staleTime: QUERY_CONFIG.staleTime.products,
  });
}

/**
 * Hook for fetching product by ID
 *
 * @param id - Product ID
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productService.getById(id),
    staleTime: QUERY_CONFIG.staleTime.products,
    enabled: Boolean(id),
  });
}

/**
 * Hook for creating product
 *
 * Invalidates product list cache on success.
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductCreateInput) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
}

/**
 * Hook for updating product
 *
 * Uses optimistic updates for immediate UI feedback.
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductUpdateInput }) =>
      productService.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.products.detail(id),
      });

      // Snapshot previous value
      const previousProduct = queryClient.getQueryData<Product>(
        queryKeys.products.detail(id)
      );

      // Optimistically update cache
      if (previousProduct) {
        queryClient.setQueryData<Product>(queryKeys.products.detail(id), {
          ...previousProduct,
          ...data,
        });
      }

      return { previousProduct };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousProduct) {
        queryClient.setQueryData(
          queryKeys.products.detail(id),
          context.previousProduct
        );
      }
    },
    onSettled: (data, error, { id }) => {
      // Refetch after mutation settles
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.detail(id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
}

/**
 * Hook for deleting product
 *
 * Invalidates product list cache on success.
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: (data, id) => {
      // Remove product from cache
      queryClient.removeQueries({ queryKey: queryKeys.products.detail(id) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
}

/**
 * Hook for uploading product images
 *
 * Updates product cache with new images on success.
 */
export function useUploadProductImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, files }: { id: string; files: File[] }) =>
      productService.uploadImages(id, files),
    onSuccess: (updatedProduct, { id }) => {
      // Update product cache
      queryClient.setQueryData(queryKeys.products.detail(id), updatedProduct);
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
}

/**
 * Hook for deleting product image
 *
 * Updates product cache without deleted image on success.
 */
export function useDeleteProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, imageId }: { id: string; imageId: string }) =>
      productService.deleteImage(id, imageId),
    onSuccess: (updatedProduct, { id }) => {
      // Update product cache
      queryClient.setQueryData(queryKeys.products.detail(id), updatedProduct);
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
}
