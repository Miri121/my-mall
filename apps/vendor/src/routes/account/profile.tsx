import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth, useAuth } from '@org/auth';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  Card,
  CardContent,
  Label,
  Input,
  Alert,
  AlertDescription,
} from '@org/ui';
import { Info } from 'lucide-react';

function VendorProfilePage() {
  const { t } = useTranslation('auth');
  const { user } = useAuth();

  return (
    <RequireAuth>
      <PageContainer>
        <PageHeader
          title={t('profile.title', 'Profile')}
          description={t('profile.description', 'View your profile information')}
        />

        <Alert className="mb-6 max-w-2xl">
          <Info className="h-4 w-4" />
          <AlertDescription>
            {t('vendor.profileReadOnly', 'Your profile information is read-only. Contact an administrator to make changes.')}
          </AlertDescription>
        </Alert>

        <div className="max-w-2xl">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('profile.name', 'Name')}</Label>
                <Input
                  id="name"
                  value={user?.name || ''}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('profile.email', 'Email')}</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">{t('profile.role', 'Role')}</Label>
                <Input
                  id="role"
                  value={user?.role || ''}
                  disabled
                  className="bg-muted capitalize"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/account/profile')({
  component: VendorProfilePage,
});
