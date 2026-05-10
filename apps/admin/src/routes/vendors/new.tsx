import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { VendorForm } from '@org/vendors';
import { useTranslation } from '@org/i18n';
import { PageHeader, PageContainer, Card, CardContent } from '@org/ui';

function NewVendorPage() {
  const { t } = useTranslation('vendors');
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate({ to: '/vendors' });
  };

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['admin']}>
        <PageContainer>
          <PageHeader
            title={t('create', 'Add Vendor')}
            description={t('createDesc', 'Create a new vendor')}
          />
          <div className="max-w-3xl">
            <Card>
              <CardContent className="pt-6">
                <VendorForm onSuccess={handleSuccess} />
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/vendors/new')({
  component: NewVendorPage,
});
