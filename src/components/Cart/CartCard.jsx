import { Trash2, Minus, Plus } from "lucide-react";

function CartCard({
  item,
  removeFromCart,
  updateQuantity,
}) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-sm
      border
      border-gray-100
      hover:shadow-lg
      transition
      p-5
      flex
      flex-col
      sm:flex-row
      gap-6
      "
    >
      {/* Product Image */}

      <div className="flex justify-center sm:justify-start">

        <img
          src={item.img || item.images?.[0]?.url}
          alt={item.name}
          className="
          w-32
          h-36
          object-cover
          rounded-2xl
          "
        />

      </div>

      {/* Product Details */}

      <div className="flex-1">

        <h2 className="text-lg font-semibold">

          {item.name}

        </h2>

        <p className="text-gray-500 mt-2">

          ₹{item.price}

        </p>

        {item.discount > 0 && (

          <p className="text-green-600 mt-1">

            {item.discount}% OFF

          </p>

        )}

        {/* Quantity */}

        <div
          className="
          mt-6
          flex
          items-center
          gap-4
          "
        >

          <button
            onClick={() =>
              updateQuantity(
                item.id,
                Math.max(
                  1,
                  (item.quantity || 1) - 1
                )
              )
            }
            disabled={
              (item.quantity || 1) <= 1
            }
            className="
            w-10
            h-10
            rounded-full
            border
            flex
            items-center
            justify-center
            hover:bg-gray-100
            disabled:opacity-40
            "
          >

            <Minus size={18} />

          </button>

          <span className="text-lg font-semibold">

            {item.quantity || 1}

          </span>

          <button
            onClick={() =>
              updateQuantity(
                item.id,
                (item.quantity || 1) + 1
              )
            }
            className="
            w-10
            h-10
            rounded-full
            border
            flex
            items-center
            justify-center
            hover:bg-gray-100
            "
          >

            <Plus size={18} />

          </button>

        </div>

      </div>

      {/* Remove */}

      <div
        className="
        flex
        sm:flex-col
        justify-between
        items-end
        "
      >

        <button
          onClick={() =>
            removeFromCart(item.id)
          }
          className="
          text-red-500
          hover:text-red-600
          transition
          "
        >

          <Trash2 size={22} />

        </button>

        <p className="font-bold text-xl">

          ₹
          {(
            item.price *
            (item.quantity || 1)
          ).toFixed(0)}

        </p>

      </div>

    </div>
  );
}

export default CartCard;