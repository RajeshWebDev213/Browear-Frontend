import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ArrowRight } from "lucide-react";

// import api from "../../services/api";

function BestSeller() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchBestSeller();

  }, []);

  const fetchBestSeller = async () => {

    try {

      const response = await api.get(
        "/product/bestseller"
      );

      setProducts(response.data.products);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <section className="max-w-7xl mx-auto px-5 py-16">

        <h2 className="text-4xl font-bold mb-8">

          Best Seller

        </h2>

        <p>Loading...</p>

      </section>

    );

  }

  return (

    <section className="max-w-7xl mx-auto px-5 py-16">

      {/* Heading */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <h2 className="text-4xl font-bold">

            Best Seller

          </h2>

          <p className="text-gray-500 mt-2">

            Our most loved products.

          </p>

        </div>

        <Link

          to="/products"

          className="flex items-center gap-2 font-medium hover:underline"

        >

          View All

          <ArrowRight size={18} />

        </Link>

      </div>

      {/* Products */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map((product) => (

          <Link

            key={product._id}

            to={`/product/${product._id}`}

          >

            <div
              className="
              bg-white
              rounded-3xl
              shadow-md
              overflow-hidden
              hover:shadow-xl
              transition-all
              duration-300
              group
              "
            >

              <div className="overflow-hidden">

                <img

                  src={product.images?.[0]?.url}

                  alt={product.name}

                  className="
                  w-full
                  h-80
                  object-cover
                  group-hover:scale-105
                  transition-transform
                  duration-500
                  "

                />

              </div>

              <div className="p-5">

                <h3 className="font-semibold text-lg truncate">

                  {product.name}

                </h3>

                <div className="flex items-center justify-between mt-3">

                  <span className="font-bold text-xl">

                    ₹{product.price}

                  </span>

                  <span className="text-yellow-500">

                    ⭐ {product.rating || 4.5}

                  </span>

                </div>

                {product.discount > 0 && (

                  <p className="text-green-600 mt-2">

                    {product.discount}% OFF

                  </p>

                )}

                <button
                  className="
                  w-full
                  mt-5
                  rounded-xl
                  border
                  border-black
                  py-3
                  hover:bg-black
                  hover:text-white
                  transition
                  "
                >

                  View Product

                </button>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>

  );

}

export default BestSeller;