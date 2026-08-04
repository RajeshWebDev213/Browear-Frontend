import React, { useContext }  from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Header/AuthContext";
function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const CarttoBuyNow = () => {
    if (!user) {
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/Checkout");
    }
  };

  // ✅ Correct calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * (item.quantity || 1),
    0
  );

  const totalDiscount = cartItems.reduce(
    (sum, item) =>
      sum +
      (Number(item.price || 0) *
        (item.quantity || 1) *
        (item.discount || 0)) /
        100,
    0
  );

  const finalAmount = subtotal - totalDiscount;

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
        <img
          src="/cart.png"  // ✅ Fixed path
          alt="empty cart"
          className="w-40 mb-4"
        />
        <p className="text-lg mb-2">Your cart is empty</p>
        <Link to="/">
          <button className="px-6 py-3 bg-black hover:bg-gray-600 text-white rounded-md font-medium">
            Shop now
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* CART ITEMS */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 shadow rounded"
          >
            {/* Product Info */}
            <div className="flex gap-4 flex-1">
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-24 object-cover flex-shrink-0"
              />

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                <p className="font-medium text-gray-900">₹{Number(item.price).toFixed(0)}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
              </div>
            </div>

            {/* QUANTITY CONTROLS + REMOVE */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 xs:gap-3">
              {/* +/- Buttons */}
              <div className="flex items-center bg-gray-100 rounded-md p-1 min-w-[120px]">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-gray-200 rounded-l-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent flex-shrink-0"
                  disabled={(item.quantity || 1) <= 1}
                >
                  -
                </button>
                
                <span className="px-3 py-2 min-w-[2rem] text-center font-semibold bg-white border border-gray-200 rounded-md mx-1">
                  {item.quantity || 1}
                </span>
                
                <button
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-gray-200 rounded-r-md transition-colors flex-shrink-0"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-colors whitespace-nowrap flex-shrink-0"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PRICE SUMMARY */}
      <div className="bg-white p-5 shadow rounded h-fit">
        <h2 className="text-lg font-semibold mb-4">Price Details</h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{Number(subtotal).toFixed(0)}</span>
        </div>

        <div className="flex justify-between mb-2 text-green-600">
          <span>Discount</span>
          <span>-₹{Number(totalDiscount).toFixed(0)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Delivery</span>
          <span>₹0</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg text-gray-900">
          <span>Total</span>
          <span>₹{Number(finalAmount).toFixed(0)}</span>
        </div>

        <button onClick={CarttoBuyNow} className="w-full mt-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition-colors">
           {user ?  "Buy Now" : "Login to buy"}
        </button>
      </div>
    </div>
  );
}

export default Cart;
