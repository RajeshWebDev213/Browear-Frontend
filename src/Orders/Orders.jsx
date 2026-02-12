import React from "react";
import { useOrders } from "./OrdersContext";
import { Link } from "react-router-dom";

const Orders = () => {
  const { orders } = useOrders();
   
  // EMPTY STATE
  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <img
          src="/order.png"
          alt="No orders"
          className="w-32 sm:w-48 mb-4 opacity-80"
        />
        <h2 className="text-lg sm:text-xl font-semibold mb-1">
          No orders yet
        </h2>
        <p className="text-sm text-gray-500">
          Your placed orders will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6">
      <div className="max-w-5xl mx-auto px-2 sm:px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          My Orders
        </h2>

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4"
          >
            {/* ORDER HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm text-gray-500 mb-3 gap-1">
              <span className="truncate">
                Order ID: #{order.id}
              </span>
              <span>{order.date}</span>
            </div>

            {/* ORDER ITEMS */}
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-3"
              >
                {/* PRODUCT IMAGE */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover"
                />

                {/* PRODUCT DETAILS */}
                <div className="flex-1 w-full">
                  <p className="font-medium text-sm break-words">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                {/* PRICE */}
                <p className="font-semibold text-sm sm:ml-auto">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}

            <hr className="my-3" />

            {/* TOTAL */}
            <div className="flex justify-between font-semibold text-sm">
              <span>Total</span>
              <span>₹{order.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
