import { Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";

function ReviewsTable({

  reviews = [],

}) {

  return (

    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left">

                Product

              </th>

              <th className="px-6 py-4 text-left">

                User

              </th>

              <th className="px-6 py-4 text-left">

                Rating

              </th>

              <th className="px-6 py-4 text-left">

                Review

              </th>

              <th className="px-6 py-4 text-center">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {

              reviews.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="py-16 text-center text-gray-500"
                  >

                    No Reviews Found

                  </td>

                </tr>

              ) : (

                reviews.map((review) => (

                  <tr
                    key={review._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      {review.product?.name}

                    </td>

                    <td className="px-6 py-4">

                      {review.user?.fullname}

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <Star
                          size={16}
                          className="text-yellow-500 fill-yellow-500"
                        />

                        {review.rating}

                      </div>

                    </td>

                    <td className="px-6 py-4">

                      {review.comment?.slice(0, 50)}...

                    </td>

                    <td className="px-6 py-4 text-center">

                      <Link

                        to={`/admin/reviews/${review._id}`}

                        className="
                        inline-flex
                        p-2
                        rounded-lg
                        bg-blue-100
                        hover:bg-blue-200
                        "

                      >

                        <Eye
                          size={18}
                          className="text-blue-600"
                        />

                      </Link>

                    </td>

                  </tr>

                ))

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ReviewsTable;