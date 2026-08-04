import { Link } from "react-router-dom";

import { CartContext } from "../../context/cartContext";

import CartCard from "../../components/Cart/CartCard";
import OrderSummary from "../../components/Cart/OrderSummary";

import emptyCart from "../../assets/images/cart.png";

function Cart() {

  const {

    cartItems,

    removeFromCart,

    updateQuantity,

  } = useCart();

  const subtotal = cartItems.reduce(

    (sum, item) =>

      sum +

      Number(item.price || 0) *

      (item.quantity || 1),

    0

  );

  const totalDiscount = cartItems.reduce(

    (sum, item) =>

      sum +

      (

        Number(item.price || 0) *

        (item.quantity || 1) *

        (item.discount || 0)

      ) /

      100,

    0

  );

  const finalAmount =

    subtotal - totalDiscount;

  if (cartItems.length === 0) {

    return (

      <div
        className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        bg-gray-50
        px-6
        "
      >

        <img

          src={emptyCart}

          alt="Empty Cart"

          className="w-52"

        />

        <h2 className="text-3xl font-bold mt-8">

          Your Cart is Empty

        </h2>

        <p className="text-gray-500 mt-3">

          Looks like you haven't added anything yet.

        </p>

        <Link to="/">

          <button
            className="
            mt-8
            px-8
            py-4
            rounded-2xl
            bg-black
            text-white
            hover:bg-zinc-900
            transition
            "
          >

            Continue Shopping

          </button>

        </Link>

      </div>

    );

  }

  return (

    <section className="bg-gray-50 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-5">

        <h1 className="text-4xl font-bold mb-10">

          Shopping Cart

        </h1>

        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-8
          "
        >

          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-6">

            {cartItems.map((item) => (

              <CartCard

                key={item.id}

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