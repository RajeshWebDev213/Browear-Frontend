import { Eye } from "lucide-react";

function OrdersTable({ orders = [] }) {

  return (

    <div
      className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      shadow-sm
      p-6
      "
    >

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-semibold">

          Recent Orders

        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Order ID</th>

              <th className="text-left py-3">Customer</th>

              <th className="text-left py-3">Amount</th>

              <th className="text-left py-3">Payment</th>

              <th className="text-left py-3">Status</th>

              <th className="text-left py-3">Date</th>

              <th className="text-center py-3">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {

              orders.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="
                    text-center
                    py-10
                    text-gray-500
                    "
                  >

                    No Orders Found

                  </td>

                </tr>

              ) : (

                orders.map((order) => (

                  <tr
                    key={order._id}
                    className="
                    border-b
                    hover:bg-gray-50
                    "
                  >

                    <td className="py-4">

                      #{order._id.slice(-6)}

                    </td>

                    <td>

                      {order.user?.fullname}

                    </td>

                    <td>

                      ₹{order.totalAmount}

                    </td>

                    <td>

                      <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm

                        ${
                          order.paymentStatus === "Paid"

                            ? "bg-green-100 text-green-700"

                            : "bg-red-100 text-red-700"
                        }
                        `}
                      >

                        {order.paymentStatus}

                      </span>

                    </td>

                    <td>

                      <span
                        className="
                        bg-blue-100
                        text-blue-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        "
                      >

                        {order.orderStatus}

                      </span>

                    </td>

                    <td>

                      {

                        new Date(
                          order.createdAt
                        ).toLocaleDateString()

                      }

                    </td>

                    <td className="text-center">

                      <button
                        className="
                        p-2
                        rounded-lg
                        hover:bg-gray-100
                        "
                      >

                        <Eye size={18} />

                      </button>

                    </td>

                  </tr>

                ))

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default OrdersTable;