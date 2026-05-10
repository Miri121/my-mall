import { createFileRoute, Link } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useDeleteVendor } from '@org/data-access';
import { VendorList } from '@org/vendors';
import { useTranslation } from '@org/i18n';
import { PageHeader, PageContainer, Button } from '@org/ui';
import { Plus } from 'lucide-react';

function VendorsListPage() {
  const { t } = useTranslation('vendors');
  const deleteVendor = useDeleteVendor();

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        t('deleteConfirm', 'Are you sure you want to delete this vendor?')
      )
    ) {
      deleteVendor.mutate(id);
    }
  };

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['admin']}>
        <PageContainer>
          <PageHeader
            title={t('title', 'Vendors')}
            description={t('description', 'Manage platform vendors')}
            actions={
              <Button asChild>
                <Link to="/vendors/new">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('create', 'Add Vendor')}
                </Link>
              </Button>
            }
          />
          <VendorList
            onDeleteClick={handleDelete}
            canEdit={true}
            canDelete={true}
          />
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/vendors/')({
  component: VendorsListPage,
});
