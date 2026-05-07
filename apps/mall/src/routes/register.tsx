import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { RegisterForm, GuestOnly } from '@org/auth';
import { useTranslation } from '@org/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@org/ui';

function RegisterPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate({ to: '/login' });
  };

  return (
    <GuestOnly>
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('register.title', 'Create Account')}</CardTitle>
            <CardDescription>
              {t('register.subtitle', 'Sign up to get started')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm onSuccess={handleSuccess} />
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t('register.haveAccount', 'Already have an account?')}{' '}
                <Link to="/login" className="text-primary hover:underline">
                  {t('register.signIn', 'Sign in')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </GuestOnly>
  );
}

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});
