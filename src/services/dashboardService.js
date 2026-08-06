import api from "./api";

// Complete Dashboard
export const getDashboard = async () => {
  const res = await api.get("/dashboard");
  return res.data;
};

// Overview
export const getDashboardOverview = async () => {
  const res = await api.get("/dashboard/overview");
  return res.data;
};

// Monthly Sales
export const getMonthlySales = async () => {
  const res = await api.get("/dashboard/monthly-sales");
  return res.data.monthlySales;
};

// Revenue
export const getRevenueAnalytics = async () => {
  const res = await api.get("/dashboard/revenue");
  return res.data;
};

// Top Products
export const getTopProducts = async () => {
  const res = await api.get("/dashboard/top-products");
  return res.data;
};

// Recent Orders
export const getRecentOrders = async () => {
  const res = await api.get("/dashboard/recent-orders");
  return res.data;
};

// Recent Users
export const getRecentUsers = async () => {
  const res = await api.get("/dashboard/recent-users");
  return res.data.users;
};

// Order Status
export const getOrderStatusAnalytics = async () => {
  const res = await api.get("/dashboard/order-status");
  return res.data;
};

// Low Stock
export const getLowStockProducts = async () => {
  const res = await api.get("/dashboard/low-stock");
  return res.data;
};

// Category Analytics
export const getCategoryAnalytics = async () => {
  const res = await api.get("/dashboard/category-analytics");
  return res.data;
};