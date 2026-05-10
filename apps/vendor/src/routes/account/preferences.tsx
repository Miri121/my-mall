import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth } from '@org/auth';
import { useTranslation } from '@org/i18n';
import { i18n } from '@org/i18n';
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
import { useState, useEffect } from 'react';

function PreferencesPage() {
  const { t } = useTranslation('common');
  const [language, setLanguage] = useState(i18n.language);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('vendor-theme') as
      | 'light'
      | 'dark'
      | 'system';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleSave = () => {
    i18n.changeLanguage(language);
    localStorage.setItem('vendor-theme', theme);

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
            'Customize your experience'
          )}
        />
        <div className="max-w-2xl space-y-6">
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
                  onValueChange={(value) => setLanguage(value)}
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
