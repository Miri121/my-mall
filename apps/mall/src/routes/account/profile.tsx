import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth, ProfileForm } from '@org/auth';
import { useTranslation } from '@org/i18n';
import { PageHeader, PageContainer, Card, CardContent } from '@org/ui';

function ProfilePage() {
  const { t } = useTranslation('auth');

  return (
    <RequireAuth>
      <PageContainer>
        <PageHeader
          title={t('profile.title', 'Profile')}
          description={t(
            'profile.description',
            'Manage your personal information'
          )}
        />
        <div className="max-w-2xl">
          <Card>
            <CardContent className="pt-6">
              <ProfileForm />
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/account/profile')({
  component: ProfilePage,
});
