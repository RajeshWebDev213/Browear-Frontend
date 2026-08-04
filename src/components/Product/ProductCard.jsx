import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";

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

  const finalPrice =
    price - (price * discount) / 100;

  return (
    <div
      className="
      group
      bg-white
      rounded-3xl
      overflow-hidden
      border
      border-gray-100
      hover:border-gray-300
      hover:shadow-xl
      transition-all
      duration-300
      "
    >
      {/* Image */}

      <div className="relative overflow-hidden">

        <img
          src={productImage}
          alt={name}
          className="
          w-full
          h-80
          object-cover
          group-hover:scale-105
          transition-transform
          duration-500
          "
        />

        {/* Discount */}

        {discount > 0 && (
          <span
            className="
            absolute
            top-4
            left-4
            bg-black
            text-white
            text-xs
            px-3
            py-1
            rounded-full
            "
          >
            {discount}% OFF
          </span>
        )}

        {/* Wishlist */}

        <button
          onClick={() =>
            toggleWishlist &&
            toggleWishlist(product)
          }
          className="
          absolute
          top-4
          right-4
          w-10
          h-10
          rounded-full
          bg-white/90
          backdrop-blur
          flex
          items-center
          justify-center
          hover:bg-black
          hover:text-white
          transition
          "
        >
          <Heart
            size={18}
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
          />
        </button>

      </div>

      {/* Details */}

      <div className="p-5">

        <p className="text-sm text-gray-500 uppercase">

          {category}

        </p>

        <h3
          className="
          font-semibold
          text-lg
          mt-2
          line-clamp-2
          min-h-[56px]
          "
        >
          {name}
        </h3>

        {/* Rating */}

        <div className="flex items-center gap-2 mt-3">

          <Star
            size={16}
            fill="gold"
            color="gold"
          />

          <span className="text-sm">

            {rating}

          </span>

        </div>

        {/* Price */}

        <div className="flex items-center gap-3 mt-4">

          <span className="text-2xl font-bold">

            ₹{finalPrice.toFixed(0)}

          </span>

          {discount > 0 && (
            <span className="line-through text-gray-400">

              ₹{price}

            </span>
          )}

        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-3 mt-6">

          <button
            onClick={() =>
              addToCart &&
              addToCart(product)
            }
            className="
            h-11
            rounded-xl
            bg-black
            text-white
            hover:bg-zinc-900
            transition
            flex
            items-center
            justify-center
            gap-2
            "
          >
            <ShoppingBag size={18} />

            Cart

          </button>

          <Link
            to={`/product/${_id || id}`}
            className="
            h-11
            rounded-xl
            border
            flex
            items-center
            justify-center
            gap-2
            hover:bg-black
            hover:text-white
            transition
            "
          >
            <Eye size={18} />

            View

          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;