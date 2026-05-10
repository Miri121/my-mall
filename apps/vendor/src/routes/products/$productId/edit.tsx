import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useProduct } from '@org/data-access';
import { ProductForm } from '@org/products';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  LoadingSpinner,
  ErrorMessage,
  Card,
  CardContent,
} from '@org/ui';

function EditProductPage() {
  const { t } = useTranslation('products');
  const navigate = useNavigate();
  const { productId } = Route.useParams();
  const { data: product, isLoading, error } = useProduct(productId);

  const handleSuccess = () => {
    navigate({ to: '/products/$productId', params: { productId } });
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

  if (error || !product) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['vendor']}>
          <ErrorMessage
            title={t('error.notFound', 'Product not found')}
            message={error?.message || t('error.notFoundDesc', 'This product does not exist')}
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
            title={t('edit', 'Edit Product')}
            description={t('editDesc', 'Update product information')}
          />
          <div className="max-w-3xl">
            <Card>
              <CardContent className="pt-6">
                <ProductForm product={product} onSuccess={handleSuccess} />
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/products/$productId/edit')({
  component: EditProductPage,
});
