import {
  Star,
  Eye,
  User,
  MessageSquareOff,
} from "lucide-react";

import { Link } from "react-router-dom";

function ReviewsTable({ reviews = [] }) {
  return (
    <div className="border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Review
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="flex flex-col items-center py-20">
                    <MessageSquareOff size={44} className="text-gray-300" />
                    <h2 className="mt-4 text-base font-semibold text-gray-900">
                      No Reviews Found
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Customer reviews will appear here.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr
                  key={review._id}
                  className="transition-colors hover:bg-gray-50"
                >
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {review.product?.images?.[0]?.url ? (
                        <img
                          src={review.product.images[0].url}
                          alt={review.product.name || "Product"}
                          className="h-12 w-12 border border-gray-200 object-cover shrink-0"
                        />
                      ) : (
                        <div className="h-12 w-12 border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
                          <Star size={18} className="text-gray-300" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                          {review.product?.name || "Deleted Product"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {review.product?.brand || "Browear"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {review.user?.avatar?.url ? (
                        <img
                          src={review.user.avatar.url}
                          alt={review.user.fullname || "User"}
                          className="h-9 w-9 border border-gray-200 object-cover shrink-0"
                        />
                      ) : (
                        <div className="h-9 w-9 border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
                          <User size={17} className="text-gray-400" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {review.user?.fullname || "Deleted User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {review.user?.email || "-"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={
                            star <= review.rating
                              ? "fill-black text-black"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {review.rating || 0}/5
                    </p>
                  </td>

                  {/* Review */}
                  <td className="px-6 py-4">
                    <p
                      className="max-w-[260px] truncate text-gray-700"
                      title={review.comment || ""}
                    >
                      {review.comment
                        ? review.comment.length > 50
                          ? `${review.comment.slice(0, 50)}...`
                          : review.comment
                        : "No comment"}
                    </p>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-500">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "-"}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <Link
                        to={`/admin/reviews/${review._id}`}
                        title="View Review"
                        className="flex h-8 w-8 items-center justify-center border border-gray-200 text-gray-500 transition-colors hover:border-black hover:text-black"
                      >
                        <Eye size={15} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewsTable;