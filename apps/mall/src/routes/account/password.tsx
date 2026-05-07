import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth, ChangePasswordForm } from '@org/auth';
import { useTranslation } from '@org/i18n';
import { PageHeader, PageContainer, Card, CardContent } from '@org/ui';

function ChangePasswordPage() {
  const { t } = useTranslation('auth');

  return (
    <RequireAuth>
      <PageContainer>
        <PageHeader
          title={t('password.title', 'Change Password')}
          description={t(
            'password.description',
            'Update your account password'
          )}
        />
        <div className="max-w-2xl">
          <Card>
            <CardContent className="pt-6">
              <ChangePasswordForm />
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/account/password')({
  component: ChangePasswordPage,
});
