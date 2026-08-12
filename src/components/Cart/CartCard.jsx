import { Trash2, Minus, Plus } from "lucide-react";

function CartCard({ item, removeFromCart, updateQuantity }) {
  return (
    <div className="flex flex-col gap-6 py-6 sm:flex-row">
      {/* Product Image */}
      <div className="flex justify-center sm:justify-start">
        <img
          src={
            item.product?.images?.[0]?.url ||
            "https://placehold.co/300x400"
          }
          alt={item.name}
          className="h-32 w-28 object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h2 className="text-[15px] font-medium text-gray-900">
          {item.product?.name}
        </h2>

        <p className="mt-1.5 text-sm text-gray-500">
          ₹{item.product?.price}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Size{" "}
          <span className="font-medium text-gray-900">{item.size}</span>
        </p>

        {item.discount > 0 && (
          <p className="mt-1 text-xs font-medium text-green-600">
            {item.product?.discount}% OFF
          </p>
        )}

        {/* Quantity */}
        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={() =>
              updateQuantity(
                item.product._id,
                Math.max(1, (item.quantity || 1) - 1),
                item.size
              )
            }
            disabled={(item.quantity || 1) <= 1}
            className="flex h-8 w-8 items-center justify-center border border-gray-300 text-gray-600 transition-colors hover:border-black hover:text-black disabled:opacity-30"
          >
            <Minus size={14} />
          </button>

          <span className="w-4 text-center text-sm font-medium text-gray-900">
            {item.quantity || 1}
          </span>

          <button
            onClick={() =>
              updateQuantity(
                item.product._id,
                (item.quantity || 1) + 1,
                item.size
              )
            }
            className="flex h-8 w-8 items-center justify-center border border-gray-300 text-gray-600 transition-colors hover:border-black hover:text-black"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Price + Remove */}
      <div className="flex items-end justify-between sm:flex-col sm:items-end">
        <button
          onClick={() => removeFromCart(item.product._id, item.size)}
          className="text-gray-400 transition-colors hover:text-red-500"
        >
          <Trash2 size={18} />
        </button>

        <p className="text-lg font-semibold text-gray-900">
          ₹{((item.product?.price || 0) * (item.quantity || 1)).toFixed(0)}
        </p>
      </div>
    </div>
  );
}

export default CartCard;