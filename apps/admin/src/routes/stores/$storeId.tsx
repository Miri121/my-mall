import { createFileRoute, Link } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useStore } from '@org/data-access';
import { StoreDetail } from '@org/stores';
import { useTranslation } from '@org/i18n';
import { PageContainer, LoadingSpinner, ErrorMessage, Button } from '@org/ui';
import { ArrowLeft, Edit } from 'lucide-react';

function StoreDetailPage() {
  const { t } = useTranslation('stores');
  const { storeId } = Route.useParams();
  const { data: store, isLoading, error } = useStore(storeId);

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
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" asChild>
              <Link to="/stores">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('backToList', 'Back to Stores')}
              </Link>
            </Button>
            <Button asChild>
              <Link to="/stores/$storeId/edit" params={{ storeId }}>
                <Edit className="h-4 w-4 mr-2" />
                {t('edit', 'Edit')}
              </Link>
            </Button>
          </div>
          <StoreDetail storeId={storeId} />
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/stores/$storeId')({
  component: StoreDetailPage,
});
