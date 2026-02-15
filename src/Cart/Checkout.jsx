import React, { useState,useContext } from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useOrders } from "../Orders/OrdersContext";
const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate()
    
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );


  const discount = cartItems.reduce(
    (sum, item) =>
      sum +
      ((Number(item.discount) || 0) *
        Number(item.price) *
        item.quantity) /
        100,
    0
  );

  const finalAmount = subtotal - discount;

  // Place Order
  const handlePlaceOrder = async () => {
    if (
      !address.name ||
      !address.mobile ||
      !address.city ||
      !address.pincode ||
      !address.addressLine
    ) {
      alert("Please fill all address details");
      return;
    }
     
     const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please signup again.");
        navigate("/Login");
        return;
      }
const res = await fetch("https://browear-backend-production.up.railway.app/api/auth/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    ordered_name: address.name,
    phone: address.mobile,
    city: address.city,
    pincode: address.pincode,
    address: address.addressLine,
    total_amount: finalAmount,
    payment_type: paymentMethod,
  }),
});

const data = await res.json();
console.log("ORDER RESPONSE:", data);


 if (!res.ok) {
    console.error("Order failed");
    return;
  } 

    const newOrder = {
    id: Date.now(),
    items: cartItems,
    amount: finalAmount,
    address,
    paymentMethod,
    date: new Date().toLocaleString(),
    };

    setOrderSuccess(true);
    setIsPlacingOrder(true);
    
    
    setTimeout(() => {
      addOrder(newOrder);   
      clearCart();  
           navigate("/Account", {
        state: { openTab: "orders" }
      });      
      

    }, 2500);


  };
  
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    city: "",
    pincode: "",
    addressLine: "",
    
  });


 
 
  // Empty cart
if (cartItems.length === 0 && !isPlacingOrder) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <img
          src="/cart.png"
          alt="Empty Cart"
          className="w-52 mb-6 opacity-80"
        />

        <h2 className="text-2xl font-semibold mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Add items to your cart to checkout
        </p>

        <Link to="/">
          <button className="px-6 py-3 bg-black hover:bg-gray-600 text-white rounded-md font-medium">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="md:col-span-2 space-y-6">
          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4 mb-4"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{Number(item.price) * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* ADDRESS */}
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="border p-2 rounded"
                placeholder="Full Name"
                onChange={(e) =>
                  setAddress({ ...address, name: e.target.value })
                }
              />
              <input
                className="border p-2 rounded"
                placeholder="Mobile Number"
                onChange={(e) =>
                  setAddress({ ...address, mobile: e.target.value })
                }
              />
              <input
                className="border p-2 rounded"
                placeholder="City"
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
              <input
                className="border p-2 rounded"
                placeholder="Pincode"
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
              />

              <textarea
                className="border p-2 rounded md:col-span-2 resize-none"
                placeholder="Full Address"
                onChange={(e) =>
                  setAddress({ ...address, addressLine: e.target.value })
                }
              ></textarea>
            </div>

            {/* PAYMENT */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">
                Payment Method
              </h2>

              <label className="block mb-2">
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Cash on Delivery
              </label>

            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white rounded-lg p-4 h-fit md:sticky md:top-24">
          <h2 className="text-lg font-semibold mb-4">Price Details</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-2 text-green-600">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <span>FREE</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{finalAmount}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>

      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="flex flex-col items-center animate-zoomOut">
            <div className="w-28 h-28 bg-green-500 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-2">
              Order Placed!
            </h2>
            <p className="text-gray-600">
              Thank you for shopping 🎉
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
