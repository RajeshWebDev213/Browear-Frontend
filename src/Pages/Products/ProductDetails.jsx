import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import ProductGrid from "../../components/Product/ProductGrid";
import { getProductReviews } from "../../services/reviewService";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { getProductsByCategory } from "../../services/productService";
import { showError, showSuccess } from "../../utils/toast";

import { AuthContext } from "../../context/AuthContext";
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { addReview, updateReview, deleteReview } from "../../services/reviewService";
import { getProductById } from "../../services/productService";

import ProductSkeleton from "../../components/Product/ProductSkeleton";

import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

function ProductDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, wishlist } = useWishlist();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  const inCart = cartItems.some(
    (item) =>
      (item.product?._id || item.product) === product?._id &&
      item.size === selectedSize
  );

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const data = await getProductById(id);
      const item = data.product || data;
      setProduct(item);
      setSelectedImage(item.images?.[0]?.url);

      /* Reviews */
      const reviewData = await getProductReviews(item._id);
      setReviews(reviewData.reviews || reviewData);

      /* Related */
      const related = await getProductsByCategory(item.category);
      const filtered = (related.products || related).filter(
        (p) => p._id !== item._id
      );
      setRelatedProducts(filtered);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const myReview = reviews.find((review) => review.user?._id === user?._id);

  const handleSubmitReview = async () => {
    if (!comment.trim()) {
      return showError("Please write your review.");
    }

    try {
      setReviewLoading(true);

      if (myReview) {
        await updateReview(myReview._id, { rating, comment });
        showSuccess("Review Updated Successfully");
      } else {
        await addReview(product._id, { rating, comment });
        showSuccess("Review Added Successfully");
      }

      const reviewData = await getProductReviews(product._id);
      setReviews(reviewData.reviews || []);

      const updated = await getProductById(product._id);
      setProduct(updated.product || updated);

      setShowReviewModal(false);
      setComment("");
      setRating(5);
    } catch (error) {
      showError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-10">
        <ProductSkeleton />
      </section>
    );
  }

  if (!product) {
    return (
      <section className="mx-auto max-w-7xl py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
      </section>
    );
  }

  const finalPrice = product.price - (product.price * (product.discount || 0)) / 100;

  const isWishlisted = wishlist.some(
    (item) => (item._id || item.id) === (product._id || product.id)
  );

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="grid gap-14 lg:grid-cols-2">
        {/* LEFT */}
        <div>
          {/* Main Image */}
          <div className="overflow-hidden bg-gray-50">
            <img
              src={selectedImage}
              alt={product.name}
              className="h-[600px] w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          <div className="mt-5 flex flex-wrap gap-3">
            {(product.images || []).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image.url)}
                className={`h-20 w-20 overflow-hidden border-2 transition-colors ${
                  selectedImage === image.url
                    ? "border-black"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img src={image.url} alt="thumbnail" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col">
          {/* Category */}
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            {product.category}
          </p>

          {/* Product Name */}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star size={16} fill="#0a0a0a" color="#0a0a0a" />
              <span className="font-semibold text-gray-900">
                {product.averageRating || 0}
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              {product.numReviews || 0}
              {product.numReviews === 1 ? " Review" : " Reviews"}
            </span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-900">
              ₹{finalPrice.toFixed(0)}
            </h2>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.price}
                </span>
                <span className="bg-black px-2.5 py-1 text-xs font-medium tracking-wide text-white">
                  −{product.discount}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 leading-7 text-gray-600">{product.description}</p>

          {/* Size */}
          <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
            Select Size
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {product?.sizes?.length > 0 ? (
              product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-11 w-11 items-center justify-center border text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-700 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500">Sizes not available</p>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
              Quantity
            </h3>

            <div className="mt-3 flex items-center gap-4">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-600 transition-colors hover:border-black hover:text-black"
              >
                <Minus size={15} />
              </button>

              <span className="w-6 text-center text-base font-semibold text-gray-900">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-600 transition-colors hover:border-black hover:text-black"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={() => toggleWishlist(product)}
              className="flex h-12 items-center justify-center gap-2 border border-gray-300 text-sm font-medium text-gray-900 transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
            >
              <Heart size={17} fill={isWishlisted ? "currentColor" : "none"} />
              Wishlist
            </button>

            <button
              onClick={async () => {
                if (!selectedSize) {
                  return showError("Please select a size.");
                }
                await addToCart(product._id, quantity, selectedSize);
              }}
              className="flex h-12 items-center justify-center gap-2 bg-black text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800"
            >
              <ShoppingBag size={17} />
              {inCart ? "Go to Cart" : "Add to Cart"}
            </button>
          </div>

          {/* Buy Now */}
          <button
            onClick={async () => {
              if (!isAuthenticated) {
                navigate("/login");
                return;
              }
              if (!selectedSize) {
                return showError("Please select a size.");
              }
              await addToCart(product._id, quantity, selectedSize);
              navigate("/checkout");
            }}
            className="mt-4 h-12 border border-black text-sm font-medium tracking-wide text-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            {isAuthenticated ? "Buy Now" : "Login to Buy"}
          </button>

          {/* Delivery */}
          <div className="mt-10 space-y-5 border-t border-gray-200 pt-8">
            <div className="flex gap-4">
              <Truck size={19} className="text-gray-400" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Free Delivery</h4>
                <p className="mt-0.5 text-xs text-gray-500">
                  Free shipping across India.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <RotateCcw size={19} className="text-gray-400" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">7-Day Return</h4>
                <p className="mt-0.5 text-xs text-gray-500">
                  Easy returns & exchanges.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <ShieldCheck size={19} className="text-gray-400" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Secure Checkout</h4>
                <p className="mt-0.5 text-xs text-gray-500">
                  100% secure payment process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-16 border-t border-gray-200 pt-10">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
          Product Details
        </span>

        <div className="mt-6 grid grid-cols-2 gap-y-6 md:grid-cols-4">
          <div>
            <p className="text-xs text-gray-400">Category</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {product.category}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Brand</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {product.brand}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Stock</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {product.stock > 0 ? `${product.stock} in Stock` : "Out of Stock"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Discount</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {product.discount || 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-20">
        <div className="mb-10 border border-gray-200 p-8">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
              Customer Reviews
            </span>

            {hasPurchased &&
              (myReview ? (
                <div className="flex items-center gap-3">
                  <span className="bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                    Your Review
                  </span>
                  <button
                    onClick={() => {
                      setRating(myReview.rating);
                      setComment(myReview.comment);
                      setShowReviewModal(true);
                    }}
                    className="bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-zinc-800"
                  >
                    Edit Review
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-zinc-800"
                >
                  Write Review
                </button>
              ))}
          </div>

          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-5xl font-bold text-gray-900">
                {Number(product.averageRating || 0).toFixed(1)}
              </h1>

              <div className="mt-3 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.round(product.averageRating) ? "#0a0a0a" : "none"}
                    color="#0a0a0a"
                  />
                ))}
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Based on {product.numReviews || 0} reviews
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="py-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {review.user?.fullname || "User"}
                    </h3>
                    <div className="mt-1.5 flex">
                      {Array.from({ length: Math.floor(review.rating) }).map((_, i) => (
                        <Star key={i} size={14} fill="#0a0a0a" color="#0a0a0a" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <p className="py-6 text-sm text-gray-500">No Reviews Yet.</p>
          )}
        </div>
      </section>

      {/* Related Products */}
      <section className="mt-24">
        <div className="mb-8 border-b border-gray-200 pb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            You May Also Like
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Related Products
          </h2>
        </div>

        <ProductGrid
          products={relatedProducts}
          loading={false}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />
      </section>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white p-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Write a Review
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Share your experience with this product.
                </p>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            {/* Rating */}
            <div className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                Your Rating
              </h3>
              <div className="mt-3 flex gap-2">
                {[...Array(5)].map((_, index) => (
                  <button key={index} type="button" onClick={() => setRating(index + 1)}>
                    <Star
                      size={30}
                      fill={index < rating ? "#0a0a0a" : "none"}
                      color="#0a0a0a"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                Your Review
              </h3>
              <textarea
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell others about the product..."
                className="mt-3 w-full resize-none border border-gray-300 p-4 text-sm outline-none transition-colors focus:border-black"
              />
            </div>

            {/* Buttons */}
            <div className="mt-8 flex items-center justify-between">
              {myReview && (
                <button
                  onClick={async () => {
                    if (!window.confirm("Delete your review?")) return;

                    try {
                      await deleteReview(myReview._id);
                      showSuccess("Review Deleted");

                      const reviewData = await getProductReviews(product._id);
                      setReviews(reviewData.reviews || []);

                      const updated = await getProductById(product._id);
                      setProduct(updated.product || updated);

                      setShowReviewModal(false);
                    } catch (error) {
                      showError(error.response?.data?.message || "Delete Failed");
                    }
                  }}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Delete Review
                </button>
              )}

              <div className="ml-auto flex gap-3">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmitReview}
                  disabled={reviewLoading}
                  className="bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-zinc-800 disabled:opacity-60"
                >
                  {reviewLoading
                    ? "Submitting..."
                    : myReview
                    ? "Update Review"
                    : "Submit Review"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetails;