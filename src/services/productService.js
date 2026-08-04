import api from "./api";

/*
========================================
PRODUCT SERVICES
========================================
*/

// Get All Products
export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

// Get Single Product
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

// Get Products By Category
export const getProductsByCategory = async (category) => {
  const res = await api.get(`/products/category/${category}`);
  return res.data;
};

// Search Products
export const searchProducts = async (keyword) => {
  const res = await api.get(`/products/search`, {
    params: {
      keyword,
    },
  });

  return res.data;
};

// Get Featured Products
export const getFeaturedProducts = async () => {
  const res = await api.get("/products/featured");
  return res.data;
};

// Get Best Sellers
export const getBestSellerProducts = async () => {
  const res = await api.get("/products/bestseller");
  return res.data;
};

// Get Trending Products
export const getTrendingProducts = async () => {
  const res = await api.get("/products/trending");
  return res.data;
};

// Get Products On Sale
export const getOfferProducts = async () => {
  const res = await api.get("/products/offers");
  return res.data;
};