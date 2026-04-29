/**
 * Category Hooks
 *
 * TanStack Query hooks for category operations including CRUD
 * and hierarchical category management.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services/category.service.js';
import { queryKeys } from '../query-keys.js';
import { QUERY_CONFIG } from '@org/config';
import type {
  Category,
  CategoryCreateInput,
  CategoryUpdateInput,
} from '@org/types';

/**
 * Hook for fetching all categories
 *
 * Returns flat list of categories.
 */
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: categoryService.list,
    staleTime: QUERY_CONFIG.staleTime.categories,
  });
}

/**
 * Hook for fetching category tree with children
 *
 * Returns hierarchical structure with nested children.
 */
export function useCategoriesWithChildren() {
  return useQuery({
    queryKey: queryKeys.categories.withChildren(),
    queryFn: categoryService.listWithChildren,
    staleTime: QUERY_CONFIG.staleTime.categories,
  });
}

/**
 * Hook for fetching categories with product counts
 *
 * Returns categories with number of products in each.
 */
export function useCategoriesWithCounts() {
  return useQuery({
    queryKey: queryKeys.categories.withCounts(),
    queryFn: categoryService.listWithCounts,
    staleTime: QUERY_CONFIG.staleTime.categories,
  });
}

/**
 * Hook for fetching category by ID
 *
 * @param id - Category ID
 */
export function useCategory(id: string) {
  return useQuery({
    queryKey: queryKeys.categories.detail(id),
    queryFn: () => categoryService.getById(id),
    staleTime: QUERY_CONFIG.staleTime.categories,
    enabled: Boolean(id),
  });
}

/**
 * Hook for creating category
 *
 * Invalidates all category caches on success.
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryCreateInput) => categoryService.create(data),
    onSuccess: () => {
      // Invalidate all category queries to refetch tree structure
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}

/**
 * Hook for updating category
 *
 * Invalidates all category caches on success due to potential parent changes.
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryUpdateInput }) =>
      categoryService.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.categories.detail(id),
      });

      // Snapshot previous value
      const previousCategory = queryClient.getQueryData<Category>(
        queryKeys.categories.detail(id)
      );

      // Optimistically update cache
      if (previousCategory) {
        queryClient.setQueryData<Category>(queryKeys.categories.detail(id), {
          ...previousCategory,
          ...data,
        });
      }

      return { previousCategory };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousCategory) {
        queryClient.setQueryData(
          queryKeys.categories.detail(id),
          context.previousCategory
        );
      }
    },
    onSettled: () => {
      // Invalidate all category queries to refetch tree structure
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}

/**
 * Hook for deleting category
 *
 * Invalidates all category caches on success.
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryService.delete(id),
    onSuccess: (data, id) => {
      // Remove category from cache
      queryClient.removeQueries({ queryKey: queryKeys.categories.detail(id) });
      // Invalidate all category queries to refetch tree structure
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}
