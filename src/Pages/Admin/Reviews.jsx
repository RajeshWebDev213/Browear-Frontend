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

      setReviews(data.reviews || data);

    } catch (error) {

      console.log(error);

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

      <div>

        <h1 className="text-3xl font-bold">

          Reviews

        </h1>

        <p className="text-gray-500 mt-2">

          Manage customer reviews

        </p>

      </div>

      <ReviewsTable

        reviews={reviews}

      />

    </div>

  );

}

export default Reviews;