import { createFileRoute } from '@tanstack/react-router';
import { useStoreBySlug } from '@org/data-access';
import { useBrowsingHistoryStore } from '@org/customer';
import { useTranslation } from '@org/i18n';
import { LoadingSpinner, ErrorMessage, PageContainer, Badge } from '@org/ui';
import { useEffect } from 'react';
import { ExternalLink, Globe } from 'lucide-react';

function StoreDetailPage() {
  const { storeSlug } = Route.useParams();
  const { t } = useTranslation('stores');
  const { data: store, isLoading, error } = useStoreBySlug(storeSlug);
  const { addItem } = useBrowsingHistoryStore();

  // Add to browsing history
  useEffect(() => {
    if (store) {
      addItem({
        id: store.id,
        type: 'store',
        name: store.name,
        slug: store.slug,
        image: store.logo ?? undefined,
      });
    }
  }, [store, addItem]);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </PageContainer>
    );
  }

  if (error || !store) {
    return (
      <PageContainer>
        <ErrorMessage message={t('errors.storeNotFound', 'Store not found')} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Store Header */}
      <div className="relative">
        {store.coverImage && (
          <div className="h-64 w-full overflow-hidden rounded-lg">
            <img
              src={store.coverImage}
              alt={store.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="mt-6 flex flex-col md:flex-row gap-6 items-start">
          {store.logo && (
            <img
              src={store.logo}
              alt={store.name}
              className="w-24 h-24 rounded-lg border shadow-md object-cover"
            />
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{store.name}</h1>
              </div>
              {store.isActive && (
                <Badge variant="default">{t('store.active', 'Active')}</Badge>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              {store.url && (
                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <Globe className="h-4 w-4" />
                  <span>{t('store.website', 'Website')}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Store Description */}
      {store.description && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            {t('store.about', 'About')}
          </h2>
          <p className="text-muted-foreground">{store.description}</p>
        </div>
      )}

      {/* Store Website Iframe */}
      {store.url && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {t('store.visitStore', 'Visit Store')}
            </h2>
            <a
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              {t('store.openInNewTab', 'Open in new tab')}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="border rounded-lg overflow-hidden bg-muted">
            <iframe
              src={store.url}
              title={store.name}
              className="w-full h-600px"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      )}
    </PageContainer>
  );
}

export const Route = createFileRoute('/stores/$storeSlug')({
  component: StoreDetailPage,
});
