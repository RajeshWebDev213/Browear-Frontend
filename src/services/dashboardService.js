import api from "./api";

/*
=========================================
COMPLETE DASHBOARD
=========================================
*/

export const getDashboard = async () => {

  const res = await api.get(
    "/dashboard"
  );

  return res.data;

};

/*
=========================================
OVERVIEW
=========================================
*/

export const getDashboardOverview = async () => {

  const res = await api.get(
    "/dashboard/overview"
  );

  return res.data;

};

/*
=========================================
MONTHLY SALES ANALYTICS
=========================================
*/

export const getMonthlySalesAnalytics = async () => {

  const res = await api.get(
    "/dashboard/monthly-sales"
  );

  return res.data;

};

/*
=========================================
TOP SELLING PRODUCTS
=========================================
*/

export const getTopSellingProducts = async () => {

  const res = await api.get(
    "/dashboard/top-products"
  );

  return res.data;

};

/*
=========================================
RECENT ORDERS
=========================================
*/

export const getRecentOrders = async () => {

  const res = await api.get(
    "/dashboard/recent-orders"
  );

  return res.data;

};

/*
=========================================
REVENUE ANALYTICS
=========================================
*/

export const getRevenueAnalytics = async () => {

  const res = await api.get(
    "/dashboard/revenue"
  );

  return res.data;

};

/*
=========================================
LOW STOCK PRODUCTS
=========================================
*/

export const getLowStockProducts = async () => {

  const res = await api.get(
    "/dashboard/low-stock"
  );

  return res.data;

};

/*
=========================================
RECENT USERS
=========================================
*/

export const getRecentUsers = async () => {

  const res = await api.get(
    "/dashboard/recent-users"
  );

  return res.data;

};

/*
=========================================
ORDER STATUS ANALYTICS
=========================================
*/

export const getOrderStatusAnalytics = async () => {

  const res = await api.get(
    "/dashboard/order-status"
  );

  return res.data;

};

/*
=========================================
CATEGORY ANALYTICS
=========================================
*/

export const getCategoryAnalytics = async () => {

  const res = await api.get(
    "/dashboard/category-analytics"
  );

  return res.data;

};