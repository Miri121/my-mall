import { createFileRoute } from '@tanstack/react-router';
import { ProductDetail } from '@org/products';
import { useProduct } from '@org/data-access';
import { useBrowsingHistoryStore } from '@org/customer';
import { useTranslation } from '@org/i18n';
import { LoadingSpinner, ErrorMessage, PageContainer } from '@org/ui';
import { useEffect } from 'react';

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const { t } = useTranslation('products');
  const { data: product, isLoading, error } = useProduct(productId);
  const { addItem } = useBrowsingHistoryStore();

  // Add to browsing history
  useEffect(() => {
    if (product) {
      addItem({
        id: product.id,
        type: 'product',
        name: product.name,
        image: product.images?.[0],
      });
    }
  }, [product, addItem]);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </PageContainer>
    );
  }

  if (error || !product) {
    return (
      <PageContainer>
        <ErrorMessage
          message={t('errors.productNotFound', 'Product not found')}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ProductDetail productId={productId} />
    </PageContainer>
  );
}

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
});
