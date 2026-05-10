import type { ReactNode } from 'react';
import { Navigate } from '@tanstack/react-router';
import { LoadingSpinner, ErrorMessage } from '@org/ui';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '@org/types';

interface RequireRoleProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
}

// Role-based access control wrapper
export function RequireRole({
  children,
  allowedRoles,
  fallbackPath = '/unauthorized',
}: RequireRoleProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    // User doesn't have required role
    if (fallbackPath === '/unauthorized') {
      return (
        <div className="flex h-screen items-center justify-center p-4">
          <div className="max-w-md text-center">
            <ErrorMessage message="You don't have permission to access this page." />
            <p className="mt-4 text-sm text-muted-foreground">
              Required role: {allowedRoles.join(' or ')}
            </p>
          </div>
        </div>
      );
    }
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
}
