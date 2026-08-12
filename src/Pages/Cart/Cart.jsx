import { Link } from "react-router-dom";

import { CartContext } from "../../context/cartContext";

import CartCard from "../../components/Cart/CartCard";
import OrderSummary from "../../components/Cart/OrderSummary";

import emptyCart from "../../assets/images/cart.png";
import { useContext } from "react";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } =
    useContext(CartContext);

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.product?.price || 0) * (item.quantity || 1),
    0
  );

  const totalDiscount = cartItems.reduce(
    (sum, item) =>
      sum +
      (Number(item.product?.price || 0) *
        (item.quantity || 1) *
        Number(item.product?.discount || 0)) /
        100,
    0
  );

  const finalAmount = subtotal - totalDiscount;

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
        <img src={emptyCart} alt="Empty Cart" className="w-44" />

        <span className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Cart
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Your cart is empty
        </h2>
        <p className="mt-3 text-sm text-gray-500">
          Looks like you haven't added anything yet.
        </p>

        <Link to="/">
          <button className="mt-8 bg-black px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 flex items-end justify-between border-b border-gray-200 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Review Order
            </span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
              Shopping Cart
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="divide-y divide-gray-100 lg:col-span-2">
            {cartItems.map((item) => (
              <CartCard
                key={item._id || item.product?._id}
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>

          {/* Summary */}
          <OrderSummary
            subtotal={subtotal}
            totalDiscount={totalDiscount}
            finalAmount={finalAmount}
          />
        </div>
      </div>
    </section>
  );
}

export default Cart;