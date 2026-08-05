import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/wishlistContext";
import { useContext } from "react";
function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  // EMPTY STATE
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
        <h2 className="text-2xl font-semibold mb-3">
          Your wishlist is empty ❤️
        </h2>
        <Link
          to="/"
          className="underline text-blue-600"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        My Wishlist
      </h1>

      {/* RESPONSIVE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative h-56 sm:h-64">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
              >
                ❤️
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <p className="font-semibold truncate">
                {item.name}
              </p>

              <p className="text-lg font-bold mt-1">
                ₹{item.price}
              </p>

              <Link
                to={`/product/${item.id}`}
                className="block mt-4 text-center border border-black py-2 rounded-lg hover:bg-black hover:text-white transition"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
