import { createFileRoute, Link } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { ProductDetail } from '@org/products';
import { useTranslation } from '@org/i18n';
import { PageContainer, Button } from '@org/ui';
import { ArrowLeft, Edit } from 'lucide-react';

function ProductDetailPage() {
  const { t } = useTranslation('products');
  const { productId } = Route.useParams();

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['vendor']}>
        <PageContainer>
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" asChild>
              <Link to="/products">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('backToList', 'Back to Products')}
              </Link>
            </Button>
            <Button asChild>
              <Link to="/products/$productId/edit" params={{ productId }}>
                <Edit className="h-4 w-4 mr-2" />
                {t('edit', 'Edit')}
              </Link>
            </Button>
          </div>
          <ProductDetail productId={productId} canEdit={true} />
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
});
