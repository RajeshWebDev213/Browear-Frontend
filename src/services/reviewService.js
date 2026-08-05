import api from "./api";



/*
=========================================
GET PRODUCT REVIEWS
=========================================
*/

export const getProductReviews = async (
  productId
) => {

  const res = await api.get(
    `/reviews/${productId}`
  );

  return res.data;

};

/*
=========================================
ADD REVIEW
=========================================
*/

export const addReview = async (
  productId,
  reviewData
) => {

  const res = await api.post(
    `/reviews/${productId}`,
    reviewData
  );

  return res.data;

};

/*
=========================================
UPDATE REVIEW
=========================================
*/

export const updateReview = async (
  reviewId,
  reviewData
) => {

  const res = await api.put(
    `/reviews/${reviewId}`,
    reviewData
  );

  return res.data;

};

/*
=========================================
DELETE OWN REVIEW
=========================================
*/

export const deleteReview = async (
  reviewId
) => {

  const res = await api.delete(
    `/reviews/${reviewId}`
  );

  return res.data;

};

/*
=========================================
ADMIN DELETE REVIEW
=========================================
*/

export const adminDeleteReview = async (
  reviewId
) => {

  const res = await api.delete(
    `/reviews/admin/${reviewId}`
  );

  return res.data;

};

/*
=========================================
ADMIN GET ALL REVIEWS
=========================================
*/

export const getAllReviews = async () => {

  const res = await api.get(
    "/reviews/admin/all"
  );

  return res.data;

};

/*
=========================================
ADMIN GET SINGLE REVIEW
=========================================
*/

export const getReviewById = async (
  reviewId
) => {

  const res = await api.get(
    `/reviews/admin/${reviewId}`
  );

  return res.data;

};
/*
=========================================
GET REVIEW STATISTICS (ADMIN)
=========================================
*/

export const getReviewStats = async () => {

  const res = await api.get(
    "/reviews/admin/stats"
  );

  return res.data;

};