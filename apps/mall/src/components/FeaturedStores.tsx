import { useStores } from '@org/data-access';
import { StoreCard } from '@org/stores';
import { useTranslation } from '@org/i18n';
import { LoadingSpinner, ErrorMessage, EmptyState } from '@org/ui';
import { Store } from 'lucide-react';

export function FeaturedStores() {
  const { t } = useTranslation('stores');
  const {
    data: stores,
    isLoading,
    error,
  } = useStores({ page: 1, limit: 6, sortOrder: 'desc' });

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            {t('featuredStores', 'Featured Stores')}
          </h2>
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            {t('featuredStores', 'Featured Stores')}
          </h2>
          <ErrorMessage
            message={t('errors.loadFailed', 'Failed to load stores')}
          />
        </div>
      </section>
    );
  }

  if (!stores?.data || stores.data.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            {t('featuredStores', 'Featured Stores')}
          </h2>
          <EmptyState
            icon={Store}
            title={t('noStores', 'No Stores Found')}
            description={t(
              'noStoresDesc',
              'Check back later for featured stores.'
            )}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">
          {t('featuredStores', 'Featured Stores')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.data.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>
    </section>
  );
}
