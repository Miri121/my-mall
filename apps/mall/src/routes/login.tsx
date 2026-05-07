import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { LoginForm, GuestOnly } from '@org/auth';
import { useTranslation } from '@org/i18n';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@org/ui';

function LoginPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate({ to: '/account' });
  };

  return (
    <GuestOnly>
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {t('login.title', 'Login')}
            </CardTitle>
            <CardDescription>
              {t('login.subtitle', 'Sign in to your account')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onSuccess={handleSuccess} />
            <div className="mt-6 text-center space-y-2">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline block"
              >
                {t('login.forgotPassword', 'Forgot your password?')}
              </Link>
              <p className="text-sm text-muted-foreground">
                {t('login.noAccount', "Don't have an account?")}{' '}
                <Link to="/register" className="text-primary hover:underline">
                  {t('login.signUp', 'Sign up')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </GuestOnly>
  );
}

export const Route = createFileRoute('/login')({
  component: LoginPage,
});
