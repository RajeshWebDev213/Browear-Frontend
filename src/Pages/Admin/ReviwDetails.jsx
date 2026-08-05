import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import Loader from "../../components/common/Loader";

import {

  getReviewById,

  adminDeleteReview,

} from "../../services/reviewService";

import {

  showSuccess,

  showError,

} from "../../utils/toast";

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

      setReview(data.review || data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchReview();

  }, []);

  const handleDelete = async () => {

    try {

      setDeleteLoading(true);

      await adminDeleteReview(reviewId);

      showSuccess(
        "Review Deleted Successfully"
      );

      navigate("/admin/reviews");

    } catch (error) {

      console.log(error);

      showError(

        error.response?.data?.message ||

        "Failed to delete review"

      );

    } finally {

      setDeleteLoading(false);

    }

  };

  if (loading) {

    return <Loader />;

  }

  return (

    <div className="space-y-6">

      <Link
        to="/admin/reviews"
        className="text-blue-600"
      >

        ← Back to Reviews

      </Link>

      <div className="bg-white rounded-2xl border p-8">

        <h1 className="text-3xl font-bold">

          Review Details

        </h1>

        <div className="space-y-4 mt-8">

          <p>

            <strong>Product:</strong>{" "}

            {review.product?.name}

          </p>

          <p>

            <strong>User:</strong>{" "}

            {review.user?.fullname}

          </p>

          <p>

            <strong>Rating:</strong>{" "}

            ⭐ {review.rating}/5

          </p>

          <p>

            <strong>Comment:</strong>

          </p>

          <div className="bg-gray-50 rounded-xl p-4">

            {review.comment}

          </div>

        </div>

        <button

          onClick={() =>
            setDeleteModal(true)
          }

          className="
          mt-8
          bg-red-600
          text-white
          px-6
          py-3
          rounded-xl
          "

        >

          Delete Review

        </button>

      </div>

      <DeleteReviewModal

        isOpen={deleteModal}

        loading={deleteLoading}

        onClose={() =>
          setDeleteModal(false)
        }

        onDelete={handleDelete}

      />

    </div>

  );

}

export default ReviewDetails;