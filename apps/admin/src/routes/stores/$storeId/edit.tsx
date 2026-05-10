import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useStore } from '@org/data-access';
import { StoreForm } from '@org/stores';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  LoadingSpinner,
  ErrorMessage,
  Card,
  CardContent,
} from '@org/ui';

function EditStorePage() {
  const { t } = useTranslation('stores');
  const navigate = useNavigate();
  const { storeId } = Route.useParams();
  const { data: store, isLoading, error } = useStore(storeId);

  const handleSuccess = () => {
    navigate({ to: '/stores/$storeId', params: { storeId } });
  };

  if (isLoading) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <LoadingSpinner />
        </RequireRole>
      </RequireAuth>
    );
  }

  if (error || !store) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <ErrorMessage
            title={t('error.notFound', 'Store not found')}
            message={
              error?.message ||
              t('error.notFoundDesc', 'This store does not exist')
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
          <PageHeader
            title={t('edit', 'Edit Store')}
            description={t('editDesc', 'Update store information')}
          />
          <div className="max-w-3xl">
            <Card>
              <CardContent className="pt-6">
                <StoreForm store={store} onSuccess={handleSuccess} />
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/stores/$storeId/edit')({
  component: EditStorePage,
});
