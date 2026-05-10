import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useVendor, useDeleteVendor } from '@org/data-access';
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

function DeleteVendorPage() {
  const { t } = useTranslation('vendors');
  const navigate = useNavigate();
  const { vendorId } = Route.useParams();
  const { data: vendor, isLoading: loadingVendor } = useVendor(vendorId);
  const deleteVendor = useDeleteVendor();

  const handleDelete = () => {
    deleteVendor.mutate(vendorId, {
      onSuccess: () => {
        toast({
          title: t('deleteSuccess', 'Vendor deleted'),
          description: t(
            'deleteSuccessDesc',
            'Vendor has been deleted successfully'
          ),
        });
        navigate({ to: '/vendors' });
      },
      onError: () => {
        toast({
          title: t('deleteError', 'Error'),
          description: t('deleteErrorDesc', 'Failed to delete vendor'),
          variant: 'destructive',
        });
      },
    });
  };

  if (loadingVendor) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <LoadingSpinner />
        </RequireRole>
      </RequireAuth>
    );
  }

  if (!vendor) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <ErrorMessage
            title={t('error.notFound', 'Vendor not found')}
            message={t('error.notFoundDesc', 'This vendor does not exist')}
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
                {t(
                  'deleteWarning',
                  'This action cannot be undone. This will permanently delete the vendor and all associated data.'
                )}
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>{t('deleteTitle', 'Delete Vendor')}</CardTitle>
                <CardDescription>
                  {t(
                    'deleteConfirmation',
                    'Are you sure you want to delete this vendor?'
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-1">{vendor.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {vendor.email}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate({
                        to: '/vendors/$vendorId',
                        params: { vendorId },
                      })
                    }
                    className="flex-1"
                  >
                    {t('cancel', 'Cancel')}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleteVendor.isPending}
                    className="flex-1"
                  >
                    {deleteVendor.isPending
                      ? t('deleting', 'Deleting...')
                      : t('delete', 'Delete Vendor')}
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

export const Route = createFileRoute('/vendors/$vendorId/delete')({
  component: DeleteVendorPage,
});
