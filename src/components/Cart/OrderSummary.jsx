import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Truck } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

function OrderSummary({
  subtotal,
  totalDiscount,
  finalAmount,
}) {

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleCheckout = () => {

    if (!user) {

      navigate("/login", {
        state: { from: "/checkout" },
      });

      return;

    }

    navigate("/checkout");

  };

  return (

    <div
      className="
      bg-white
      rounded-3xl
      shadow-sm
      border
      border-gray-100
      p-6
      sticky
      top-24
      "
    >

      <h2 className="text-2xl font-bold">

        Order Summary

      </h2>

      <div className="space-y-4 mt-8">

        <div className="flex justify-between">

          <span className="text-gray-500">

            Subtotal

          </span>

          <span className="font-medium">

            ₹{subtotal.toFixed(0)}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-green-600">

            Discount

          </span>

          <span className="text-green-600 font-medium">

            -₹{totalDiscount.toFixed(0)}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">

            Delivery

          </span>

          <span className="font-medium">

            Free

          </span>

        </div>

      </div>

      <hr className="my-6" />

      <div className="flex justify-between text-xl font-bold">

        <span>Total</span>

        <span>

          ₹{finalAmount.toFixed(0)}

        </span>

      </div>

      <button

        onClick={handleCheckout}

        className="
        w-full
        mt-8
        h-14
        rounded-2xl
        bg-black
        text-white
        font-semibold
        hover:bg-zinc-900
        transition
        "

      >

        {user ? "Proceed to Checkout" : "Login to Continue"}

      </button>

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3 text-gray-500">

          <Truck size={18} />

          <span>Free shipping on all orders</span>

        </div>

        <div className="flex items-center gap-3 text-gray-500">

          <ShieldCheck size={18} />

          <span>100% Secure Checkout</span>

        </div>

      </div>

    </div>

  );

}

export default OrderSummary;