import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useProduct, useDeleteProduct } from '@org/data-access';
import { useTranslation } from '@org/i18n';
import {
  PageContainer,
  LoadingSpinner,
  ErrorMessage,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Alert,
  AlertDescription,
  toast,
} from '@org/ui';
import { AlertTriangle } from 'lucide-react';

function DeleteProductPage() {
  const { t } = useTranslation('products');
  const navigate = useNavigate();
  const { productId } = Route.useParams();
  const { data: product, isLoading: loadingProduct } = useProduct(productId);
  const deleteProduct = useDeleteProduct();

  const handleDelete = () => {
    deleteProduct.mutate(productId, {
      onSuccess: () => {
        toast({
          title: t('deleteSuccess', 'Product deleted'),
          description: t(
            'deleteSuccessDesc',
            'Product has been deleted successfully'
          ),
        });
        navigate({ to: '/products' });
      },
      onError: () => {
        toast({
          title: t('deleteError', 'Error'),
          description: t('deleteErrorDesc', 'Failed to delete product'),
          variant: 'destructive',
        });
      },
    });
  };

  if (loadingProduct) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['vendor']}>
          <LoadingSpinner />
        </RequireRole>
      </RequireAuth>
    );
  }

  if (!product) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['vendor']}>
          <ErrorMessage
            title={t('error.notFound', 'Product not found')}
            message={t('error.notFoundDesc', 'This product does not exist')}
          />
        </RequireRole>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['vendor']}>
        <PageContainer>
          <div className="max-w-2xl mx-auto">
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {t(
                  'deleteWarning',
                  'This action cannot be undone. This will permanently delete the product.'
                )}
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>{t('deleteTitle', 'Delete Product')}</CardTitle>
                <CardDescription>
                  {t(
                    'deleteConfirmation',
                    'Are you sure you want to delete this product?'
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate({
                        to: '/products/$productId',
                        params: { productId },
                      })
                    }
                    className="flex-1"
                  >
                    {t('cancel', 'Cancel')}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleteProduct.isPending}
                    className="flex-1"
                  >
                    {deleteProduct.isPending
                      ? t('deleting', 'Deleting...')
                      : t('delete', 'Delete Product')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/products/$productId/delete')({
  component: DeleteProductPage,
});
