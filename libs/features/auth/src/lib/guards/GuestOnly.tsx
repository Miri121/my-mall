import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingSpinner } from '@org/ui';
import { useAuth } from '../hooks/useAuth';

interface GuestOnlyProps {
  children: ReactNode;
}

// Redirect authenticated users to dashboard based on their role
export function GuestOnly({ children }: GuestOnlyProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    // Redirect based on user role
    const dashboardRoutes: Record<string, string> = {
      admin: '/admin/dashboard',
      vendor: '/vendor/dashboard',
      customer: '/shop',
    };

    const redirectPath = dashboardRoutes[user.role] || '/';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
