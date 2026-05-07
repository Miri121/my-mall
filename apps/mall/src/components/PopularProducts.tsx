import { useProducts } from '@org/data-access';
import { ProductCard } from '@org/products';
import { useTranslation } from '@org/i18n';
import { LoadingSpinner, ErrorMessage, EmptyState } from '@org/ui';
import { Package } from 'lucide-react';

export function PopularProducts() {
  const { t } = useTranslation('products');
  const {
    data: products,
    isLoading,
    error,
  } = useProducts({
    page: 1,
    limit: 8,
    sortOrder: 'desc',
    sortBy: 'popularity',
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            {t('popularProducts', 'Popular Products')}
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
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            {t('popularProducts', 'Popular Products')}
          </h2>
          <ErrorMessage
            message={t('errors.loadFailed', 'Failed to load products')}
          />
        </div>
      </section>
    );
  }

  if (!products?.data || products.data.length === 0) {
    return (
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            {t('popularProducts', 'Popular Products')}
          </h2>
          <EmptyState
            icon={Package}
            title={t('noProducts', 'No Products Found')}
            description={t(
              'noProductsDesc',
              'Check back later for popular products.'
            )}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">
          {t('popularProducts', 'Popular Products')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
