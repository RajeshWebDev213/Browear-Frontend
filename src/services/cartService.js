import api from "./api";

/*
=========================================
GET CART
=========================================
*/

export const getCart = async () => {

  const res = await api.get("/cart");

  return res.data;

};

/*
=========================================
GET CART COUNT
=========================================
*/

export const getCartCount = async () => {

  const res = await api.get("/cart/count");

  return res.data;

};

/*
=========================================
GET CART SUMMARY
=========================================
*/

export const getCartSummary = async () => {

  const res = await api.get("/cart/summary");

  return res.data;

};

/*
=========================================
ADD TO CART
=========================================
*/

export const addToCart = async (
  productId,
  quantity = 1
) => {

  const res = await api.post(
    `/cart/${productId}`,
    {
      quantity,
    }
  );

  return res.data;

};

/*
=========================================
UPDATE CART QUANTITY
=========================================
*/

export const updateCartQuantity = async (
  productId,
  quantity
) => {

  const res = await api.put(
    `/cart/${productId}`,
    {
      quantity,
    }
  );

  return res.data;

};

/*
=========================================
REMOVE FROM CART
=========================================
*/

export const removeFromCart = async (
  productId
) => {

  const res = await api.delete(
    `/cart/${productId}`
  );

  return res.data;

};

/*
=========================================
CLEAR CART
=========================================
*/

export const clearCart = async () => {

  const res = await api.delete("/cart");

  return res.data;

};

/*
=========================================
CHECKOUT VALIDATION
=========================================
*/

export const checkoutValidation = async () => {

  const res = await api.post(
    "/cart/checkout-validation"
  );

  return res.data;

};