import { createFileRoute } from '@tanstack/react-router';
import { GuestOnly, LoginForm } from '@org/auth';
import { useTranslation } from '@org/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@org/ui';

function VendorLoginPage() {
  const { t } = useTranslation('auth');

  return (
    <GuestOnly>
      <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {t('vendor.title', 'Vendor Portal')}
            </h1>
            <p className="text-muted-foreground">
              {t('vendor.subtitle', 'Sign in to manage your products')}
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t('login.title', 'Sign In')}</CardTitle>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </GuestOnly>
  );
}

export const Route = createFileRoute('/login')({
  component: VendorLoginPage,
});
