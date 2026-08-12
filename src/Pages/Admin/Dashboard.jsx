import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { useEffect, useState } from "react";

import DashboardCard from "../../components/admin/DashboardCard";
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
  const [monthlySales, setMonthlySales] = useState([]);
  const [revenue, setRevenue] = useState(null);
  const [orderStatus, setOrderStatus] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const [overviewData, salesData, revenueData, statusData, ordersData, usersData] =
          await Promise.all([
            getDashboardOverview(),
            getMonthlySales(),
            getRevenueAnalytics(),
            getOrderStatusAnalytics(),
            getRecentOrders(),
            getRecentUsers(),
          ]);

        setOverview(overviewData.dashboard);
        setMonthlySales(salesData);
        setRevenue(revenueData);
        setOrderStatus(statusData.analytics);
        console.log("Orders Data:", ordersData.orders);
        setRecentOrders(ordersData.orders);
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
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-gray-200 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
            Overview
          </span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back 👋 Here's what's happening today.
          </p>
        </div>

        <div className="border border-gray-200 px-5 py-3">
          <p className="text-xs uppercase tracking-wide text-gray-400">Today</p>
          <h3 className="mt-0.5 text-sm font-semibold text-gray-900">
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h3>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Revenue"
          value={`₹${overview?.totalRevenue || 0}`}
          icon={DollarSign}
        />

        <DashboardCard
          title="Orders"
          value={overview?.totalOrders || 0}
          icon={ShoppingCart}
        />

        <DashboardCard
          title="Users"
          value={overview?.totalUsers || 0}
          icon={Users}
        />

        <DashboardCard
          title="Products"
          value={overview?.totalProducts || 0}
          icon={Package}
        />
      </div>

      {/* Order Status */}
      <div className="border border-gray-200 p-6">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
          Order Status
        </span>
        <div className="mt-5">
          <OrderStatusCard status={orderStatus} />
        </div>
      </div>

      {/* Revenue */}
      <RevenueCard
        totalRevenue={revenue?.totalRevenue || 0}
        averageOrderValue={revenue?.averageOrderValue || 0}
        growth={revenue?.growth || 0}
      />

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border border-gray-200 p-6">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
            Recent Orders
          </span>
          <div className="mt-5">
            <OrdersTable orders={recentOrders} />
          </div>
        </div>

        <div className="border border-gray-200 p-6">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
            Recent Users
          </span>
          <div className="mt-5">
            <UsersTable users={recentUsers} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;