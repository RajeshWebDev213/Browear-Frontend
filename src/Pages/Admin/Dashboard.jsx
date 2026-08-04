import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
} from "lucide-react";

import DashboardCard from "../../components/admin/DashboardCard";

function Dashboard() {

  return (

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">

          Dashboard

        </h1>

        <p className="text-gray-500 mt-2">

          Welcome back, Admin 👋

        </p>

      </div>

      {/* Cards */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
        "
      >

        <DashboardCard
          title="Revenue"
          value="₹0"
          icon={DollarSign}
          color="bg-green-100"
          iconColor="text-green-600"
        />

        <DashboardCard
          title="Orders"
          value="0"
          icon={ShoppingCart}
          color="bg-blue-100"
          iconColor="text-blue-600"
        />

        <DashboardCard
          title="Users"
          value="0"
          icon={Users}
          color="bg-purple-100"
          iconColor="text-purple-600"
        />

        <DashboardCard
          title="Products"
          value="0"
          icon={Package}
          color="bg-orange-100"
          iconColor="text-orange-600"
        />

      </div>

      {/* Analytics */}

      <div
        className="
        grid
        lg:grid-cols-2
        gap-6
        "
      >

        <div
          className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-gray-200
          h-96
          p-6
          "
        >

          <h2 className="text-xl font-semibold">

            Sales Analytics

          </h2>

          <div
            className="
            h-full
            flex
            items-center
            justify-center
            text-gray-400
            "
          >

            Chart Coming Soon

          </div>

        </div>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-gray-200
          h-96
          p-6
          "
        >

          <h2 className="text-xl font-semibold">

            Revenue Growth

          </h2>

          <div
            className="
            h-full
            flex
            items-center
            justify-center
            text-gray-400
            "
          >

            Chart Coming Soon

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div
        className="
        grid
        lg:grid-cols-2
        gap-6
        "
      >

        <div
          className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-gray-200
          p-6
          "
        >

          <h2 className="font-semibold text-lg">

            Recent Orders

          </h2>

          <div
            className="
            h-48
            flex
            items-center
            justify-center
            text-gray-400
            "
          >

            No Orders

          </div>

        </div>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-gray-200
          p-6
          "
        >

          <h2 className="font-semibold text-lg">

            Recent Users

          </h2>

          <div
            className="
            h-48
            flex
            items-center
            justify-center
            text-gray-400
            "
          >

            No Users

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;