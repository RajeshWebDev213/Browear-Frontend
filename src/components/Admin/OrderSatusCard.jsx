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
      value: status?.pending || 0,
      icon: Clock3,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },

    {
      title: "Processing",
      value: status?.processing || 0,
      icon: Package,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },

    {
      title: "Shipped",
      value: status?.shipped || 0,
      icon: Truck,
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },

    {
      title: "Delivered",
      value: status?.delivered || 0,
      icon: CheckCircle,
      bg: "bg-green-100",
      color: "text-green-600",
    },

    {
      title: "Cancelled",
      value: status?.cancelled || 0,
      icon: XCircle,
      bg: "bg-red-100",
      color: "text-red-600",
    },

  ];

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

      <h2 className="text-xl font-semibold mb-6">

        Order Status

      </h2>

      <div className="space-y-4">

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
                "
              >

                <div
                  className="
                  flex
                  items-center
                  gap-4
                  "
                >

                  <div
                    className={`
                    w-12
                    h-12
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    ${item.bg}
                    `}
                  >

                    <Icon
                      size={22}
                      className={item.color}
                    />

                  </div>

                  <span className="font-medium">

                    {item.title}

                  </span>

                </div>

                <span
                  className="
                  text-xl
                  font-bold
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