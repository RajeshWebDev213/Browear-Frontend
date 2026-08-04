import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import EmptyState from "../common/EmptyState";

function ProductGrid({
  products = [],
  loading = false,
  addToCart,
  toggleWishlist,
  wishlist = [],
}) {
  // Loading
  if (loading) {
    return (
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-8
        "
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Empty Products
  if (!products.length) {
    return (
      <EmptyState
        title="No Products Found"
        description="Try changing your filters or search."
      />
    );
  }

  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      gap-8
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          isWishlisted={wishlist.some(
            (item) =>
              (item._id || item.id) ===
              (product._id || product.id)
          )}
        />
      ))}
    </div>
  );
}

export default ProductGrid;