import api from "./api";

/*
=========================================
PLACE ORDER
=========================================
*/

export const placeOrder = async (orderData) => {

  const res = await api.post(
    "/orders",
    orderData
  );

  return res.data;

};

/*
=========================================
GET MY ORDERS
=========================================
*/

export const getMyOrders = async () => {

  const res = await api.get(
    "/orders/my-orders"
  );

  return res.data;

};

/*
=========================================
GET SINGLE ORDER
=========================================
*/

export const getSingleOrder = async (
  orderId
) => {

  const res = await api.get(
    `/orders/${orderId}`
  );

  return res.data;

};

/*
=========================================
CANCEL ORDER
=========================================
*/

export const cancelOrder = async (
  orderId
) => {

  const res = await api.put(
    `/orders/${orderId}/cancel`
  );

  return res.data;

};

/*
=========================================
ADMIN - GET ALL ORDERS
=========================================
*/

export const getAllOrders = async () => {

  const res = await api.get(
    "/orders/admin/all"
  );

  return res.data;

};

/*
=========================================
ADMIN - UPDATE ORDER STATUS
=========================================
*/

export const updateOrderStatus = async (
  orderId,
  status
) => {

  const res = await api.put(
    `/orders/admin/${orderId}/status`,
    {
      status,
    }
  );

  return res.data;

};

/*
=========================================
ADMIN - ORDER STATISTICS
=========================================
*/

export const getOrderStats = async () => {

  const res = await api.get(
    "/orders/admin/stats"
  );

  return res.data;

};
// Get Single Order

export const getOrderById = async (id) => {

  const res = await api.get(`/orders/${id}`);

  return res.data;

};