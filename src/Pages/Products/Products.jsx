import { useEffect, useMemo, useState } from "react";

import ProductGrid from "../../components/Product/ProductGrid";
import ProductFilter from "../../components/Product/ProductFilter";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { getAllProducts } from "../../services/productService";
import { WishlistContext } from "../../context/WishlistContext";
function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [sort, setSort] = useState("");

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");
  const {addToCart} = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);
const cart = useContext(CartContext);

console.log("Cart Context:", cart);
  const {wishlist,toggleWishlist} = useContext(WishlistContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getAllProducts();

      setProducts(data.products || data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search
    if (search) {
      filtered = filtered.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Category
    if (category) {
      filtered = filtered.filter(
        (product) =>
          product.category === category
      );
    }

    // Price
    if (minPrice) {
      filtered = filtered.filter(
        (product) =>
          Number(product.price) >= Number(minPrice)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (product) =>
          Number(product.price) <= Number(maxPrice)
      );
    }

    // Sorting
    switch (sort) {
      case "lowToHigh":
        filtered.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "highToLow":
        filtered.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "rating":
        filtered.sort(
          (a, b) =>
            (b.rating || 0) - (a.rating || 0)
        );
        break;

      case "discount":
        filtered.sort(
          (a, b) =>
            (b.discount || 0) -
            (a.discount || 0)
        );
        break;

      default:
        break;
    }

    return filtered;
  }, [
    products,
    search,
    category,
    sort,
    minPrice,
    maxPrice,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <section className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-4xl font-bold mb-10">
        All Products
      </h1>

      <ProductFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        clearFilters={clearFilters}
      />

      <ProductGrid
        products={filteredProducts}
        loading={loading}
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
        wishlist={wishlist}
      />

    </section>
  );
}

export default Products;