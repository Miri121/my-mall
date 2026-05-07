import { createFileRoute, Link } from '@tanstack/react-router';
import { RequireAuth } from '@org/auth';
import { useTranslation } from '@org/i18n';
import { useAuth } from '@org/auth';
import {
  PageContainer,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@org/ui';
import { User, Heart, History, Settings, Lock } from 'lucide-react';

function AccountDashboard() {
  const { t } = useTranslation('common');
  const { user } = useAuth();

  const menuItems = [
    {
      to: '/account/profile',
      icon: User,
      title: t('account.profile', 'Profile'),
      description: t('account.profileDesc', 'Manage your personal information'),
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
    {
      to: '/account/favorites',
      icon: Heart,
      title: t('account.favorites', 'Favorites'),
      description: t('account.favoritesDesc', 'View your favorite items'),
    },
    {
      to: '/account/history',
      icon: History,
      title: t('account.history', 'Browsing History'),
      description: t('account.historyDesc', 'See what you viewed recently'),
    },
  ];

  return (
    <RequireAuth>
      <PageContainer>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {t('account.welcome', `Welcome, ${user?.name || 'User'}!`)}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t(
              'account.subtitle',
              'Manage your account settings and preferences'
            )}
          </p>
        </div>

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
  component: AccountDashboard,
});
