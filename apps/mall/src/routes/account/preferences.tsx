import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth } from '@org/auth';
import { useCustomerPreferencesStore } from '@org/customer';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  toast,
} from '@org/ui';

function PreferencesPage() {
  const { t } = useTranslation('common');
  const {
    language,
    theme,
    notifications,
    setLanguage,
    setTheme,
    updateNotifications,
  } = useCustomerPreferencesStore();

  const handleSave = () => {
    toast({
      title: t('preferences.saved', 'Preferences saved'),
      description: t(
        'preferences.savedDesc',
        'Your preferences have been updated successfully'
      ),
    });
  };

  return (
    <RequireAuth>
      <PageContainer>
        <PageHeader
          title={t('preferences.title', 'Preferences')}
          description={t(
            'preferences.description',
            'Customize your shopping experience'
          )}
        />
        <div className="max-w-2xl space-y-6">
          {/* Theme Preference */}
          <Card>
            <CardHeader>
              <CardTitle>{t('preferences.theme', 'Theme')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">
                  {t('preferences.themeLabel', 'Select theme')}
                </Label>
                <Select
                  value={theme}
                  onValueChange={(value) =>
                    setTheme(value as 'light' | 'dark' | 'system')
                  }
                >
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      {t('preferences.light', 'Light')}
                    </SelectItem>
                    <SelectItem value="dark">
                      {t('preferences.dark', 'Dark')}
                    </SelectItem>
                    <SelectItem value="system">
                      {t('preferences.system', 'System')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Language Preference */}
          <Card>
            <CardHeader>
              <CardTitle>{t('preferences.language', 'Language')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">
                  {t('preferences.languageLabel', 'Select language')}
                </Label>
                <Select
                  value={language}
                  onValueChange={(value) => setLanguage(value as 'en' | 'he')}
                >
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="he">עברית</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t('preferences.notifications', 'Notifications')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notifications">
                  {t('preferences.notificationsLabel', 'Email notifications')}
                </Label>
                <Select
                  value={notifications.email ? 'enabled' : 'disabled'}
                  onValueChange={(value) =>
                    updateNotifications({ email: value === 'enabled' })
                  }
                >
                  <SelectTrigger id="notifications">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">
                      {t('preferences.enabled', 'Enabled')}
                    </SelectItem>
                    <SelectItem value="disabled">
                      {t('preferences.disabled', 'Disabled')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full">
            {t('preferences.save', 'Save Preferences')}
          </Button>
        </div>
      </PageContainer>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/account/preferences')({
  component: PreferencesPage,
});
