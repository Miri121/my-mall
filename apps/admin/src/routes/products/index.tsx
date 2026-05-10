import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { ProductGrid } from '@org/products';
import { useTranslation } from '@org/i18n';
import { PageHeader, PageContainer, Alert, AlertDescription } from '@org/ui';
import { Info } from 'lucide-react';

function ProductsListPage() {
  const { t } = useTranslation('products');

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['admin']}>
        <PageContainer>
          <PageHeader
            title={t('title', 'Products')}
            description={t('description', 'View all platform products')}
          />
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t(
                'readOnlyNotice',
                'Products are managed by vendors. Admins can only view product information.'
              )}
            </AlertDescription>
          </Alert>
          <ProductGrid />
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/products/')({
  component: ProductsListPage,
});
