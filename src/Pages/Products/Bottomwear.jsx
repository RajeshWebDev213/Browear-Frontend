import { BottomwearItems } from "../Products/bottomwearitems";
import { Link } from "react-router-dom";
import { useWishlist } from "../Wishlist/WishlistContext";

export default function Bottomwear() {
  const {wishlist, addToWishlist, removeFromWishlist} = useWishlist();

  const isLiked = (id) =>
    wishlist.some((item) => item && item.id === id);

  const handleLike = (e, product) => {
    e.preventDefault();
    if (isLiked(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Bottomwear Collection
      </h1>

      {/* RESPONSIVE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {BottomwearItems.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative h-60 sm:h-72 bg-gray-100 overflow-hidden">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition"
                />
              </Link>

              {/* ❤️ Wishlist */}
              <button
                onClick={(e) => handleLike(e, product)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isLiked(product.id) ? "red" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-5 h-5 ${
                    isLiked(product.id)
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <p className="text-lg font-semibold truncate">
                {product.name}
              </p>

              <div className="flex justify-between mt-2">
                <p className="text-xl font-bold">
                  ₹{product.price}
                </p>
                <span className="text-sm text-green-600">
                  ★ {product.rating || 4.5}
                </span>
              </div>

              <Link
                to={`/product/${product.id}`}
                className="block mt-4 text-center border border-black py-2 rounded-lg hover:bg-black hover:text-white transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
