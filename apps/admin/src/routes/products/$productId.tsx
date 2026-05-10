import { createFileRoute, Link } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useProduct } from '@org/data-access';
import { ProductDetail } from '@org/products';
import { useTranslation } from '@org/i18n';
import {
  PageContainer,
  LoadingSpinner,
  ErrorMessage,
  Button,
  Alert,
  AlertDescription,
} from '@org/ui';
import { ArrowLeft, Info } from 'lucide-react';

function ProductDetailPage() {
  const { t } = useTranslation('products');
  const { productId } = Route.useParams();
  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <LoadingSpinner />
        </RequireRole>
      </RequireAuth>
    );
  }

  if (error || !product) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <ErrorMessage
            title={t('error.notFound', 'Product not found')}
            message={
              error?.message ||
              t('error.notFoundDesc', 'This product does not exist')
            }
          />
        </RequireRole>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['admin']}>
        <PageContainer>
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/products">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('backToList', 'Back to Products')}
              </Link>
            </Button>
          </div>

          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t(
                'readOnlyNotice',
                'Product information is read-only for administrators.'
              )}
            </AlertDescription>
          </Alert>

          <ProductDetail productId={productId} />
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
});
