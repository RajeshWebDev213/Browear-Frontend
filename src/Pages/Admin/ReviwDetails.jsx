import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User, Mail, Package, Star, Calendar, Trash2, ArrowLeft } from "lucide-react";

import Loader from "../../components/common/Loader";
import { getReviewById, adminDeleteReview } from "../../services/reviewService";
import { showSuccess, showError } from "../../utils/toast";
import DeleteReviewModal from "../../components/Admin/DeleteReviewModel";

function ReviewDetails() {
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchReview = async () => {
    try {
      const data = await getReviewById(reviewId);
      console.log("Review Details:", data);
      setReview(data.review || data);
    } catch (error) {
      console.log("Review Details Error:", error);
      showError(error.response?.data?.message || "Failed to load review");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReview();
  }, [reviewId]);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await adminDeleteReview(reviewId);
      showSuccess("Review Deleted Successfully");
      navigate("/admin/reviews");
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to delete review");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!review) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <Star size={40} className="mb-4 text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-900">Review Not Found</h2>
        <p className="mt-2 text-sm text-gray-500">
          This review may have been deleted or does not exist.
        </p>

        <Link
          to="/admin/reviews"
          className="mt-6 inline-flex items-center gap-2 bg-black px-5 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800"
        >
          <ArrowLeft size={16} />
          Back to Reviews
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Back */}
      <Link
        to="/admin/reviews"
        className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
      >
        <ArrowLeft size={16} />
        Back to Reviews
      </Link>

      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
          Feedback
        </span>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Review Details
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View customer feedback and review information.
        </p>
      </div>

      {/* Main Review Card */}
      <div className="overflow-hidden border border-gray-200">
        {/* Product Header */}
        <div className="border-b border-gray-200 bg-gray-50 p-8">
          <div className="flex items-center gap-5">
            {review.product?.images?.[0]?.url ? (
              <img
                src={review.product.images[0].url}
                alt={review.product.name || "Product"}
                className="h-20 w-20 border border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center border border-gray-200 bg-white">
                <Package size={30} className="text-gray-400" />
              </div>
            )}

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Product
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-900">
                {review.product?.name || "Deleted Product"}
              </h2>
              <p className="mt-0.5 text-sm text-gray-500">
                {review.product?.brand || "Browear"}
              </p>
            </div>
          </div>
        </div>

        {/* Customer + Rating */}
        <div className="grid gap-6 border-b border-gray-200 p-8 md:grid-cols-2">
          {/* Customer */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Customer
            </p>

            <div className="mt-4 flex items-center gap-4">
              {review.user?.avatar?.url ? (
                <img
                  src={review.user.avatar.url}
                  alt={review.user.fullname || "User"}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <User size={22} className="text-gray-500" />
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {review.user?.fullname || "Deleted User"}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                  <Mail size={13} />
                  {review.user?.email || "-"}
                </div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Rating
            </p>
            <div className="mt-4 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={
                    star <= review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="ml-2 text-sm font-semibold text-gray-900">
                {review.rating}/5
              </span>
            </div>
          </div>
        </div>

        {/* Review Comment */}
        <div className="p-8">
          <div className="flex items-center gap-2">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Customer Review
            </h2>
          </div>

          <div className="mt-4 border border-gray-200 bg-gray-50 p-6">
            <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
              {review.comment || "No comment provided."}
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={14} />
            <span>
              Reviewed on{" "}
              {review.createdAt
                ? new Date(review.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border border-red-200 p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-500">
          Danger Zone
        </span>
        <p className="mt-2 text-sm text-gray-500">
          Deleting this review will permanently remove it from the product.
        </p>

        <button
          onClick={() => setDeleteModal(true)}
          disabled={deleteLoading}
          className="mt-5 inline-flex items-center gap-2 bg-red-600 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-red-700 disabled:opacity-50"
        >
          <Trash2 size={16} />
          Delete Review
        </button>
      </div>

      {/* Delete Modal */}
      <DeleteReviewModal
        isOpen={deleteModal}
        loading={deleteLoading}
        onClose={() => setDeleteModal(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default ReviewDetails;