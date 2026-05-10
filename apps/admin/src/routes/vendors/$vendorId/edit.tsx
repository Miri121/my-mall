import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useVendor } from '@org/data-access';
import { VendorForm } from '@org/vendors';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  LoadingSpinner,
  ErrorMessage,
  Card,
  CardContent,
} from '@org/ui';

function EditVendorPage() {
  const { t } = useTranslation('vendors');
  const navigate = useNavigate();
  const { vendorId } = Route.useParams();
  const { data: vendor, isLoading, error } = useVendor(vendorId);

  const handleSuccess = () => {
    navigate({ to: '/vendors/$vendorId', params: { vendorId } });
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

  if (error || !vendor) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <ErrorMessage
            title={t('error.notFound', 'Vendor not found')}
            message={error?.message || t('error.notFoundDesc', 'This vendor does not exist')}
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
            title={t('edit', 'Edit Vendor')}
            description={t('editDesc', 'Update vendor information')}
          />
          <div className="max-w-3xl">
            <Card>
              <CardContent className="pt-6">
                <VendorForm vendor={vendor} onSuccess={handleSuccess} />
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/vendors/$vendorId/edit')({
  component: EditVendorPage,
});
