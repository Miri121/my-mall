import { createFileRoute, Link } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useVendor } from '@org/data-access';
import { VendorDetail } from '@org/vendors';
import { useTranslation } from '@org/i18n';
import { PageContainer, LoadingSpinner, ErrorMessage, Button } from '@org/ui';
import { ArrowLeft, Edit } from 'lucide-react';

function VendorDetailPage() {
  const { t } = useTranslation('vendors');
  const { vendorId } = Route.useParams();
  const { data: vendor, isLoading, error } = useVendor(vendorId);

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
            message={
              error?.message ||
              t('error.notFoundDesc', 'This vendor does not exist')
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
              <Link to="/vendors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('backToList', 'Back to Vendors')}
              </Link>
            </Button>
            <Button asChild>
              <Link to="/vendors/$vendorId/edit" params={{ vendorId }}>
                <Edit className="h-4 w-4 mr-2" />
                {t('edit', 'Edit')}
              </Link>
            </Button>
          </div>
          <VendorDetail vendorId={vendorId} />
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/vendors/$vendorId')({
  component: VendorDetailPage,
});
