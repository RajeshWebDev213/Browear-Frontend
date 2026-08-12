import api from "./api";



export const getCart = async () => {

  const res = await api.get("/cart");

  return res.data;

};



export const getCartCount = async () => {

  const res = await api.get("/cart/count");

  return res.data;

};



export const getCartSummary = async () => {

  const res = await api.get("/cart/summary");

  return res.data;

};



export const addToCart = async (
  productId,
  quantity = 1,
  size
) => {

  const res = await api.post(
    `/cart/${productId}`,
    {
      quantity,
      size,
    }
  );

  return res.data;

};



export const updateCartQuantity = async (
  productId,
  quantity,
  size
) => {

  const res = await api.put(
    `/cart/${productId}`,
    {
      quantity,
      size,
    }
  );

  return res.data;

};



export const removeFromCart = async (
  productId,
  size
) => {

  const res = await api.delete(
    `/cart/${productId}`,
    {
      data: {
        size,
      },
    }
  );

  return res.data;

};



export const clearCart = async () => {

  const res = await api.delete("/cart");

  return res.data;

};



export const checkoutValidation = async () => {

  const res = await api.post(
    "/cart/checkout-validation"
  );

  return res.data;

};