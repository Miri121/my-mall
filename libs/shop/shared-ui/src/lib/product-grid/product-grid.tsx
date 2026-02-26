import {  } from '@org/models';
import { ProductCard } from '../product-card/product-card';

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export function ProductGrid({ products, onProductSelect }: ProductGridProps) {
 

  return (
   <div></div>
  );
}

export default ProductGrid;