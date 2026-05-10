import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useUser } from '@org/data-access';
import { UserForm } from '@org/users';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  LoadingSpinner,
  ErrorMessage,
  Card,
  CardContent,
} from '@org/ui';

function EditUserPage() {
  const { t } = useTranslation('users');
  const navigate = useNavigate();
  const { userId } = Route.useParams();
  const { data: user, isLoading, error } = useUser(userId);

  const handleSuccess = () => {
    navigate({ to: '/users/$userId', params: { userId } });
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

  if (error || !user) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <ErrorMessage
            title={t('error.notFound', 'User not found')}
            message={
              error?.message ||
              t('error.notFoundDesc', 'This user does not exist')
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
          <PageHeader
            title={t('edit', 'Edit User')}
            description={t('editDesc', 'Update user information')}
          />
          <div className="max-w-3xl">
            <Card>
              <CardContent className="pt-6">
                <UserForm user={user} onSuccess={handleSuccess} />
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/users/$userId/edit')({
  component: EditUserPage,
});
