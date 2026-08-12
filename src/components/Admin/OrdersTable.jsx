import { Link } from "react-router-dom";
import { Eye, PackageSearch } from "lucide-react";

function OrdersTable({ orders = [] }) {
  return (
    <div className="border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <div className="flex flex-col items-center py-20">
                    <PackageSearch size={44} className="text-gray-300" />
                    <h2 className="mt-4 text-base font-semibold text-gray-900">
                      No Orders Found
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Orders will appear here once placed.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="transition-colors hover:bg-gray-50"
                >
                  {/* Order ID */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{order._id.slice(-6)}
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4 text-gray-700">
                    {order.user?.fullname || "Deleted User"}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{order.totalPrice?.toFixed(2)}
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  {/* Order Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium ${
                        order.orderStatus === "Pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : order.orderStatus === "Confirmed"
                          ? "bg-blue-50 text-blue-700"
                          : order.orderStatus === "Shipped"
                          ? "bg-indigo-50 text-indigo-700"
                          : order.orderStatus === "Out for Delivery"
                          ? "bg-purple-50 text-purple-700"
                          : order.orderStatus === "Delivered"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <Link
                        to={`/admin/orders/${order._id}`}
                        className="flex h-8 w-8 items-center justify-center border border-gray-200 text-gray-500 transition-colors hover:border-black hover:text-black"
                      >
                        <Eye size={15} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTable;