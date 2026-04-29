/**
 * User Hooks
 *
 * TanStack Query hooks for user operations including CRUD,
 * profile management, and avatar uploads with optimistic updates.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/user.service.js';
import { queryKeys } from '../query-keys.js';
import { QUERY_CONFIG } from '@org/config';
import type {
  User,
  UserCreateInput,
  UserUpdateInput,
  ProfileUpdateFormData,
  QueryParams,
} from '@org/types';

/**
 * Hook for fetching user list
 *
 * @param params - Query parameters for filtering and pagination
 */
export function useUsers(params?: QueryParams) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => userService.list(params),
    staleTime: QUERY_CONFIG.staleTime.users,
  });
}

/**
 * Hook for fetching user by ID
 *
 * @param id - User ID
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => userService.getById(id),
    staleTime: QUERY_CONFIG.staleTime.users,
    enabled: Boolean(id),
  });
}

/**
 * Hook for fetching current user profile
 *
 * Similar to useCurrentUser from useAuth but uses users query key.
 */
export function useUserProfile() {
  const hasToken = Boolean(localStorage.getItem('authToken'));

  return useQuery({
    queryKey: queryKeys.users.me,
    queryFn: userService.getMe,
    staleTime: QUERY_CONFIG.staleTime.users,
    enabled: hasToken,
  });
}

/**
 * Hook for creating user (Admin only)
 *
 * Invalidates user list cache on success.
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserCreateInput) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });
}

/**
 * Hook for updating user (Admin only)
 *
 * Uses optimistic updates for immediate UI feedback.
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserUpdateInput }) =>
      userService.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.users.detail(id) });

      // Snapshot previous value
      const previousUser = queryClient.getQueryData<User>(
        queryKeys.users.detail(id)
      );

      // Optimistically update cache
      if (previousUser) {
        queryClient.setQueryData<User>(queryKeys.users.detail(id), {
          ...previousUser,
          ...data,
        });
      }

      return { previousUser };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousUser) {
        queryClient.setQueryData(
          queryKeys.users.detail(id),
          context.previousUser
        );
      }
    },
    onSettled: (data, error, { id }) => {
      // Refetch after mutation settles
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });
}

/**
 * Hook for updating current user profile
 *
 * Updates current user cache on success.
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileUpdateFormData) => userService.updateMe(data),
    onSuccess: (updatedUser) => {
      // Update current user cache
      queryClient.setQueryData(queryKeys.users.me, updatedUser);
      queryClient.setQueryData(queryKeys.auth.me, updatedUser);
    },
  });
}

/**
 * Hook for deleting user (Admin only)
 *
 * Invalidates user list cache on success.
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: (data, id) => {
      // Remove user from cache
      queryClient.removeQueries({ queryKey: queryKeys.users.detail(id) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });
}

/**
 * Hook for deleting current user account
 *
 * Clears all caches and auth token on success.
 */
export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteMe,
    onSuccess: () => {
      // Clear auth token
      localStorage.removeItem('authToken');
      // Clear all cached data
      queryClient.clear();
    },
  });
}

/**
 * Hook for uploading user avatar
 *
 * Updates current user cache with new avatar URL on success.
 */
export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => userService.uploadAvatar(file),
    onSuccess: (updatedUser) => {
      // Update current user cache
      queryClient.setQueryData(queryKeys.users.me, updatedUser);
      queryClient.setQueryData(queryKeys.auth.me, updatedUser);
    },
  });
}
