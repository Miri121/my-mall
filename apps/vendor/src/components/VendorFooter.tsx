import { useTranslation } from '@org/i18n';

export function VendorFooter() {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container flex items-center justify-center h-16 px-4">
        <p className="text-sm text-muted-foreground">
          {currentYear} {t('vendor.portal', 'Vendor Portal')}. {t('footer.rights', 'All rights reserved')}.
        </p>
      </div>
    </footer>
  );
}
