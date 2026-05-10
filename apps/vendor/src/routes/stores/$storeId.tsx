import { createFileRoute, Link } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { StoreDetail } from '@org/stores';
import { useTranslation } from '@org/i18n';
import { PageContainer, Button, Alert, AlertDescription } from '@org/ui';
import { ArrowLeft, Info } from 'lucide-react';

function StoreDetailPage() {
  const { t } = useTranslation('stores');
  const { storeId } = Route.useParams();

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['vendor']}>
        <PageContainer>
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/stores">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('backToList', 'Back to Stores')}
              </Link>
            </Button>
          </div>

          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t(
                'readOnlyNotice',
                'Store information is read-only. Contact an administrator to make changes.'
              )}
            </AlertDescription>
          </Alert>

          <StoreDetail storeId={storeId} canEdit={false} canDelete={false} />
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/stores/$storeId')({
  component: StoreDetailPage,
});
