import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ResetPasswordForm } from '@org/auth';
import { useTranslation } from '@org/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@org/ui';

function ResetPasswordPage() {
  const { t } = useTranslation('auth');
  const { token } = Route.useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate({ to: '/login' });
  };

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {t('resetPassword.title', 'Reset Password')}
          </CardTitle>
          <CardDescription>
            {t('resetPassword.subtitle', 'Enter your new password')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm token={token} onSuccess={handleSuccess} />
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute('/reset-password/$token')({
  component: ResetPasswordPage,
});
