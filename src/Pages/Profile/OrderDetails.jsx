import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  Package,
  MapPin,
  CreditCard,
} from "lucide-react";

import Loader from "../../components/common/Loader";

import {
  getSingleOrder,
} from "../../services/orderService";

function OrderDetails() {

  const { id } = useParams();

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchOrder();

  }, [id]);

  const fetchOrder = async () => {

    try {

      const data =
        await getSingleOrder(id);

      setOrder(
        data.order || data
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

  if (!order) {

    return (

      <div
        className="
        bg-white
        rounded-2xl
        p-8
        text-center
        "
      >

        Order Not Found

      </div>

    );

  }

  return (

    <div className="space-y-6">

      {/* Header */}

      <div
        className="
        bg-white
        rounded-2xl
        border
        p-6
        "
      >

        <h1 className="text-2xl font-bold">

          Order Details

        </h1>

        <p className="text-gray-500 mt-2">

          Order ID :
          #{order._id.slice(-8)}

        </p>

      </div>

      {/* Summary */}

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
        "
      >

        <div
          className="
          bg-white
          border
          rounded-2xl
          p-5
          "
        >

          <Package
            size={24}
            className="mb-3"
          />

          <p className="text-gray-500">

            Order Status

          </p>

          <h3 className="font-semibold mt-1">

            {order.orderStatus}

          </h3>

        </div>

        <div
          className="
          bg-white
          border
          rounded-2xl
          p-5
          "
        >

          <CreditCard
            size={24}
            className="mb-3"
          />

          <p className="text-gray-500">

            Payment

          </p>

          <h3 className="font-semibold mt-1">

            {order.paymentStatus}

          </h3>

        </div>

        <div
          className="
          bg-white
          border
          rounded-2xl
          p-5
          "
        >

          <Package
            size={24}
            className="mb-3"
          />

          <p className="text-gray-500">

            Total

          </p>

          <h3 className="font-semibold mt-1">

            ₹{order.totalAmount}

          </h3>

        </div>

      </div>

      {/* Shipping */}

      <div
        className="
        bg-white
        border
        rounded-2xl
        p-6
        "
      >

        <h2
          className="
          text-xl
          font-semibold
          mb-4
          flex
          items-center
          gap-2
          "
        >

          <MapPin size={22} />

          Shipping Address

        </h2>

        <div className="space-y-2">

          <p>

            {order.shippingAddress?.fullname}

          </p>

          <p>

            {order.shippingAddress?.phone}

          </p>

          <p>

            {

              order.shippingAddress?.address

            }

          </p>

          <p>

            {

              order.shippingAddress?.city

            },

            {

              order.shippingAddress?.state

            }

          </p>

          <p>

            {

              order.shippingAddress?.pincode

            }

          </p>

        </div>

      </div>

      {/* Products */}

      <div
        className="
        bg-white
        border
        rounded-2xl
        p-6
        "
      >

        <h2
          className="
          text-xl
          font-semibold
          mb-6
          "
        >

          Ordered Products

        </h2>

        <div className="space-y-5">

          {

            order.items?.map((item) => (

              <div

                key={item._id}

                className="
                flex
                gap-5
                items-center
                border-b
                pb-5
                "

              >

                <img

                  src={item.image}

                  alt={item.name}

                  className="
                  w-24
                  h-24
                  rounded-xl
                  object-cover
                  "

                />

                <div className="flex-1">

                  <h3 className="font-semibold">

                    {item.name}

                  </h3>

                  <p className="text-gray-500">

                    Qty :
                    {item.quantity}

                  </p>

                </div>

                <h3 className="font-bold">

                  ₹{item.price}

                </h3>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}

export default OrderDetails;