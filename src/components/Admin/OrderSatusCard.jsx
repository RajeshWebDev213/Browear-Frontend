import {
  Clock3,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";

function OrderStatusCard({ status }) {

const items = [

  {
    title: "Pending",
    value: status?.Pending || 0,
    icon: Clock3,
  },

  {
    title: "Confirmed",
    value: status?.Confirmed || 0,
    icon: Package,
  },

  {
    title: "Shipped",
    value: status?.Shipped || 0,
    icon: Truck,
  },

  {
    title: "Out for Delivery",
    value: status?.["Out for Delivery"] || 0,
    icon: Truck,
  },

  {
    title: "Delivered",
    value: status?.Delivered || 0,
    icon: CheckCircle,
  },

  {
    title: "Cancelled",
    value: status?.Cancelled || 0,
    icon: XCircle,
  },

];

  return (

    <div
      className="
      bg-white
      border
      border-gray-200
      p-6
      "
    >

      <h2 className="text-xs uppercase tracking-widest font-medium text-black mb-6">

        Order Status

      </h2>

      <div className="divide-y divide-gray-100">

        {

          items.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="
                flex
                justify-between
                items-center
                py-3.5
                "
              >

                <div
                  className="
                  flex
                  items-center
                  gap-3
                  "
                >

                  <div
                    className="
                    w-10
                    h-10
                    border
                    border-gray-200
                    flex
                    items-center
                    justify-center
                    "
                  >

                    <Icon
                      size={17}
                      className="text-black"
                    />

                  </div>

                  <span className="text-sm text-gray-700">

                    {item.title}

                  </span>

                </div>

                <span
                  className="
                  text-lg
                  font-semibold
                  text-black
                  "
                >

                  {item.value}

                </span>

              </div>

            );

          })

        }

      </div>

    </div>

  );

}

export default OrderStatusCard;