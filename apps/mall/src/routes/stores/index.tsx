import { createFileRoute } from '@tanstack/react-router';
import { StoreList } from '@org/stores';
import { useTranslation } from '@org/i18n';
import { PageHeader, PageContainer } from '@org/ui';

function StoresPage() {
  const { t } = useTranslation('stores');

  return (
    <PageContainer>
      <PageHeader
        title={t('storesPage.title', 'All Stores')}
        description={t(
          'storesPage.description',
          'Browse all available stores in the mall'
        )}
      />
      <StoreList />
    </PageContainer>
  );
}

export const Route = createFileRoute('/stores/')({
  component: StoresPage,
});
