import { Link } from "react-router-dom";
import { useContext } from "react";
import { Heart, Eye, Trash2 } from "lucide-react";

import { WishlistContext } from "../../context/WishlistContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
        <div className="flex h-20 w-20 items-center justify-center border border-gray-200">
          <Heart size={32} className="text-gray-400" />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
          Your wishlist is empty
        </h1>

        <p className="mt-3 max-w-md text-sm text-gray-500">
          Save your favourite fashion products here and access them anytime.
        </p>

        <Link
          to="/products"
          className="mt-8 bg-black px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="mb-10 flex items-end justify-between border-b border-gray-200 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Saved Items
          </span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            My Wishlist
          </h1>
        </div>
        <p className="text-sm text-gray-500">
          {wishlist.length} {wishlist.length === 1 ? "product" : "products"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((item) => {
          const image =
            item.images?.[0]?.url ||
            item.img ||
            "https://placehold.co/500x650?text=Browear";

          const finalPrice =
            item.price - (item.price * (item.discount || 0)) / 100;

          return (
            <div key={item._id || item.id} className="group relative bg-white">
              {/* Image */}
              <div className="relative overflow-hidden bg-gray-50">
                <Link to={`/products/${item._id || item.id}`}>
                  <img
                    src={image}
                    alt={item.name}
                    className="h-80 w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />
                </Link>

                {item.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-black px-2.5 py-1 text-[11px] font-medium tracking-wide text-white">
                    −{item.discount}%
                  </span>
                )}

                {/* Remove */}
                <button
                  onClick={() => removeFromWishlist(item._id || item.id)}
                  className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center border border-black/10 bg-white/90 text-black backdrop-blur transition-colors duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Heart size={16} fill="currentColor" />
                </button>

                {/* View — slides up on hover */}
                <Link
                  to={`/products/${item._id || item.id}`}
                  className="
                    absolute inset-x-0 bottom-0
                    flex items-center justify-center gap-2
                    bg-black py-3 text-sm font-medium text-white
                    translate-y-full opacity-0
                    transition-all duration-300 ease-out
                    group-hover:translate-y-0 group-hover:opacity-100
                  "
                >
                  <Eye size={15} />
                  View Product
                </Link>
              </div>

              {/* Details */}
              <div className="pt-4">
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400">
                  {item.category}
                </p>
                <h3 className="mt-1 line-clamp-2 min-h-[48px] text-[15px] font-medium leading-snug text-gray-900">
                  {item.name}
                </h3>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{finalPrice.toFixed(0)}
                  </span>
                  {item.discount > 0 && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{item.price}
                    </span>
                  )}
                </div>

                {/* Remove — text link instead of full red button */}
                <button
                  onClick={() => removeFromWishlist(item._id || item.id)}
                  className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 transition-colors hover:text-red-500"
                >
                  <Trash2 size={13} />
                  Remove from wishlist
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Wishlist;