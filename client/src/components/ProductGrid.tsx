import type { Product } from "../types/product";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error?: string;
}

function ProductGrid({ products, loading, error }: ProductGridProps) {
  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <EmptyState
        title="Failed to load products"
        message={error}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        message="Try adjusting your search or filter."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
