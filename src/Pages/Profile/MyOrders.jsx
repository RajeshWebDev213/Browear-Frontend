import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  ShoppingBag,
  Eye,
} from "lucide-react";

import {
  getMyOrders,
} from "../../services/orderService";

import Loader from "../../components/common/Loader";

function MyOrders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const data =
        await getMyOrders();

      setOrders(
        data.orders || data
      );

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

    <div
      className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      p-8
      "
    >

      <div
        className="
        flex
        items-center
        gap-3
        mb-8
        "
      >

        <ShoppingBag size={28} />

        <h2 className="text-2xl font-bold">

          My Orders

        </h2>

      </div>

      {

        orders.length === 0 ? (

          <div
            className="
            text-center
            py-16
            "
          >

            <ShoppingBag
              size={60}
              className="
              mx-auto
              text-gray-300
              "
            />

            <h3
              className="
              mt-4
              text-xl
              font-semibold
              "
            >

              No Orders Yet

            </h3>

            <p className="text-gray-500">

              Start shopping to see your
              orders here.

            </p>

            <Link

              to="/products"

              className="
              inline-block
              mt-6
              bg-black
              text-white
              px-6
              py-3
              rounded-xl
              "

            >

              Shop Now

            </Link>

          </div>

        ) : (

          <div className="space-y-5">

            {

              orders.map((order) => (

                <div
                  key={order._id}
                  className="
                  border
                  rounded-2xl
                  p-6
                  "
                >

                  <div
                    className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-6
                    "
                  >

                    <div>

                      <p className="text-sm text-gray-500">

                        Order ID

                      </p>

                      <p className="font-semibold">

                        #{order._id.slice(-8)}

                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">

                        Date

                      </p>

                      <p>

                        {

                          new Date(
                            order.createdAt
                          ).toLocaleDateString()

                        }

                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">

                        Total

                      </p>

                      <p className="font-semibold">

                        ₹{order.totalAmount}

                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">

                        Payment

                      </p>

                      <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm

                        ${
                          order.paymentStatus ===
                          "Paid"

                          ?

                          "bg-green-100 text-green-700"

                          :

                          "bg-red-100 text-red-700"

                        }

                        `}
                      >

                        {order.paymentStatus}

                      </span>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">

                        Status

                      </p>

                      <span
                        className="
                        px-3
                        py-1
                        rounded-full
                        bg-blue-100
                        text-blue-700
                        text-sm
                        "
                      >

                        {order.orderStatus}

                      </span>

                    </div>

                    <Link

                      to={`/account/orders/${order._id}`}

                      className="
                      flex
                      items-center
                      gap-2
                      bg-black
                      text-white
                      px-5
                      py-3
                      rounded-xl
                      hover:bg-zinc-900
                      "

                    >

                      <Eye size={18} />

                      View

                    </Link>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default MyOrders;