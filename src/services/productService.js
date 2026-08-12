import api from "./api";



export const getAllProducts = async () => {
  const res = await api.get("/products?limit=1000");
  return res.data;
};



export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};



export const getProductsByCategory = async (category) => {
  const res = await api.get(`/products/category/${category}`);
  return res.data;
};



export const addProduct = async (formData) => {
  const res = await api.post(
    "/products",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};



export const updateProduct = async (
  id,
  formData
) => {
  const res = await api.put(
    `/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};


export const deleteProduct = async (id) => {
  const res = await api.delete(
    `/products/${id}`
  );

  return res.data;
};

// TRENDING PRODUCTS


export const getTrendingProducts = async () => {
  const res = await api.get(
    "/product/trending"
  );

  return res.data;
};



// 50% OFF PRODUCTS


export const getOfferProducts = async () => {
  const res = await api.get(
    "/product/offers"
  );

  return res.data;
};



// BEST SELLER PRODUCTS


export const getBestSellerProducts = async () => {
  const res = await api.get(
    "/product/bestseller"
  );

  return res.data;
};