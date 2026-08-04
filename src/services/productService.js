import api from "./api";

/*
=========================================
GET ALL PRODUCTS
=========================================
*/

export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

/*
=========================================
GET SINGLE PRODUCT
=========================================
*/

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

/*
=========================================
GET PRODUCTS BY CATEGORY
=========================================
*/

export const getProductsByCategory = async (category) => {
  const res = await api.get(`/products/category/${category}`);
  return res.data;
};

/*
=========================================
ADD PRODUCT (ADMIN)
=========================================
*/

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

/*
=========================================
UPDATE PRODUCT (ADMIN)
=========================================
*/

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

/*
=========================================
DELETE PRODUCT (ADMIN)
=========================================
*/

export const deleteProduct = async (id) => {
  const res = await api.delete(
    `/products/${id}`
  );

  return res.data;
};