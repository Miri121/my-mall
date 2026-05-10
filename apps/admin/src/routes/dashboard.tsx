import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useAdminDashboard } from '@org/admin-domain';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  LoadingSpinner,
  ErrorMessage,
} from '@org/ui';
import { StatCard } from '../components/StatCard';
import { PlatformStats } from '../components/PlatformStats';
import { RecentActivity } from '../components/RecentActivity';
import { Users, Store, Package, UserCog } from 'lucide-react';

function DashboardPage() {
  const { t } = useTranslation('common');
  const {
    totalVendors,
    totalUsers,
    totalStores,
    totalProducts,
    recentVendors,
    recentUsers,
    recentStores,
    isLoading,
    error,
  } = useAdminDashboard();

  // Create statistics object for PlatformStats component
  const statistics = {
    totalVendors,
    totalUsers,
    totalStores,
    totalProducts,
  };

  // Create recentItems object for RecentActivity component
  // Map each array to add the required 'type' property
  const recentItems = {
    vendors: recentVendors.map((vendor) => ({
      id: vendor.id,
      name: vendor.name,
      type: 'vendor' as const,
      createdAt: vendor.createdAt,
    })),
    users: recentUsers.map((user) => ({
      id: user.id,
      name: user.name,
      type: 'user' as const,
      createdAt: user.createdAt,
    })),
    stores: recentStores.map((store) => ({
      id: store.id,
      name: store.name,
      type: 'store' as const,
      createdAt: store.createdAt,
    })),
    products: [], // No products in current hook implementation
  };

  if (isLoading) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <LoadingSpinner />
        </RequireRole>
      </RequireAuth>
    );
  }

  if (error) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <ErrorMessage
            title={t('error.loadFailed', 'Failed to load dashboard')}
            message={error.message}
          />
        </RequireRole>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['admin']}>
        <PageContainer>
          <PageHeader
            title={t('dashboard.title', 'Admin Dashboard')}
            description={t(
              'dashboard.description',
              'Platform overview and statistics'
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title={t('dashboard.vendors', 'Vendors')}
              value={totalVendors}
              icon={UserCog}
              description={t('dashboard.vendorsDesc', 'Total vendors')}
            />
            <StatCard
              title={t('dashboard.stores', 'Stores')}
              value={totalStores}
              icon={Store}
              description={t('dashboard.storesDesc', 'Total stores')}
            />
            <StatCard
              title={t('dashboard.products', 'Products')}
              value={totalProducts}
              icon={Package}
              description={t('dashboard.productsDesc', 'Total products')}
            />
            <StatCard
              title={t('dashboard.users', 'Users')}
              value={totalUsers}
              icon={Users}
              description={t('dashboard.usersDesc', 'Total users')}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PlatformStats statistics={statistics} />
            <RecentActivity recentItems={recentItems} />
          </div>
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});
