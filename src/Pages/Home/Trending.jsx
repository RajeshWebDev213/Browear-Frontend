import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
// import api from "../../services/api";

function Trending() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchTrending();

  }, []);

  const fetchTrending = async () => {

    try {

      const response = await api.get(
        "/product/trending"
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

          Trending Now

        </h2>

        <p>Loading...</p>

      </section>

    );

  }

  return (

    <section className="max-w-7xl mx-auto px-5 py-16">

      {/* Heading */}

      <div className="flex justify-between items-center mb-10">

        <div>

          <h2 className="text-4xl font-bold">

            Trending Now

          </h2>

          <p className="text-gray-500 mt-2">

            Discover what's popular among our customers.

          </p>

        </div>

        <Link
          to="/products"
          className="flex items-center gap-2 hover:underline"
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
              overflow-hidden
              shadow-md
              hover:shadow-xl
              transition-all
              duration-300
              group
              "
            >

              <div className="relative overflow-hidden">

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

                <span
                  className="
                  absolute
                  top-4
                  left-4
                  bg-black
                  text-white
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  "
                >

                  Trending

                </span>

              </div>

              <div className="p-5">

                <h3 className="text-lg font-semibold truncate">

                  {product.name}

                </h3>

                <div className="flex justify-between items-center mt-3">

                  <span className="text-xl font-bold">

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
                  py-3
                  rounded-xl
                  border
                  border-black
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

export default Trending;