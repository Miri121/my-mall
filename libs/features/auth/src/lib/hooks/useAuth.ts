import { useCallback } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useLogin, useLogout } from '@org/shared/data-access';
import type { User, UserRole } from '@org/shared/types';
import type { LoginFormData } from '@org/shared/types';

// Permission mapping based on user role
const rolePermissions: Record<UserRole, string[]> = {
  admin: ['*'], // Admin has all permissions
  vendor: [
    'vendors:read',
    'vendors:write',
    'products:read',
    'products:write',
    'stores:read',
    'stores:write',
  ],
  customer: ['products:read', 'stores:read', 'profile:read', 'profile:write'],
};

// useAuth hook wrapping react-auth-kit hooks for easier usage
export function useAuth() {
  const signIn = useSignIn<User>();
  const signOut = useSignOut();
  const authUser = useAuthUser<User>();
  const isAuthenticated = useIsAuthenticated();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  // Login function with integration to API
  const login = useCallback(
    async (credentials: LoginFormData) => {
      const response = await loginMutation.mutateAsync(credentials);

      const success = signIn({
        auth: {
          token: response.data.token,
          type: 'Bearer',
        },
        userState: response.data.user,
        refresh: response.data.refreshToken,
      });

      return success;
    },
    [loginMutation, signIn]
  );

  // Logout function to clear tokens and redirect
  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      signOut();
      window.location.href = '/login';
    }
  }, [logoutMutation, signOut]);

  // Check if user has specific role
  const hasRole = useCallback(
    (role: UserRole): boolean => {
      return authUser?.role === role;
    },
    [authUser]
  );

  // Check if user has specific permission
  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!authUser?.role) return false;

      const userPermissions = rolePermissions[authUser.role];

      // Admin has all permissions
      if (userPermissions.includes('*')) return true;

      // Check if user has specific permission
      return userPermissions.includes(permission);
    },
    [authUser]
  );

  return {
    user: authUser,
    isAuthenticated,
    login,
    logout,
    hasRole,
    hasPermission,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
  };
}
