import { createFileRoute, Link } from '@tanstack/react-router';
import { RequireAuth, useAuth } from '@org/auth';
import { useTranslation } from '@org/i18n';
import {
  PageContainer,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Alert,
  AlertDescription,
} from '@org/ui';
import { User, Lock, Settings, Info } from 'lucide-react';

function VendorAccountPage() {
  const { t } = useTranslation('common');
  const { user } = useAuth();

  const menuItems = [
    {
      to: '/account/profile',
      icon: User,
      title: t('account.profile', 'Profile'),
      description: t('account.profileDesc', 'View your profile information'),
    },
    {
      to: '/account/password',
      icon: Lock,
      title: t('account.password', 'Password'),
      description: t('account.passwordDesc', 'Change your password'),
    },
    {
      to: '/account/preferences',
      icon: Settings,
      title: t('account.preferences', 'Preferences'),
      description: t('account.preferencesDesc', 'Customize your experience'),
    },
  ];

  return (
    <RequireAuth>
      <PageContainer>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {t('account.welcome', `Welcome, ${user?.name || 'Vendor'}!`)}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t('account.subtitle', 'Manage your account settings')}
          </p>
        </div>

        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            {t('vendor.profileNotice', 'Your profile information is managed by administrators. You can only change your password and preferences.')}
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block transition-transform hover:scale-105"
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <item.icon className="h-6 w-6 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </PageContainer>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/account/')({
  component: VendorAccountPage,
});
