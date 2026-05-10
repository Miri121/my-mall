import { createFileRoute, Link } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useUser } from '@org/data-access';
import { UserDetail } from '@org/users';
import { useTranslation } from '@org/i18n';
import { PageContainer, LoadingSpinner, ErrorMessage, Button } from '@org/ui';
import { ArrowLeft, Edit } from 'lucide-react';

function UserDetailPage() {
  const { t } = useTranslation('users');
  const { userId } = Route.useParams();
  const { data: user, isLoading, error } = useUser(userId);

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
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" asChild>
              <Link to="/users">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('backToList', 'Back to Users')}
              </Link>
            </Button>
            <Button asChild>
              <Link to="/users/$userId/edit" params={{ userId }}>
                <Edit className="h-4 w-4 mr-2" />
                {t('edit', 'Edit')}
              </Link>
            </Button>
          </div>
          <UserDetail userId={userId} />
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/users/$userId')({
  component: UserDetailPage,
});
