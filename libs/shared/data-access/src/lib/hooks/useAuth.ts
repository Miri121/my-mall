/**
 * Authentication Hooks
 *
 * TanStack Query hooks for authentication operations including
 * login, registration, logout, and password management.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth.service.js';
import { queryKeys } from '../query-keys.js';

/**
 * Hook for user login
 *
 * Stores auth token and caches user data on successful login.
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      // Store auth token
      localStorage.setItem('authToken', response.data.token);
      // Cache user data
      queryClient.setQueryData(queryKeys.auth.me, response.data.user);
    },
  });
}

/**
 * Hook for Google OAuth login
 *
 * Stores auth token and caches user data on successful login.
 */
export function useLoginWithGoogle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.loginWithGoogle,
    onSuccess: (response) => {
      localStorage.setItem('authToken', response.data.token);
      queryClient.setQueryData(queryKeys.auth.me, response.data.user);
    },
  });
}

/**
 * Hook for user registration
 *
 * Stores auth token and caches user data on successful registration.
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      localStorage.setItem('authToken', response.data.token);
      queryClient.setQueryData(queryKeys.auth.me, response.data.user);
    },
  });
}

/**
 * Hook for user logout
 *
 * Clears auth token and user cache on successful logout.
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear auth token
      localStorage.removeItem('authToken');
      // Clear all cached data
      queryClient.clear();
    },
  });
}

/**
 * Hook for password reset request
 *
 * Sends password reset email to user.
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: (email: string) => authService.resetPassword(email),
  });
}

/**
 * Hook for updating password with reset token
 *
 * Updates password using reset token from email.
 */
export function useUpdatePassword() {
  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authService.updatePassword(token, password),
  });
}

/**
 * Hook for fetching current user
 *
 * Retrieves current authenticated user profile.
 * Only executes if auth token exists.
 */
export function useCurrentUser() {
  const hasToken = Boolean(localStorage.getItem('authToken'));

  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authService.getCurrentUser,
    enabled: hasToken,
  });
}

/**
 * Hook for refreshing auth token
 *
 * Refreshes authentication token when expired.
 */
export function useRefreshToken() {
  return useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: (response) => {
      localStorage.setItem('authToken', response.data.token);
    },
  });
}
