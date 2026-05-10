import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from '@org/i18n';

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const { t } = useTranslation('common');

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        {t('navigation.settings', 'Settings')}
      </h1>
      <div className="bg-card rounded-lg border p-6">
        <p className="text-muted-foreground">
          {t('settings.coming_soon', 'Settings page coming soon...')}
        </p>
      </div>
    </div>
  );
}
