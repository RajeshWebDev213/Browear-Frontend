import api from "./api";



export const placeOrder = async (orderData) => {

  const res = await api.post(
    "/orders",
    orderData
  );

  return res.data;

};



export const getMyOrders = async () => {

  const res = await api.get(
    "/orders/my-orders"
  );

  return res.data;

};



export const getSingleOrder = async (
  orderId
) => {

  const res = await api.get(
    `/orders/${orderId}`
  );

  return res.data;

};
export const getAdminSingleOrder = async (orderId) => {

  const res = await api.get(
    `/orders/admin/${orderId}`
  );

  return res.data;

};



export const cancelOrder = async (
  orderId,
  data
) => {

  const res = await api.put(

    `/orders/${orderId}/cancel`,

    data

  );

  return res.data;

};



export const getAllOrders = async () => {

  const res = await api.get(
    "/orders/admin/all"
  );

  return res.data;

};



export const updateOrderStatus = async (
  orderId,
  orderStatus
) => {

  const res = await api.put(
    `/orders/admin/${orderId}/status`,
    {
      orderStatus,
    }
  );

  return res.data;

};


//ADMIN - ORDER STATISTICS


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