import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Truck } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

function OrderSummary({ subtotal, totalDiscount, finalAmount }) {
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
    <div className="sticky top-24 border border-gray-200 p-8">
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
        Order Summary
      </span>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-900">
            ₹{subtotal.toFixed(0)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-green-600">Discount</span>
          <span className="font-medium text-green-600">
            −₹{totalDiscount.toFixed(0)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Delivery</span>
          <span className="font-medium text-gray-900">Free</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-lg font-bold text-gray-900">
          ₹{finalAmount.toFixed(0)}
        </span>
      </div>

      <button
        onClick={handleCheckout}
        className="mt-8 h-12 w-full bg-black text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800"
      >
        {user ? "Proceed to Checkout" : "Login to Continue"}
      </button>

      <div className="mt-8 space-y-3 border-t border-gray-100 pt-6">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <Truck size={15} className="text-gray-400" />
          <span>Free shipping on all orders</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500">
          <ShieldCheck size={15} className="text-gray-400" />
          <span>100% secure checkout</span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;