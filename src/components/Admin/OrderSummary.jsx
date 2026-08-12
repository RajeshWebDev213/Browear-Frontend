function OrderSummary({

  order,

  status,

  setStatus,

  handleStatusUpdate,

  saving,

}) {

  return (

    <div className="bg-white border border-gray-200 p-6">

      <h2 className="text-xs uppercase tracking-widest font-medium text-black mb-6">

        Order Summary

      </h2>

      <div className="divide-y divide-gray-100">

        <div className="flex justify-between py-3 text-sm">

          <span className="text-gray-500">Order ID</span>

          <span className="font-medium text-gray-900">
            #{order._id.slice(-6)}
          </span>

        </div>

        <div className="flex justify-between py-3 text-sm">

          <span className="text-gray-500">Total</span>

          <span className="font-semibold text-gray-900">
            ₹{order.totalAmount}
          </span>

        </div>

        <div className="flex justify-between items-center py-3 text-sm">

          <span className="text-gray-500">Payment</span>

          <span
            className={`px-2.5 py-1 text-xs font-medium ${
              order.paymentStatus === "Paid"
                ? "bg-green-50 text-green-700"
                : "bg-yellow-50 text-yellow-700"
            }`}
          >
            {order.paymentStatus}
          </span>

        </div>

      </div>

      <div className="mt-6">

        <label className="block text-xs uppercase tracking-widest font-medium text-black mb-3">

          Order Status

        </label>

        <select

          value={status}

          onChange={(e) =>
            setStatus(e.target.value)
          }

          className="
          w-full
          border
          border-gray-300
          px-4
          py-3
          text-sm
          outline-none
          focus:border-black
          transition
          "

        >

          <option value="Pending">

            Pending

          </option>

          <option value="Processing">

            Processing

          </option>

          <option value="Shipped">

            Shipped

          </option>

          <option value="Delivered">

            Delivered

          </option>

          <option value="Cancelled">

            Cancelled

          </option>

        </select>

      </div>

      <button

        onClick={handleStatusUpdate}

        disabled={saving}

        className="
        w-full
        mt-5
        bg-black
        text-white
        py-3.5
        text-sm
        uppercase
        tracking-widest
        font-medium
        hover:bg-zinc-900
        transition
        disabled:opacity-50
        "

      >

        {saving

          ? "Updating..."

          : "Update Status"}

      </button>

    </div>

  );

}

export default OrderSummary;