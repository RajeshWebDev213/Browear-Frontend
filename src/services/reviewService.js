import api from "./api";

export const getProductReviews = async (
productId
)=>{

const res = await api.get(
`/reviews/${productId}`
);

return res.data;

};

export const addReview = async (
productId,
data
)=>{

const res = await api.post(
`/reviews/${productId}`,
data
);

return res.data;

};