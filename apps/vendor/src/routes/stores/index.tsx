import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth, RequireRole, useAuth } from '@org/auth';
import { useVendorStores, useVendor } from '@org/data-access';
import { StoreList } from '@org/stores';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  LoadingSpinner,
  ErrorMessage,
  Alert,
  AlertDescription,
} from '@org/ui';
import { Info } from 'lucide-react';
import type { StoreWithVendor } from '@org/types';
import { useMemo } from 'react';

function StoresListPage() {
  const { t } = useTranslation('stores');
  const { user } = useAuth();
  const {
    data: storesData,
    isLoading: storesLoading,
    error: storesError,
  } = useVendorStores(user?.id || '');
  const {
    data: vendorData,
    isLoading: vendorLoading,
    error: vendorError,
  } = useVendor(user?.id || '');

  // Map stores to include vendor information
  const storesWithVendor = useMemo<StoreWithVendor[]>(() => {
    if (!storesData?.data || !vendorData) return [];

    return storesData.data.map((store) => ({
      ...store,
      vendor: {
        id: vendorData.id,
        name: vendorData.name,
        company: vendorData.company,
      },
    }));
  }, [storesData?.data, vendorData]);

  const isLoading = storesLoading || vendorLoading;
  const error = storesError || vendorError;

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
            title={t('error.loadFailed', 'Failed to load stores')}
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
            title={t('title', 'Stores')}
            description={t('description', 'View your assigned stores')}
          />

          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t(
                'readOnlyNotice',
                'Store information is managed by administrators. You can only view store details.'
              )}
            </AlertDescription>
          </Alert>

          <StoreList stores={storesWithVendor} readOnly />
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/stores/')({
  component: StoresListPage,
});
