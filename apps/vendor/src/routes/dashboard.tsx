import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth, RequireRole, useAuth } from '@org/auth';
import { useVendorDashboard } from '@org/vendor-domain';
import { useTranslation } from '@org/i18n';
import type { VendorUser } from '@org/types';
import {
  PageHeader,
  PageContainer,
  LoadingSpinner,
  ErrorMessage,
} from '@org/ui';
import { StatCard } from '../components/StatCard';
import { RecentProducts } from '../components/RecentProducts';
import { Package, Store } from 'lucide-react';

function DashboardPage() {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const vendorId = (user as VendorUser)?.vendorId;

  const { statistics, recentProducts, isLoading, error } = useVendorDashboard(
    vendorId || ''
  );

  if (isLoading) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['vendor']}>
          <LoadingSpinner />
        </RequireRole>
      </RequireAuth>
    );
  }

  if (error) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['vendor']}>
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
      <RequireRole allowedRoles={['vendor']}>
        <PageContainer>
          <PageHeader
            title={t('dashboard.title', 'Dashboard')}
            description={t(
              'dashboard.description',
              'Overview of your products and stores'
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              title={t('dashboard.stores', 'Stores')}
              value={statistics?.storeCount || 0}
              icon={Store}
              description={t('dashboard.storesDesc', 'Total stores assigned')}
            />
            <StatCard
              title={t('dashboard.products', 'Products')}
              value={statistics?.productCount || 0}
              icon={Package}
              description={t('dashboard.productsDesc', 'Total products listed')}
            />
          </div>

          <RecentProducts products={recentProducts || []} />
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});
