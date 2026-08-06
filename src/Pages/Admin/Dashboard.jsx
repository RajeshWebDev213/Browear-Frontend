import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";

import { useEffect, useState } from "react";

import DashboardCard from "../../components/admin/DashboardCard";
import SalesChart from "../../components/admin/SalesChart";
import RevenueCard from "../../components/admin/RevenueCard";
import OrderStatusCard from "../../components/Admin/OrderSatusCard";
import OrdersTable from "../../components/admin/OrdersTable";
import UsersTable from "../../components/admin/UsersTable";
import Loader from "../../components/common/Loader";

import {
  getDashboardOverview,
  getMonthlySales,
  getRevenueAnalytics,
  getOrderStatusAnalytics,
  getRecentOrders,
  getRecentUsers,
} from "../../services/dashboardService";
function Dashboard() {
const [overview, setOverview] = useState(null);

const [monthlySales, setMonthlySales] =
  useState([]);

const [revenue, setRevenue] =
  useState(null);

const [orderStatus, setOrderStatus] =
  useState({});

const [recentOrders, setRecentOrders] =
  useState([]);

const [recentUsers, setRecentUsers] =
  useState([]);

const [loading, setLoading] =
  useState(true);
  useEffect(() => {
  console.log("Admin Dashboard Loaded");
}, []);
useEffect(() => {

  const fetchDashboard = async () => {

    try {

      setLoading(true);

      const [

        overviewData,

        salesData,

        revenueData,

        statusData,

        ordersData,

        usersData,

      ] = await Promise.all([

        getDashboardOverview(),

        getMonthlySales(),

        getRevenueAnalytics(),

        getOrderStatusAnalytics(),

        getRecentOrders(),

        getRecentUsers(),

      ]);

      setOverview(overviewData);

      setMonthlySales(salesData);

      setRevenue(revenueData);

      setOrderStatus(statusData);

      setRecentOrders(ordersData);
console.log("Recent Users API:", usersData);
      setRecentUsers(usersData);

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

    {/* Overview Cards */}

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

    {/* Charts */}

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

        <h2 className="text-xl font-semibold mb-5">

          Monthly Sales

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
        p-6
        "
      >

        <h2 className="text-xl font-semibold mb-5">

          Order Status

        </h2>

        <OrderStatusCard
          status={orderStatus}
        />

      </div>

    </div>

    {/* Revenue */}

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

    {/* Bottom Section */}

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

        <h2 className="text-xl font-semibold mb-5">

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

        <h2 className="text-xl font-semibold mb-5">

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