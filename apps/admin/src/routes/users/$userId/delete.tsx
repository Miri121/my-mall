import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useUser, useDeleteUser } from '@org/data-access';
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

function DeleteUserPage() {
  const { t } = useTranslation('users');
  const navigate = useNavigate();
  const { userId } = Route.useParams();
  const { data: user, isLoading: loadingUser } = useUser(userId);
  const deleteUser = useDeleteUser();

  const handleDelete = () => {
    deleteUser.mutate(userId, {
      onSuccess: () => {
        toast({
          title: t('deleteSuccess', 'User deleted'),
          description: t(
            'deleteSuccessDesc',
            'User has been deleted successfully'
          ),
        });
        navigate({ to: '/users' });
      },
      onError: () => {
        toast({
          title: t('deleteError', 'Error'),
          description: t('deleteErrorDesc', 'Failed to delete user'),
          variant: 'destructive',
        });
      },
    });
  };

  if (loadingUser) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <LoadingSpinner />
        </RequireRole>
      </RequireAuth>
    );
  }

  if (!user) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <ErrorMessage
            title={t('error.notFound', 'User not found')}
            message={t('error.notFoundDesc', 'This user does not exist')}
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
                  'This action cannot be undone. This will permanently delete the user account.'
                )}
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>{t('deleteTitle', 'Delete User')}</CardTitle>
                <CardDescription>
                  {t(
                    'deleteConfirmation',
                    'Are you sure you want to delete this user?'
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-1">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate({ to: '/users/$userId', params: { userId } })
                    }
                    className="flex-1"
                  >
                    {t('cancel', 'Cancel')}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleteUser.isPending}
                    className="flex-1"
                  >
                    {deleteUser.isPending
                      ? t('deleting', 'Deleting...')
                      : t('delete', 'Delete User')}
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

export const Route = createFileRoute('/users/$userId/delete')({
  component: DeleteUserPage,
});
