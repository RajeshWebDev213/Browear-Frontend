import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
} from "lucide-react";

import DashboardCard from "../../components/admin/DashboardCard";
import { useEffect, useState } from "react";

import {
  getDashboardOverview,
} from "../../services/dashboardService";
import SalesChart from "../../components/admin/SalesChart";

import {
  getMonthlySales,
} from "../../services/dashboardService";
import RevenueCard from "../../components/admin/RevenueCard";

import {
  getRevenueAnalytics,
} from "../../services/dashboardService";
import OrderStatusCard
from "../../components/admin/OrderStatusCard";

import {
  getOrderStatusAnalytics,
} from "../../services/dashboardService";
import OrdersTable
from "../../components/admin/OrdersTable";

import {
  getRecentOrders,
} from "../../services/dashboardService";

import UsersTable
from "../../components/admin/UsersTable";

import {
  getRecentUsers,
} from "../../services/dashboardService";

import Loader from "../../components/common/Loader";
function Dashboard() {
const [overview, setOverview] = useState(null);
const [revenue, setRevenue] =
useState(null);
const [recentOrders, setRecentOrders] =
useState([]);
const [loading, setLoading] =
useState(true);
const [recentUsers, setRecentUsers] =
useState([]);
const [monthlySales, setMonthlySales] =
useState([]);
const [orderStatus, setOrderStatus] =
useState({});
useEffect(() => {

  const fetchDashboard = async () => {

    try {

      const data =
        await getDashboardOverview();

      setOverview(data);
      const sales =
await getMonthlySales();

setMonthlySales(sales);
const revenueData =
await getRevenueAnalytics();

setRevenue(revenueData);
const status =
await getOrderStatusAnalytics();

setOrderStatus(status);
const orders =
await getRecentOrders();

setRecentOrders(orders);
const users =
await getRecentUsers();

setRecentUsers(users);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  fetchDashboard();

}, []);
if (loading) {

  return <Loader />;

}
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
  lg:grid-cols-2
  gap-6
  mt-6
  "
>

  <SalesChart
    data={monthlySales}
  />

  <OrderStatusCard
    status={orderStatus}
  />

</div>

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
         value={`₹${overview?.totalRevenue || 0}`}
          icon={DollarSign}
          color="bg-green-100"
          iconColor="text-green-600"
        />

        <DashboardCard
          title="Orders"
          value={overview?.totalOrders || 0}
          icon={ShoppingCart}
          color="bg-blue-100"
          iconColor="text-blue-600"
        />

        <DashboardCard
          title="Users"
          value={overview?.totalUsers || 0}
          icon={Users}
          color="bg-purple-100"
          iconColor="text-purple-600"
        />

        <DashboardCard
          title="Products"
          value={overview?.totalProducts || 0}
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

          
      

           <SalesChart
    data={monthlySales}
/>

        

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
<RevenueCard

  totalRevenue={
    revenue?.totalRevenue || 0
  }

  averageOrderValue={
    revenue?.averageOrderValue || 0
  }

  growth={
    revenue?.growth || 0
  }

/>

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

       <OrdersTable
    orders={recentOrders}
/>

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
<UsersTable
    users={recentUsers}
/>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;