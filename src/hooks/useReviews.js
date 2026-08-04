import { useEffect, useState } from "react";
import { getProductReviews } from "../services/reviewService";

export const useReviews = (productId) => {

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchReviews = async () => {

    try {

      setLoading(true);

      const data = await getProductReviews(productId);

      setReviews(data.reviews || data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (productId) {

      fetchReviews();

    }

  }, [productId]);

  return {
    reviews,
    loading,
    error,
    refetch: fetchReviews,
  };
};