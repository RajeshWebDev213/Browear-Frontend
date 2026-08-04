import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import ProductGrid from "../../components/Product/ProductGrid";
import { getProductReviews } from "../../services/reviewService";

import { getProductsByCategory } from "../../services/productService";
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import { getProductById } from "../../services/productService";

import ProductSkeleton from "../../components/Product/ProductSkeleton";

import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const { toggleWishlist, wishlist } =
    useWishlist();

  const [loading, setLoading] =
    useState(true);

  const [product, setProduct] =
    useState(null);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);
    const [reviews, setReviews] = useState([]);

const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {

    fetchProduct();

  }, [id]);

  const fetchProduct = async () => {

  try {

    setLoading(true);

    const data = await getProductById(id);

    const item = data.product || data;

    setProduct(item);

    setSelectedImage(
      item.images?.[0]?.url
    );

    /* Reviews */

    const reviewData =
      await getProductReviews(item._id);

    setReviews(
      reviewData.reviews || reviewData
    );

    /* Related */

    const related =
      await getProductsByCategory(
        item.category
      );

    const filtered =
      (related.products || related).filter(
        (p) => p._id !== item._id
      );

    setRelatedProducts(filtered);

  }

  catch (err) {

    console.log(err);

  }

  finally {

    setLoading(false);

  }

};

  if (loading) {

    return (

      <section className="max-w-7xl mx-auto px-5 py-10">

        <ProductSkeleton />

      </section>

    );

  }

  if (!product) {

    return (

      <section className="max-w-7xl mx-auto py-20 text-center">

        <h1 className="text-3xl font-bold">

          Product Not Found

        </h1>

      </section>

    );

  }

  const finalPrice =
    product.price -
    (product.price * (product.discount || 0)) /
      100;

  const isWishlisted = wishlist.some(

    (item) =>
      (item._id || item.id) ===
      (product._id || product.id)

  );

  return (

    <section className="max-w-7xl mx-auto px-5 py-10">

      <div className="grid lg:grid-cols-2 gap-14">

        {/* LEFT */}

        <div>

          {/* Main Image */}

          <div className="bg-gray-100 rounded-3xl overflow-hidden">

            <img

              src={selectedImage}

              alt={product.name}

              className="
              w-full
              h-[600px]
              object-cover
              hover:scale-105
              transition
              duration-500
              "

            />

          </div>

          {/* Thumbnails */}

          <div className="flex gap-4 mt-5 flex-wrap">

            {(product.images || []).map(

              (image, index) => (

                <button

                  key={index}

                  onClick={() =>
                    setSelectedImage(image.url)
                  }

                  className={`
                  w-24
                  h-24
                  rounded-2xl
                  overflow-hidden
                  border-2
    
            

              ${item.images?.[0]?.url 

                  ? "border-black"
                      : "border-gray-200"
              }
                  `}
                >

                  <img

                    src={image.url}

                    alt="thumbnail"

                    className="
                    w-full
                    h-full
                    object-cover
                    "

                  />

                </button>

              )

            )}

          </div>

        </div>
                {/* RIGHT */}

        <div className="flex flex-col">

          {/* Category */}

          <p className="uppercase tracking-widest text-sm text-gray-500">

            {product.category}

          </p>

          {/* Product Name */}

          <h1 className="text-4xl font-bold mt-3">

            {product.name}

          </h1>

          {/* Rating */}

          <div className="flex items-center gap-3 mt-5">

            <div className="flex items-center gap-1">

              <Star
                size={18}
                fill="gold"
                color="gold"
              />

              <span className="font-semibold">

                {product.averageRating || 0}

              </span>

            </div>

            <span className="text-gray-400">

              |

            </span>

            <span className="text-gray-500">

              150+ Reviews

            </span>

          </div>

          {/* Price */}

          <div className="flex items-center gap-4 mt-8">

            <h2 className="text-4xl font-bold">

              ₹{finalPrice.toFixed(0)}

            </h2>

            {product.discount > 0 && (

              <>
                <span className="line-through text-xl text-gray-400">

                  ₹{product.price}

                </span>

                <span className="bg-black text-white text-sm px-3 py-1 rounded-full">

                  {product.discount}% OFF

                </span>
              </>

            )}

          </div>

          {/* Description */}

          <p className="text-gray-600 leading-8 mt-8">

            {product.description}

          </p>

          {/* Quantity */}

          <div className="mt-10">

            <h3 className="font-semibold mb-4">

              Quantity

            </h3>

            <div className="flex items-center gap-4">

              <button

                onClick={() =>
                  setQuantity((prev) =>
                    Math.max(1, prev - 1)
                  )
                }

                className="
                w-12
                h-12
                rounded-xl
                border
                hover:bg-black
                hover:text-white
                transition
                "

              >

                -

              </button>

              <span className="text-xl font-semibold w-10 text-center">

                {quantity}

              </span>

              <button

                onClick={() =>
                  setQuantity((prev) => prev + 1)
                }

                className="
                w-12
                h-12
                rounded-xl
                border
                hover:bg-black
                hover:text-white
                transition
                "

              >

                +

              </button>

            </div>

          </div>

          {/* Buttons */}

          <div className="grid grid-cols-2 gap-5 mt-10">

            <button

              onClick={() =>
                toggleWishlist(product)
              }

              className="
              h-14
              rounded-2xl
              border
              flex
              items-center
              justify-center
              gap-3
              hover:bg-black
              hover:text-white
              transition
              "

            >

              <Heart

                size={22}

                fill={
                  isWishlisted
                    ? "currentColor"
                    : "none"
                }

              />

              Wishlist

            </button>

            <button

              onClick={() =>
                addToCart({
                  ...product,
                  quantity,
                })
              }

              className="
              h-14
              rounded-2xl
              bg-black
              text-white
              flex
              items-center
              justify-center
              gap-3
              hover:bg-zinc-900
              transition
              "

            >

              <ShoppingBag size={22} />

              Add To Cart

            </button>

          </div>

          {/* Buy Now */}

          <button

            onClick={() => {

              addToCart({
                ...product,
                quantity,
              });

              navigate("/checkout",{replace:true});

            }}

            className="
            h-14
            rounded-2xl
            bg-gray-900
            text-white
            mt-5
            hover:bg-black
            transition
            "

          >

            Buy Now

          </button>

          {/* Delivery */}

          <div className="mt-12 space-y-5 border-t pt-8">

            <div className="flex gap-4">

              <Truck />

              <div>

                <h4 className="font-semibold">

                  Free Delivery

                </h4>

                <p className="text-gray-500 text-sm">

                  Free shipping across India.

                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <RotateCcw />

              <div>

                <h4 className="font-semibold">

                  7-Day Return

                </h4>

                <p className="text-gray-500 text-sm">

                  Easy returns & exchanges.

                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <ShieldCheck />

              <div>

                <h4 className="font-semibold">

                  Secure Checkout

                </h4>

                <p className="text-gray-500 text-sm">

                  100% secure payment process.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
                {/* Specifications */}

          <div className="mt-12 border-t pt-8">

            <h2 className="text-2xl font-bold mb-6">
              Product Details
            </h2>

            <div className="grid grid-cols-2 gap-y-5">

              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-semibold mt-1">
                  {product.category}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Brand</p>
                <p className="font-semibold mt-1">
                  {product.brand}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Stock</p>
                <p className="font-semibold mt-1">
                  {product.stock > 0
    ? `${product.stock} in Stock`
    : "Out of Stock"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Discount</p>
                <p className="font-semibold mt-1">
                  {product.discount || 0}%
                </p>
              </div>

            </div>

          </div>

 

    

      {/* Reviews */}

        <section className="mt-20">

        <h2 className="text-3xl font-bold mb-8">

        Customer Reviews

        </h2>

        <div className="space-y-6">

        {reviews.length > 0 ? (

        reviews.map((review)=>(

        <div
        key={review._id}
        className="bg-white rounded-3xl border border-gray-100 p-6"
        >

        <div className="flex justify-between">

        <div>

        <h3 className="font-semibold">

        {review.user?.fullname || "User"}

        </h3>

        <div className="flex mt-2">

        {Array.from({
        length:Math.floor(review.rating),
        }).map((_,i)=>(

        <Star
        key={i}
        size={16}
        fill="gold"
        color="gold"
        />

        ))}

        </div>

        </div>

        <p className="text-gray-400">

        {new Date(
        review.createdAt
        ).toLocaleDateString()}

        </p>

        </div>

        <p className="mt-5 text-gray-600 leading-7">

        {review.comment}

        </p>

        </div>

        ))

        ) : (

        <p className="text-gray-500">

        No Reviews Yet.

        </p>

        )}

        </div>

        </section>

      {/* Related Products */}

      <section className="mt-24">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold">

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

      </section>

  );

}

export default ProductDetails;