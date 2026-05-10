import { createFileRoute, Link } from '@tanstack/react-router';
import { GuestOnly, ForgotPasswordForm } from '@org/auth';
import { useTranslation } from '@org/i18n';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@org/ui';
import { ArrowLeft } from 'lucide-react';

function ForgotPasswordPage() {
  const { t } = useTranslation('auth');

  return (
    <GuestOnly>
      <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
        <div className="w-full max-w-md">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/login">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('back', 'Back to Login')}
            </Link>
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>
                {t('forgotPassword.title', 'Reset Password')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ForgotPasswordForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </GuestOnly>
  );
}

export const Route = createFileRoute('/forgot-password')({
  component: ForgotPasswordPage,
});
