import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { ProductForm } from '@org/products';
import { useTranslation } from '@org/i18n';
import { PageHeader, PageContainer, Card, CardContent } from '@org/ui';

function NewProductPage() {
  const { t } = useTranslation('products');
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate({ to: '/products' });
  };

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['vendor']}>
        <PageContainer>
          <PageHeader
            title={t('create', 'Add Product')}
            description={t('createDesc', 'Create a new product')}
          />
          <div className="max-w-3xl">
            <Card>
              <CardContent className="pt-6">
                <ProductForm onSuccess={handleSuccess} />
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/products/new')({
  component: NewProductPage,
});
