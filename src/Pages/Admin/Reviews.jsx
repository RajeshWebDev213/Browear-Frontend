import { useEffect, useState } from "react";

import Loader from "../../components/common/Loader";
import ReviewsTable from "../../components/admin/ReviewsTable";

import { getAllReviews } from "../../services/reviewService";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const data = await getAllReviews();

      console.log("========== REVIEWS DEBUG ==========");
      console.log("Full API response:", data);
      console.log("data.reviews:", data.reviews);
      console.log("Number of reviews:", data.reviews?.length);
      console.log("First review:", data.reviews?.[0]);
      console.log("First comment:", data.reviews?.[0]?.comment);
      console.log("===================================");

      setReviews(data.reviews || []);
    } catch (error) {
      console.log("REVIEWS API ERROR:", error);
      console.log("ERROR RESPONSE:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
          Feedback
        </span>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Reviews
        </h1>
        <p className="mt-1 text-sm text-gray-500">Manage customer reviews</p>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <ReviewsTable reviews={reviews} />
        </div>
      </div>
    </div>
  );
}

export default Reviews;