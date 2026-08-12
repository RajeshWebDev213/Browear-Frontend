import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Loader from "../../components/common/Loader";

import { getAdminSingleOrder, updateOrderStatus } from "../../services/orderService";

import { showSuccess, showError } from "../../utils/toast";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchOrder = async () => {
    try {
      console.log("Order ID:", id);

      const data = await getAdminSingleOrder(id);
      console.log("API Response:", data);

      const currentOrder = data.order || data;
      setOrder(currentOrder);
      setStatus(currentOrder.orderStatus);
    } catch (error) {
      console.log("API ERROR:", error);
      console.log(error.response);
      showError("Failed to load order.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setSaving(true);
      await updateOrderStatus(order._id, status);
      showSuccess("Order Updated");
      await fetchOrder();
    } catch (error) {
      showError(error.response?.data?.message || "Update Failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-gray-500">Order not found.</p>
      </div>
    );
  }

  const cardClass = "border border-gray-200 p-4 sm:p-6 lg:p-8";
  const sectionLabelClass = "text-xs font-semibold uppercase tracking-[0.15em] text-gray-400";

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-3 sm:px-5 lg:px-0">
      {/* Back */}
      <Link
        to="/admin/orders"
        className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      {/* Order Header */}
      <div className={cardClass}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className={sectionLabelClass}>Order</span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order Details
            </h1>
          </div>
          <p className="break-all text-sm text-gray-500">
            #{order._id.slice(-8)}
          </p>
        </div>
      </div>

      {/* Customer */}
      <div className={cardClass}>
        <span className={sectionLabelClass}>Customer</span>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-400">Name</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {order.user?.fullname || "Deleted User"}
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-xs text-gray-400">Email</p>
            <p className="mt-1 break-all text-sm font-medium text-gray-900">
              {order.user?.email || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Ordered Products */}
      <div className={cardClass}>
        <span className={sectionLabelClass}>Ordered Products</span>

        <div className="mt-5 divide-y divide-gray-100">
          {order.orderItems?.map((item, index) => (
            <div
              key={item.product || index}
              className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 xs:flex-row sm:flex-row sm:gap-5"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-52 w-full shrink-0 border border-gray-100 object-cover xs:h-24 xs:w-24 sm:h-24 sm:w-24"
              />

              <div className="min-w-0 flex-1">
                <h3 className="break-words text-base font-medium text-gray-900 sm:text-lg">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment */}
      <div className={cardClass}>
        <span className={sectionLabelClass}>Payment</span>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-400">Payment Method</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {order.paymentMethod}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Payment Status</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {order.paymentStatus}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Total Amount</p>
            <p className="mt-1 text-lg font-bold text-gray-900">
              ₹{order.totalPrice}
            </p>
          </div>
        </div>
      </div>

      {/* Cancel Reason */}
      {order.orderStatus === "Cancelled" && (
        <div className="border border-red-200 bg-red-50 p-4 sm:p-6">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-500">
            Cancel Reason
          </span>
          <p className="mt-2 break-words text-sm text-red-600">
            {order.cancelReason || "No reason provided"}
          </p>
        </div>
      )}

      {/* Update Status */}
      <div className={cardClass}>
        <span className={sectionLabelClass}>Update Status</span>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none transition-colors focus:border-black sm:flex-1 sm:p-3.5"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="w-full bg-black px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {saving ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;