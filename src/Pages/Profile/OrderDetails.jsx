import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  Package,
  MapPin,
  CreditCard,
  ShoppingBag,
  Truck,
  Calendar,
  Check,
  Home,
  X,
} from "lucide-react";

import Loader from "../../components/common/Loader";

import { cancelOrder, getSingleOrder } from "../../services/orderService";
import { showSuccess, showError } from "../../utils/toast";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const data = await getSingleOrder(id);
      setOrder(data.order || data);
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
      <div className="flex flex-col items-center justify-center border border-gray-200 bg-white p-16 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center bg-gray-50">
          <Package size={26} className="text-gray-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Order Not Found</h2>
        <p className="mt-1.5 max-w-xs text-sm text-gray-500">
          We couldn't locate this order. It may have been removed or the link
          is incorrect.
        </p>
      </div>
    );
  }

  const isCancelled = order.orderStatus === "Cancelled";

  const statusColorMap = {
    Delivered: "text-emerald-600 bg-emerald-50 ring-emerald-600/20",
    Cancelled: "text-rose-600 bg-rose-50 ring-rose-600/20",
    Shipped: "text-blue-600 bg-blue-50 ring-blue-600/20",
    Processing: "text-amber-600 bg-amber-50 ring-amber-600/20",
  };

  const statusBadgeClass =
    statusColorMap[order.orderStatus] || "text-amber-600 bg-amber-50 ring-amber-600/20";

  const cancelReasons = [
    "Ordered by mistake",
    "Found a better price elsewhere",
    "Delivery is taking too long",
    "Want to change size",
    "Changed my mind",
    "Other",
  ];

  const handleCancelOrder = async () => {
    if (!reason) {
      return showError("Please select a reason.");
    }

    if (reason === "Other" && !customReason.trim()) {
      return showError("Please enter your reason.");
    }

    try {
      setCancelLoading(true);

      await cancelOrder(order._id, { reason, customReason });

      showSuccess("Order Cancelled Successfully");
      setShowCancelModal(false);
      fetchOrder();
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border border-gray-200 bg-white p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
              Order
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              #{order._id.slice(-8)}
            </h1>
            <div className="mt-2.5 flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar size={14} className="text-gray-400" />
              <span>
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold ring-1 ${statusBadgeClass}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {order.orderStatus}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="border border-gray-200 bg-white p-6">
          <div className="mb-5 flex h-10 w-10 items-center justify-center bg-blue-50">
            <Package size={18} className="text-blue-600" />
          </div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Order Status
          </p>
          <h3
            className={`mt-1.5 text-lg font-bold tracking-tight ${
              order.orderStatus === "Delivered"
                ? "text-emerald-600"
                : order.orderStatus === "Cancelled"
                ? "text-rose-600"
                : order.orderStatus === "Shipped"
                ? "text-blue-600"
                : "text-amber-600"
            }`}
          >
            {order.orderStatus}
          </h3>
        </div>

        <div className="border border-gray-200 bg-white p-6">
          <div className="mb-5 flex h-10 w-10 items-center justify-center bg-emerald-50">
            <CreditCard size={18} className="text-emerald-600" />
          </div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Payment
          </p>
          <h3
            className={`mt-1.5 text-lg font-bold tracking-tight ${
              order.paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-600"
            }`}
          >
            {order.paymentStatus}
          </h3>
          <p className="mt-1 text-xs text-gray-400">{order.paymentMethod}</p>
        </div>

        <div className="border border-gray-200 bg-white p-6">
          <div className="mb-5 flex h-10 w-10 items-center justify-center bg-violet-50">
            <CreditCard size={18} className="text-violet-600" />
          </div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Total Paid
          </p>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900">
            ₹{order.totalPrice.toFixed(2)}
          </h2>
        </div>

        <div className="border border-gray-200 bg-white p-6">
          <div className="mb-5 flex h-10 w-10 items-center justify-center bg-pink-50">
            <Truck size={18} className="text-pink-600" />
          </div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Expected Delivery
          </p>
          <h3 className="mt-1.5 font-bold tracking-tight text-gray-900">
            {new Date(
              new Date(order.createdAt).setDate(
                new Date(order.createdAt).getDate() + 5
              )
            ).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </h3>
        </div>
      </div>

      {/* Cancel Order */}
      {order.orderStatus !== "Shipped" &&
        order.orderStatus !== "Out for Delivery" &&
        order.orderStatus !== "Delivered" &&
        order.orderStatus !== "Cancelled" && (
          <div className="flex flex-col items-start justify-between gap-4 border border-gray-200 bg-white p-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Need to cancel this order?
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Orders can only be cancelled before they are shipped.
              </p>
            </div>

            <button
              onClick={() => setShowCancelModal(true)}
              className="bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-red-700"
            >
              Cancel Order
            </button>
          </div>
        )}

      {(order.orderStatus === "Shipped" ||
        order.orderStatus === "Out for Delivery" ||
        order.orderStatus === "Delivered") && (
        <div className="border border-orange-200 bg-orange-50 p-6">
          <h3 className="text-sm font-semibold text-orange-700">
            Cancellation Unavailable
          </h3>
          <p className="mt-2 text-sm text-orange-600">
            This order has already been {order.orderStatus.toLowerCase()} and
            can no longer be cancelled.
          </p>
        </div>
      )}

      {isCancelled && (
        <div className="border border-red-200 bg-red-50 p-6">
          <h3 className="text-lg font-bold text-red-700">Order Cancelled</h3>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Cancelled On
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {new Date(order.cancelledAt).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Reason
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {order.cancelReason}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Shipping */}
      <div className="border border-gray-200 bg-white p-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-blue-50">
            <MapPin size={17} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              Shipping Address
            </h2>
            <p className="text-xs text-gray-400">Delivery destination</p>
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Recipient
            </p>
            <h3 className="mt-1.5 text-sm font-semibold text-gray-900">
              {order.shippingAddress?.fullname}
            </h3>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Phone Number
            </p>
            <h3 className="mt-1.5 text-sm font-semibold text-gray-900">
              {order.shippingAddress?.phone}
            </h3>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Street Address
            </p>
            <h3 className="mt-1.5 text-sm font-semibold text-gray-900">
              {order.shippingAddress?.address}
            </h3>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">City</p>
            <h3 className="mt-1.5 text-sm font-semibold text-gray-900">
              {order.shippingAddress?.city}
            </h3>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">State</p>
            <h3 className="mt-1.5 text-sm font-semibold text-gray-900">
              {order.shippingAddress?.state}
            </h3>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Pincode
            </p>
            <h3 className="mt-1.5 text-sm font-semibold text-gray-900">
              {order.shippingAddress?.pincode}
            </h3>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Country
            </p>
            <h3 className="mt-1.5 text-sm font-semibold text-gray-900">
              {order.shippingAddress?.country}
            </h3>
          </div>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="border border-gray-200 bg-white p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
          Order Timeline
        </span>

        <div className="mt-6 space-y-8">
          <TimelineStep
            title="Order Placed"
            date={order.createdAt}
            active
            icon={<ShoppingBag size={16} />}
          />

          {isCancelled ? (
            <TimelineStep
              title="Order Cancelled"
              date={order.cancelledAt}
              active
              cancelled
              last
              icon={<X size={16} />}
            />
          ) : (
            <>
              <TimelineStep
                title="Confirmed"
                active={["Confirmed", "Shipped", "Out for Delivery", "Delivered"].includes(
                  order.orderStatus
                )}
                current={order.orderStatus === "Confirmed"}
                icon={<Package size={16} />}
              />

              <TimelineStep
                title="Shipped"
                active={["Shipped", "Out for Delivery", "Delivered"].includes(
                  order.orderStatus
                )}
                current={order.orderStatus === "Shipped"}
                icon={<Truck size={16} />}
              />

              <TimelineStep
                title="Out for Delivery"
                active={["Out for Delivery", "Delivered"].includes(order.orderStatus)}
                current={order.orderStatus === "Out for Delivery"}
                icon={<Truck size={16} />}
              />

              <TimelineStep
                title="Delivered"
                active={order.orderStatus === "Delivered"}
                current={order.orderStatus === "Delivered"}
                last
                icon={<Home size={16} />}
              />
            </>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="border border-gray-200 bg-white p-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-violet-50">
            <ShoppingBag size={17} className="text-violet-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              Ordered Products
            </h2>
            <p className="text-xs text-gray-400">
              {order.orderItems?.length || 0} item
              {order.orderItems?.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {order.orderItems?.map((item) => (
            <div key={`${item.product}-${item.size}`} className="py-6 first:pt-0 last:pb-0">
              <div className="flex flex-col gap-6 md:flex-row">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full border border-gray-200 object-cover md:h-28 md:w-28"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                    <p className="flex items-center gap-2">
                      Size
                      <span className="flex min-w-[26px] items-center justify-center bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-900">
                        {item.size}
                      </span>
                    </p>
                    <p>
                      Quantity
                      <span className="ml-1 font-semibold text-gray-900">
                        × {item.quantity}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
                    <p>
                      Price
                      <span className="ml-1 font-semibold text-gray-900">
                        ₹{item.price.toFixed(2)}
                      </span>
                    </p>
                    <p>
                      Subtotal
                      <span className="ml-1 font-bold text-gray-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-3 md:w-40 md:flex-col">
                  <Link
                    to={`/products/${item.product}`}
                    className="flex-1 bg-black px-5 py-2.5 text-center text-sm font-medium text-white transition-colors duration-300 hover:bg-zinc-800 md:flex-none"
                  >
                    View Product
                  </Link>

                  <Link
                    to={`/products/${item.product}`}
                    className="flex-1 border border-gray-300 px-5 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 md:flex-none"
                  >
                    Buy Again
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white p-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Cancel Order
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Why are you cancelling this order?
            </p>

            <div className="mt-6 space-y-2">
              {cancelReasons.map((item) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-center gap-3 border border-gray-200 p-3.5 text-sm transition-colors hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={item}
                    checked={reason === item}
                    onChange={(e) => setReason(e.target.value)}
                    className="accent-black"
                  />
                  <span className="text-gray-900">{item}</span>
                </label>
              ))}
            </div>

            {reason === "Other" && (
              <textarea
                rows={4}
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Tell us why..."
                className="mt-4 w-full resize-none border border-gray-300 p-4 text-sm outline-none transition-colors focus:border-black"
              />
            )}

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setReason("");
                  setCustomReason("");
                }}
                className="border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700"
              >
                Close
              </button>

              <button
                onClick={handleCancelOrder}
                disabled={cancelLoading}
                className="bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-700 disabled:opacity-60"
              >
                {cancelLoading ? "Cancelling..." : "Confirm Cancellation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TimelineStep({ title, date, active, current, cancelled, last, icon }) {
  return (
    <div className="flex gap-5">
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-9 w-9 items-center justify-center border-2 transition-all duration-300 ${
            cancelled
              ? "border-red-500 bg-red-500 text-white"
              : active
              ? "border-green-500 bg-green-500 text-white"
              : current
              ? "animate-pulse border-blue-600 bg-blue-600 text-white"
              : "border-gray-300 bg-white text-gray-400"
          }`}
        >
          {cancelled ? <X size={16} /> : active ? <Check size={16} /> : icon}
        </div>

        {!last && (
          <div
            className={`mt-1 w-px flex-1 ${
              active && !cancelled ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-10">
        <h3
          className={`text-base font-semibold ${
            cancelled
              ? "text-red-600"
              : active || current
              ? "text-gray-900"
              : "text-gray-400"
          }`}
        >
          {title}
        </h3>

        {date && (
          <p className="mt-1 text-sm text-gray-500">
            {new Date(date).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;