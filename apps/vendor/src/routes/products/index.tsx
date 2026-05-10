import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { RequireAuth, RequireRole, useAuth } from '@org/auth';
import { useVendorProducts } from '@org/vendor-domain';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  LoadingSpinner,
  ErrorMessage,
  Button,
  EmptyState,
} from '@org/ui';
import { VendorProductCard } from '../../components/VendorProductCard';
import { Plus, Package } from 'lucide-react';
import { useDeleteProduct } from '@org/data-access';

function ProductsListPage() {
  const { t } = useTranslation('products');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, error } = useVendorProducts(user?.id || '');
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        t('deleteConfirm', 'Are you sure you want to delete this product?')
      )
    ) {
      deleteProduct.mutate(id);
    }
  };

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
            title={t('error.loadFailed', 'Failed to load products')}
            message={error.message}
          />
        </RequireRole>
      </RequireAuth>
    );
  }

  const products = data?.data || [];

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['vendor']}>
        <PageContainer>
          <PageHeader
            title={t('title', 'Products')}
            description={t('description', 'Manage your products')}
            actions={
              <Button asChild>
                <Link to="/products/new">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('create', 'Add Product')}
                </Link>
              </Button>
            }
          />

          {products.length === 0 ? (
            <EmptyState
              icon={Package}
              title={t('empty', 'No products yet')}
              description={t(
                'emptyDesc',
                'Start adding products to see them here'
              )}
              action={{
                label: t('create', 'Add Product'),
                onClick: () => navigate({ to: '/products/new' }),
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <VendorProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/products/')({
  component: ProductsListPage,
});
