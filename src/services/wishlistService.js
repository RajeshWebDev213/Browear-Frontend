import api from "./api";

/*
=========================================
GET WISHLIST
=========================================
*/

export const getWishlist = async () => {

  const res = await api.get("/wishlist");

  return res.data;

};

/*
=========================================
GET WISHLIST COUNT
=========================================
*/

export const getWishlistCount = async () => {

  const res = await api.get("/wishlist/count");

  return res.data;

};

/*
=========================================
ADD TO WISHLIST
=========================================
*/

export const addToWishlist = async (
  productId
) => {

  const res = await api.post(
    `/wishlist/${productId}`
  );

  return res.data;

};

/*
=========================================
REMOVE FROM WISHLIST
=========================================
*/

export const removeFromWishlist = async (
  productId
) => {

  const res = await api.delete(
    `/wishlist/${productId}`
  );

  return res.data;

};

/*
=========================================
TOGGLE WISHLIST
=========================================
*/

export const toggleWishlist = async (product) => {

  const id =
    typeof product === "string"
      ? product
      : product._id || product.id;

  const res = await api.post(
    `/wishlist/toggle/${id}`
  );

  return res.data;

};