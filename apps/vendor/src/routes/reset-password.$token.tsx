import { createFileRoute } from '@tanstack/react-router';
import { GuestOnly, ResetPasswordForm } from '@org/auth';
import { useTranslation } from '@org/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@org/ui';

function ResetPasswordPage() {
  const { t } = useTranslation('auth');
  const { token } = Route.useParams();

  return (
    <GuestOnly>
      <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>
                {t('resetPassword.title', 'Set New Password')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResetPasswordForm token={token} />
            </CardContent>
          </Card>
        </div>
      </div>
    </GuestOnly>
  );
}

export const Route = createFileRoute('/reset-password/$token')({
  component: ResetPasswordPage,
});
