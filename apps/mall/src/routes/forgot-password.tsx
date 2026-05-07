import { createFileRoute, Link } from '@tanstack/react-router';
import { ForgotPasswordForm } from '@org/auth';
import { useTranslation } from '@org/i18n';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@org/ui';

function ForgotPasswordPage() {
  const { t } = useTranslation('auth');

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {t('forgotPassword.title', 'Forgot Password')}
          </CardTitle>
          <CardDescription>
            {t(
              'forgotPassword.subtitle',
              "Enter your email and we'll send you a reset link"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-primary hover:underline">
              {t('forgotPassword.backToLogin', 'Back to login')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute('/forgot-password')({
  component: ForgotPasswordPage,
});
