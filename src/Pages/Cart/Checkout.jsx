import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Truck, CheckCircle2 } from "lucide-react";

import { CartContext } from "../../context/cartContext";
import { OrdersContext } from "../../context/orderContext";

import emptyCart from "../../assets/images/cart.png";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, clearCart } = CartContext();

  const { addOrder } = OrdersContext();

  const paymentMethod = "COD";

  const [orderSuccess, setOrderSuccess] = useState(false);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    city: "",
    pincode: "",
    addressLine: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * (item.quantity || 1),
    0
  );

  const discount = cartItems.reduce(
    (sum, item) =>
      sum +
      ((Number(item.discount || 0) *
        Number(item.price || 0) *
        (item.quantity || 1)) /
        100),
    0
  );

  const finalAmount = subtotal - discount;

  const handlePlaceOrder = async () => {
    if (
      !address.name ||
      !address.mobile ||
      !address.city ||
      !address.pincode ||
      !address.addressLine
    ) {
      alert("Please fill all address details.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

      const res = await fetch(
        "http://localhost:5000/api/auth/orders",
        {
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
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
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

        navigate("/account", {
          state: {
            openTab: "orders",
          },
        });
      }, 2500);
    } catch (err) {
      console.log(err);
      alert("Order failed.");
    }
  };

  if (cartItems.length === 0 && !isPlacingOrder) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">

        <img
          src={emptyCart}
          alt="Empty Cart"
          className="w-56"
        />

        <h2 className="text-3xl font-bold mt-8">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mt-3">
          Add products before checkout.
        </p>

        <Link to="/">
          <button className="mt-8 px-8 py-4 rounded-2xl bg-black text-white hover:bg-zinc-900 transition">
            Continue Shopping
          </button>
        </Link>

      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12">

      <div className="max-w-7xl mx-auto px-5">

        <h1 className="text-4xl font-bold mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SECTION */}

          <div className="lg:col-span-2 space-y-8">

            {/* ORDER ITEMS */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

              <h2 className="text-2xl font-semibold mb-6">
                Order Summary
              </h2>

              <div className="space-y-5">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center gap-5 border-b border-gray-100 pb-5"
                  >

                    <img
                      src={item.img || item.images?.[0]?.url}
                      alt={item.name}
                      className="w-24 h-24 rounded-2xl object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Qty : {item.quantity}
                      </p>

                    </div>

                    <h3 className="font-semibold">
                      ₹
                      {(Number(item.price) * item.quantity).toFixed(0)}
                    </h3>

                  </div>

                ))}

              </div>

            </div>

            {/* DELIVERY ADDRESS */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

              <div className="flex items-center gap-3 mb-6">

                <MapPin />

                <h2 className="text-2xl font-semibold">
                  Delivery Address
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  placeholder="Full Name"
                  className="h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-black"
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      name: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Mobile Number"
                  className="h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-black"
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      mobile: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="City"
                  className="h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-black"
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      city: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Pincode"
                  className="h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-black"
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      pincode: e.target.value,
                    })
                  }
                />

                <textarea
                  rows="4"
                  placeholder="Full Address"
                  className="md:col-span-2 rounded-2xl border border-gray-200 p-5 outline-none focus:border-black resize-none"
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      addressLine: e.target.value,
                    })
                  }
                />
                              </div>

            </div>

            {/* PAYMENT METHOD */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

              <div className="flex items-center gap-3 mb-6">

                <Truck />

                <h2 className="text-2xl font-semibold">
                  Payment Method
                </h2>

              </div>

              <div className="border-2 border-black rounded-2xl p-5 flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <input
                    type="radio"
                    checked
                    readOnly
                    className="accent-black w-5 h-5"
                  />

                  <div>

                    <h3 className="font-semibold">
                      Cash on Delivery
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Pay securely when your order arrives.
                    </p>

                  </div>

                </div>

                <Truck size={22} />

              </div>

            </div>

          </div>

          {/* RIGHT SECTION */}

          <div className="lg:col-span-1">

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sticky top-24">

              <h2 className="text-2xl font-bold">
                Price Details
              </h2>

              <div className="space-y-5 mt-8">

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

                  <span className="font-medium text-green-600">
                    -₹{discount.toFixed(0)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Delivery
                  </span>

                  <span className="font-medium">
                    FREE
                  </span>

                </div>

              </div>

              <hr className="my-6" />

              <div className="flex justify-between items-center">

                <span className="text-2xl font-bold">
                  Total
                </span>

                <span className="text-2xl font-bold">
                  ₹{finalAmount.toFixed(0)}
                </span>

              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full h-14 mt-8 rounded-2xl bg-black text-white font-semibold hover:bg-zinc-900 transition"
              >
                Place Order
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* SUCCESS MODAL */}

      {orderSuccess && (

        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">

          <div className="text-center animate-pulse">

            <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center mx-auto">

              <CheckCircle2
                size={72}
                className="text-white"
              />

            </div>

            <h2 className="text-4xl font-bold mt-8">

              Order Placed Successfully

            </h2>

            <p className="text-gray-500 mt-3">

              Thank you for shopping with Browear.

            </p>

            <p className="text-sm text-gray-400 mt-2">

              Redirecting to your orders...

            </p>

          </div>

        </div>

      )}

    </section>

  );
}

export default Checkout;