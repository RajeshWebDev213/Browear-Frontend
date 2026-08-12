import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Eye } from "lucide-react";

import { getMyOrders } from "../../services/orderService";
import Loader from "../../components/common/Loader";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data.orders || data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="border border-gray-200 bg-white p-8">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-6">
        <ShoppingBag size={20} className="text-gray-400" />
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
          My Orders
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="py-16 text-center">
          <ShoppingBag size={40} className="mx-auto text-gray-300" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No Orders Yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Start shopping to see your orders here.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block bg-black px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="mt-6 divide-y divide-gray-100">
          {orders.map((order) => {
            const firstItem = order.orderItems[0];
            const arrivalDate = new Date(order.createdAt);
            arrivalDate.setDate(arrivalDate.getDate() + 5);

            return (
              <div key={order._id} className="py-6 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-6 lg:flex-row">
                  {/* Product Image */}
                  <img
                    src={firstItem.image}
                    alt={firstItem.name}
                    className="h-28 w-28 border border-gray-200 object-cover"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {firstItem.name}
                    </h2>

                    {order.orderItems.length > 1 && (
                      <p className="mt-0.5 text-sm text-gray-500">
                        +{order.orderItems.length - 1} more item(s)
                      </p>
                    )}

                    <p className="mt-2 text-sm text-gray-600">
                      Quantity: {firstItem.quantity}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      ₹{order.totalPrice.toFixed(2)}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium ${
                          order.orderStatus === "Delivered"
                            ? "bg-green-50 text-green-700"
                            : order.orderStatus === "Cancelled"
                            ? "bg-red-50 text-red-600"
                            : order.orderStatus === "Shipped"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {order.orderStatus}
                      </span>

                      <span
                        className={`px-2.5 py-1 text-xs font-medium ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-50 text-green-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-gray-500">
                      Ordered on{" "}
                      <span className="font-medium text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Expected Delivery{" "}
                      <span className="font-medium text-green-700">
                        {arrivalDate.toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col justify-between gap-3 lg:w-40">
                    <Link
                      to={`/account/orders/${order._id}`}
                      className="flex items-center justify-center gap-2 bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-zinc-800"
                    >
                      <Eye size={15} />
                      View Details
                    </Link>

                    <button className="border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                      Buy Again
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyOrders;