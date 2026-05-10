import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { StoreForm } from '@org/stores';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  Card,
  CardContent,
  Alert,
  AlertDescription,
} from '@org/ui';
import { Info } from 'lucide-react';

function NewStorePage() {
  const { t } = useTranslation('stores');
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate({ to: '/stores' });
  };

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['admin']}>
        <PageContainer>
          <PageHeader
            title={t('create', 'Add Store')}
            description={t('createDesc', 'Create a new store')}
          />
          <Alert className="mb-6 max-w-3xl">
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t(
                'urlRequired',
                'The URL field is required for external store links.'
              )}
            </AlertDescription>
          </Alert>
          <div className="max-w-3xl">
            <Card>
              <CardContent className="pt-6">
                <StoreForm onSuccess={handleSuccess} />
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/stores/new')({
  component: NewStorePage,
});
