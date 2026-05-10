import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useDeleteStore } from '@org/data-access';
import { StoreList } from '@org/stores';
import { useTranslation } from '@org/i18n';
import { PageContainer } from '@org/ui';

function StoresListPage() {
  const { t } = useTranslation('stores');
  const deleteStore = useDeleteStore();

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        t('deleteConfirm', 'Are you sure you want to delete this store?')
      )
    ) {
      deleteStore.mutate(id);
    }
  };

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['admin']}>
        <PageContainer>
          <StoreList
            onDeleteClick={handleDelete}
            canCreate={true}
            canEdit={true}
            canDelete={true}
          />
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/stores/')({
  component: StoresListPage,
});
