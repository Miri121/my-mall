import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useStore, useDeleteStore } from '@org/data-access';
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

function DeleteStorePage() {
  const { t } = useTranslation('stores');
  const navigate = useNavigate();
  const { storeId } = Route.useParams();
  const { data: store, isLoading: loadingStore } = useStore(storeId);
  const deleteStore = useDeleteStore();

  const handleDelete = () => {
    deleteStore.mutate(storeId, {
      onSuccess: () => {
        toast({
          title: t('deleteSuccess', 'Store deleted'),
          description: t('deleteSuccessDesc', 'Store has been deleted successfully'),
        });
        navigate({ to: '/stores' });
      },
      onError: () => {
        toast({
          title: t('deleteError', 'Error'),
          description: t('deleteErrorDesc', 'Failed to delete store'),
          variant: 'destructive',
        });
      },
    });
  };

  if (loadingStore) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <LoadingSpinner />
        </RequireRole>
      </RequireAuth>
    );
  }

  if (!store) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <ErrorMessage
            title={t('error.notFound', 'Store not found')}
            message={t('error.notFoundDesc', 'This store does not exist')}
          />
        </RequireRole>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['admin']}>
        <PageContainer>
          <div className="max-w-2xl mx-auto">
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {t('deleteWarning', 'This action cannot be undone. This will permanently delete the store and all associated data.')}
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>{t('deleteTitle', 'Delete Store')}</CardTitle>
                <CardDescription>
                  {t('deleteConfirmation', 'Are you sure you want to delete this store?')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-1">{store.name}</h3>
                  <p className="text-sm text-muted-foreground">{store.url}</p>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate({ to: '/stores/$storeId', params: { storeId } })}
                    className="flex-1"
                  >
                    {t('cancel', 'Cancel')}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleteStore.isPending}
                    className="flex-1"
                  >
                    {deleteStore.isPending ? t('deleting', 'Deleting...') : t('delete', 'Delete Store')}
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

export const Route = createFileRoute('/stores/$storeId/delete')({
  component: DeleteStorePage,
});
