import { Link } from "react-router-dom";
import { useContext } from "react";
import { Heart, Eye, Trash2 } from "lucide-react";

import { WishlistContext } from "../../context/WishlistContext";

function Wishlist() {

  const {
    wishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);

  if (wishlist.length === 0) {

    return (

      <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-5">

        <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">

          <Heart
            size={42}
            className="text-red-500"
          />

        </div>

        <h1 className="text-3xl font-bold mt-6">

          Your Wishlist is Empty

        </h1>

        <p className="text-gray-500 mt-3 max-w-md">

          Save your favourite fashion products here and
          access them anytime.

        </p>

        <Link

          to="/products"

          className="
          mt-8
          bg-black
          text-white
          px-8
          py-3
          rounded-xl
          hover:bg-zinc-900
          transition
          "

        >

          Continue Shopping

        </Link>

      </div>

    );

  }

  return (

    <section className="max-w-7xl mx-auto px-5 py-10">

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">

            My Wishlist

          </h1>

          <p className="text-gray-500 mt-2">

            {wishlist.length} Saved Products

          </p>

        </div>

      </div>

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

        {wishlist.map((item) => {

          const image =

            item.images?.[0]?.url ||

            item.img ||

            "https://placehold.co/500x650?text=Browear";

          const finalPrice =
            item.price -
            (item.price * (item.discount || 0)) / 100;

          return (

            <div

              key={item._id || item.id}

              className="
              group
              bg-white
              rounded-3xl
              overflow-hidden
              border
              border-gray-200
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
              "

            >

              {/* IMAGE */}

              <div className="relative overflow-hidden">

                <img

                  src={image}

                  alt={item.name}

                  className="
                  w-full
                  h-80
                  object-cover
                  group-hover:scale-105
                  transition-transform
                  duration-500
                  "

                />

                {item.discount > 0 && (

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

                    {item.discount}% OFF

                  </span>

                )}

                <button

                  onClick={() =>
                    removeFromWishlist(
                      item._id || item.id
                    )
                  }

                  className="
                  absolute
                  top-4
                  right-4
                  w-10
                  h-10
                  rounded-full
                  bg-white
                  flex
                  items-center
                  justify-center
                  shadow
                  hover:bg-red-500
                  hover:text-white
                  transition
                  "

                >

                  <Heart
                    size={18}
                    fill="currentColor"
                  />

                </button>

              </div>

              {/* CONTENT */}

              <div className="p-5">

                <p className="uppercase text-xs tracking-widest text-gray-500">

                  {item.category}

                </p>

                <h3 className="font-semibold text-lg mt-2 line-clamp-2">

                  {item.name}

                </h3>

                <div className="flex items-center gap-3 mt-5">

                  <span className="text-2xl font-bold">

                    ₹{finalPrice.toFixed(0)}

                  </span>

                  {item.discount > 0 && (

                    <span className="text-gray-400 line-through">

                      ₹{item.price}

                    </span>

                  )}

                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">

                  <Link

                    to={`/products/${item._id || item.id}`}

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

                  <button

                    onClick={() =>
                      removeFromWishlist(
                        item._id || item.id
                      )
                    }

                    className="
                    h-11
                    rounded-xl
                    bg-red-500
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-2
                    hover:bg-red-600
                    transition
                    "

                  >

                    <Trash2 size={18} />

                    Remove

                  </button>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

}

export default Wishlist;