/**
 * ProductDetail Component
 *
 * Displays complete product information with image gallery and related products.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Edit,
  Trash2,
  Package,
  Store as StoreIcon,
  Tag,
  ChevronLeft,
  ChevronRight,
  Heart,
} from 'lucide-react';
import { useProduct } from '@org/data-access';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  LoadingSpinner,
  ErrorMessage,
  Separator,
} from '@org/ui';
import { formatCurrency, formatDate, cn } from '@org/utils';
import type { ProductWithDetails } from '@org/types';

interface ProductDetailProps {
  productId: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onFavorite?: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  showFavorite?: boolean;
  isFavorited?: boolean;
  relatedProducts?: ProductWithDetails[];
}

/**
 * ProductDetail displays complete product information with image gallery
 */
export function ProductDetail({
  productId,
  onEdit,
  onDelete,
  onFavorite,
  canEdit = false,
  canDelete = false,
  showFavorite = false,
  isFavorited = false,
  relatedProducts = [],
}: ProductDetailProps) {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: product, isLoading, error } = useProduct(productId);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(productId);
    } else {
      navigate(`/products/${productId}/edit`);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(productId);
    }
  };

  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite(productId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading product details..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load product"
        message={error instanceof Error ? error.message : 'An error occurred'}
      />
    );
  }

  if (!product) {
    return (
      <ErrorMessage
        title="Product not found"
        message="This product does not exist"
      />
    );
  }

  const productWithDetails = product as ProductWithDetails;
  const images = product.images || [];
  const hasMultipleImages = images.length > 1;
  const currentImage = images[selectedImageIndex] || null;
  const hasDiscount =
    product.comparePrice && product.comparePrice > product.price;
  const discountPercentage =
    hasDiscount && product.comparePrice
      ? Math.round(
          ((product.comparePrice - product.price) / product.comparePrice) * 100
        )
      : 0;

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Product Card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-24 w-24 text-muted-foreground" />
                  </div>
                )}

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute left-2 top-1/2 -translate-y-1/2"
                      onClick={handlePreviousImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Discount Badge */}
                {hasDiscount && (
                  <Badge
                    variant="destructive"
                    className="absolute top-4 right-4"
                  >
                    -{discountPercentage}%
                  </Badge>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {hasMultipleImages && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        'flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors',
                        index === selectedImageIndex
                          ? 'border-primary'
                          : 'border-transparent hover:border-muted-foreground'
                      )}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                {productWithDetails.category && (
                  <Badge variant="secondary" className="mb-4">
                    <Tag className="h-3 w-3 mr-1" />
                    {productWithDetails.category.name}
                  </Badge>
                )}
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold">
                    {formatCurrency(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatCurrency(product.comparePrice)}
                    </span>
                  )}
                </div>
                {hasDiscount && product.comparePrice && (
                  <p className="text-green-600 font-medium">
                    Save {formatCurrency(product.comparePrice - product.price)}{' '}
                    ({discountPercentage}% off)
                  </p>
                )}
              </div>

              <Separator />

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Store Information */}
              {productWithDetails.store && (
                <div>
                  <h3 className="font-semibold mb-2">Store</h3>
                  <Link
                    to={`/stores/${productWithDetails.store.slug}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <StoreIcon className="h-4 w-4" />
                    {productWithDetails.store.name}
                  </Link>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {showFavorite && (
                  <Button
                    variant="outline"
                    onClick={handleFavorite}
                    className="flex-1"
                  >
                    <Heart
                      className={cn(
                        'mr-2 h-4 w-4',
                        isFavorited && 'fill-red-500 text-red-500'
                      )}
                    />
                    {isFavorited ? 'Favorited' : 'Add to Favorites'}
                  </Button>
                )}
                {canEdit && (
                  <Button variant="outline" onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}
                {canDelete && (
                  <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metadata Card */}
      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Product ID
              </dt>
              <dd className="font-mono text-sm mt-1">{product.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Status
              </dt>
              <dd className="mt-1">
                <Badge variant={product.isActive ? 'default' : 'secondary'}>
                  {product.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Created
              </dt>
              <dd className="mt-1">{formatDate(product.createdAt, 'PPP')}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Last Updated
              </dt>
              <dd className="mt-1">{formatDate(product.updatedAt, 'PPP')}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProducts.slice(0, 6).map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-2">
                    {relatedProduct.images?.[0] && (
                      <div className="aspect-square bg-muted rounded-md overflow-hidden">
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h4 className="font-medium line-clamp-2">
                      {relatedProduct.name}
                    </h4>
                    <p className="text-lg font-bold">
                      {formatCurrency(relatedProduct.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
