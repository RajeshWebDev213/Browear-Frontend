import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

function ProductCard({
  product,
  addToCart,
  toggleWishlist,
  isWishlisted = false,
}) {
  const {
    _id,
    id,
    name,
    price,
    discount = 0,
    rating = 4.5,
    images,
    img,
    category,
  } = product;

  const productImage =
    images?.[0]?.url ||
    img ||
    "https://placehold.co/600x800?text=Browear";

  const finalPrice = price - (price * discount) / 100;

  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const inCart = cartItems.some(
    (item) => (item.product?._id || item.product) === (_id || id)
  );

  return (
    <div className="group relative bg-white">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50">
        <Link to={`/products/${_id || id}`}>
          <img
            src={productImage}
            alt={name}
            className="h-80 w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Discount */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-black px-2.5 py-1 text-[11px] font-medium tracking-wide text-white">
            −{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center border border-black/10 bg-white/90 text-black backdrop-blur transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Quick add — slides up on hover */}
        <button
          onClick={async () => {
            if (inCart) {
              navigate("/cart");
              return;
            }
            try {
              await addToCart(_id);
            } catch (err) {
              console.log(err);
            }
          }}
          className="
            absolute inset-x-0 bottom-0
            flex items-center justify-center gap-2
            bg-black py-3 text-sm font-medium text-white
            translate-y-full opacity-0
            transition-all duration-300 ease-out
            group-hover:translate-y-0 group-hover:opacity-100
          "
        >
          <ShoppingBag size={15} />
          {inCart ? "Go to Cart" : "Add to Cart"}
        </button>
      </div>

      {/* Details */}
      <div className="pt-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400">
              {category}
            </p>
            <h3 className="mt-1 line-clamp-2 min-h-[48px] text-[15px] font-medium leading-snug text-gray-900">
              {name}
            </h3>
          </div>

          <div className="mt-0.5 flex shrink-0 items-center gap-1 text-xs text-gray-500">
            <Star size={13} fill="currentColor" className="text-gray-800" />
            {rating}
          </div>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-gray-900">
            ₹{finalPrice.toFixed(0)}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₹{price}
            </span>
          )}
        </div>

        {/* Underline accent, grows on hover like the collection cards */}
        <span className="mt-3 block h-px w-6 bg-gray-300 transition-all duration-500 group-hover:w-12 group-hover:bg-black" />
      </div>
    </div>
  );
}

export default ProductCard;