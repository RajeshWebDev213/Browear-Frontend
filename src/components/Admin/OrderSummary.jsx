function OrderSummary({

  order,

  status,

  setStatus,

  handleStatusUpdate,

  saving,

}) {

  return (

    <div className="bg-white rounded-2xl border p-6">

      <h2 className="text-xl font-semibold mb-4">

        Order Summary

      </h2>

      <div className="space-y-4">

        <p>

          <strong>Order ID:</strong>{" "}

          {order._id}

        </p>

        <p>

          <strong>Total:</strong>{" "}

          ₹{order.totalAmount}

        </p>

        <p>

          <strong>Payment:</strong>{" "}

          {order.paymentStatus}

        </p>

        <div>

          <label className="block font-semibold mb-2">

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
            rounded-xl
            px-4
            py-3
            outline-none
            focus:border-black
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
          mt-2
          bg-black
          text-white
          py-3
          rounded-xl
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

    </div>

  );

}

export default OrderSummary;