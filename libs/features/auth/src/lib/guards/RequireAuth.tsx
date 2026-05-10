import type { ReactNode } from 'react';
import { Navigate } from '@tanstack/react-router';
import { LoadingSpinner } from '@org/ui';
import { useAuth } from '../hooks/useAuth';

interface RequireAuthProps {
  children: ReactNode;
}

// Protected route wrapper - redirects unauthenticated users to login
export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
}
