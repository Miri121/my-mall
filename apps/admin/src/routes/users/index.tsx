import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useDeleteUser } from '@org/data-access';
import { UserList } from '@org/users';
import { useTranslation } from '@org/i18n';
import { PageHeader, PageContainer } from '@org/ui';

function UsersListPage() {
  const { t } = useTranslation('users');
  const deleteUser = useDeleteUser();

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        t('deleteConfirm', 'Are you sure you want to delete this user?')
      )
    ) {
      deleteUser.mutate(id);
    }
  };

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['admin']}>
        <PageContainer>
          <PageHeader
            title={t('title', 'Users')}
            description={t('description', 'Manage platform users')}
          />
          <UserList
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

export const Route = createFileRoute('/users/')({
  component: UsersListPage,
});
