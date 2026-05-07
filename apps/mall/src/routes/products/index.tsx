import { createFileRoute } from '@tanstack/react-router';
import { ProductList } from '@org/products';
import { useTranslation } from '@org/i18n';
import { PageHeader, PageContainer } from '@org/ui';

function ProductsPage() {
  const { t } = useTranslation('products');

  return (
    <PageContainer>
      <PageHeader
        title={t('productsPage.title', 'All Products')}
        description={t(
          'productsPage.description',
          'Browse all available products from our stores'
        )}
      />
      <ProductList />
    </PageContainer>
  );
}

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
});
