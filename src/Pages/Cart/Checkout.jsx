import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Truck, CheckCircle2 } from "lucide-react";

import { CartContext } from "../../context/cartContext";
import { OrdersContext } from "../../context/orderContext";
import { useContext } from "react";
import emptyCart from "../../assets/images/cart.png";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, clearCart } = useContext(CartContext);
  const { placeOrder } = useContext(OrdersContext);

  const paymentMethod = "COD";

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [address, setAddress] = useState({
    fullname: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    country: "India",
  });

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.product?.price || 0) * (item.quantity || 1),
    0
  );

  const discount = cartItems.reduce(
    (sum, item) =>
      sum +
      (Number(item.product?.discount || 0) *
        Number(item.product?.price || 0) *
        (item.quantity || 1)) /
        100,
    0
  );

  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Number((subtotal * 0.18).toFixed(2));
  const finalAmount = subtotal - discount + tax + shipping;

  const handlePlaceOrder = async () => {
    console.log("Address:", address);
    if (
      !address.fullname ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      alert("Please fill all address details.");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullname: address.fullname,
          phone: address.phone,
          address: address.address,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: address.country,
          subtotal,
          discount,
          tax,
          shipping,
          totalAmount: finalAmount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      const newOrder = {
        id: Date.now(),
        items: cartItems,
        subtotal,
        discount,
        tax,
        shipping,
        amount: finalAmount,
        address,
        paymentMethod,
        date: new Date().toLocaleString(),
      };

      setOrderSuccess(true);
      setIsPlacingOrder(true);

      setTimeout(() => {
        placeOrder(newOrder);
        clearCart();

        navigate("/", {
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <img src={emptyCart} alt="Empty Cart" className="w-44" />

        <span className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Checkout
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Your cart is empty
        </h2>
        <p className="mt-3 text-sm text-gray-500">
          Add products before checkout.
        </p>

        <Link to="/">
          <button className="mt-8 bg-black px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  const inputClass =
    "border-b border-gray-300 bg-transparent py-2.5 text-[15px] text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-black";

  return (
    <section className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 border-b border-gray-200 pb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Step 2 of 2
          </span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            Checkout
          </h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* LEFT SECTION */}
          <div className="space-y-12 lg:col-span-2">
            {/* ORDER ITEMS */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                Order Summary
              </span>

              <div className="mt-4 divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product?._id}-${item.size}`}
                    className="flex items-center gap-5 py-5"
                  >
                    <img
                      src={
                        item.product?.images?.[0]?.url ||
                        "https://placehold.co/300x400"
                      }
                      alt={item.product?.name}
                      className="h-20 w-20 object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-[15px] font-medium text-gray-900">
                        {item.product?.name}
                      </h3>

                      <div className="mt-1.5 flex gap-4 text-xs text-gray-500">
                        <span>
                          Size{" "}
                          <span className="font-medium text-gray-900">
                            {item.size || "N/A"}
                          </span>
                        </span>
                        <span>
                          Qty{" "}
                          <span className="font-medium text-gray-900">
                            {item.quantity}
                          </span>
                        </span>
                      </div>
                    </div>

                    <span className="text-[15px] font-semibold text-gray-900">
                      ₹{(Number(item.product?.price) * item.quantity).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* DELIVERY ADDRESS */}
            <div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                  Delivery Address
                </span>
              </div>

              <div className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2">
                <input
                  placeholder="Full Name"
                  className={inputClass}
                  onChange={(e) =>
                    setAddress({ ...address, fullname: e.target.value })
                  }
                />

                <input
                  placeholder="Mobile Number"
                  className={inputClass}
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                />

                <input
                  placeholder="City"
                  className={inputClass}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />

                <input
                  placeholder="Pincode"
                  className={inputClass}
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                />

                <input
                  placeholder="State"
                  className={inputClass}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                />

                <textarea
                  rows="1"
                  placeholder="Full Address"
                  className={`${inputClass} resize-none md:col-span-2`}
                  onChange={(e) =>
                    setAddress({ ...address, address: e.target.value })
                  }
                />
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div>
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-gray-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                  Payment Method
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between border border-black px-5 py-4">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    checked
                    readOnly
                    className="h-4 w-4 accent-black"
                  />

                  <div>
                    <h3 className="text-[15px] font-medium text-gray-900">
                      Cash on Delivery
                    </h3>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Pay securely when your order arrives.
                    </p>
                  </div>
                </div>

                <Truck size={18} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                Price Details
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
                    −₹{discount.toFixed(0)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (18%)</span>
                  <span className="font-medium text-gray-900">
                    ₹{tax.toFixed(0)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery</span>
                  <span className="font-medium text-gray-900">
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{finalAmount.toFixed(0)}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-8 h-12 w-full bg-black text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center bg-black">
              <CheckCircle2 size={36} className="text-white" />
            </div>

            <h2 className="mt-8 text-3xl font-bold tracking-tight text-gray-900">
              Order placed successfully
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Thank you for shopping with Browear.
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Redirecting to your orders...
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Checkout;