import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RequireAuth } from '@org/auth';
import { useDeleteAccount } from '@org/data-access';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Alert,
  AlertDescription,
  Input,
  Label,
  toast,
} from '@org/ui';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

function DeleteAccountPage() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const deleteAccount = useDeleteAccount();
  const [confirmation, setConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirmation !== 'DELETE') {
      toast({
        title: t('delete.error', 'Error'),
        description: t(
          'delete.confirmationError',
          'Please type DELETE to confirm'
        ),
        variant: 'destructive',
      });
      return;
    }

    setIsDeleting(true);
    deleteAccount.mutate(undefined, {
      onSuccess: () => {
        toast({
          title: t('delete.success', 'Account Deleted'),
          description: t(
            'delete.successDesc',
            'Your account has been deleted successfully'
          ),
        });
        navigate({ to: '/' });
      },
      onError: () => {
        setIsDeleting(false);
        toast({
          title: t('delete.error', 'Error'),
          description: t(
            'delete.errorDesc',
            'Failed to delete account. Please try again.'
          ),
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <RequireAuth>
      <PageContainer>
        <PageHeader
          title={t('delete.title', 'Delete Account')}
          description={t(
            'delete.description',
            'Permanently delete your account and all data'
          )}
        />
        <div className="max-w-2xl">
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {t(
                'delete.warning',
                'This action cannot be undone. All your data, including favorites and history, will be permanently deleted.'
              )}
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>{t('delete.confirm', 'Confirm Deletion')}</CardTitle>
              <CardDescription>
                {t(
                  'delete.confirmDesc',
                  'Type DELETE below to confirm account deletion'
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="confirmation">
                  {t('delete.confirmLabel', 'Type DELETE to confirm')}
                </Label>
                <Input
                  id="confirmation"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  placeholder="DELETE"
                  autoComplete="off"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate({ to: '/account' })}
                  className="flex-1"
                  disabled={isDeleting}
                >
                  {t('buttons.cancel', 'Cancel')}
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={confirmation !== 'DELETE' || isDeleting}
                  className="flex-1"
                >
                  {isDeleting
                    ? t('delete.deleting', 'Deleting...')
                    : t('delete.deleteAccount', 'Delete Account')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/account/delete')({
  component: DeleteAccountPage,
});
