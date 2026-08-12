import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

import api from "../../services/api";

function FiftyOff() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await api.get("/products/offers");
      setProducts(response.data.products || []);
    } catch (error) {
      console.log("Offers Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      {/* Heading */}
      <div className="mb-12 flex items-end justify-between border-b border-gray-200 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
            Limited Time
          </span>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            50% Off Deals
          </h2>
        </div>

        <Link
          to="/products"
          className="hidden items-center gap-1.5 text-sm font-medium text-gray-900 md:flex"
        >
          View All
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* Products */}
      {loading ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-80 w-full bg-gray-100" />
              <div className="mt-4 h-3 w-1/3 bg-gray-100" />
              <div className="mt-2 h-4 w-2/3 bg-gray-100" />
              <div className="mt-3 h-5 w-1/4 bg-gray-100" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="group relative block bg-white"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-gray-50">
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="h-80 w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />

                <span className="absolute top-3 left-3 bg-red-500 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
                  −{product.discount}%
                </span>
              </div>

              {/* Details */}
              <div className="pt-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-2 min-h-[48px] text-[15px] font-medium leading-snug text-gray-900">
                    {product.name}
                  </h3>

                  <div className="mt-0.5 flex shrink-0 items-center gap-1 text-xs text-gray-500">
                    <Star size={13} fill="currentColor" className="text-gray-800" />
                    {product.averageRating || 0}
                  </div>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{product.price}
                  </span>
                </div>

                <span className="mt-3 block h-px w-6 bg-gray-300 transition-all duration-500 group-hover:w-12 group-hover:bg-red-500" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Mobile View All */}
      <div className="mt-10 flex justify-center md:hidden">
        <Link
          to="/products"
          className="flex items-center gap-2 border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900"
        >
          View All Deals
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}

export default FiftyOff;