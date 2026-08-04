import { Link } from "react-router-dom";

import topwear from "../../assets/images/topwear.jpeg";
import bottomwear from "../../assets/images/bottomwear.jpeg";
import footwear from "../../assets/images/footwear.jpeg";

const collections = [

  {
    id: 1,
    name: "Topwear",
    image: topwear,
    path: "/topwear",
  },

  {
    id: 2,
    name: "Bottomwear",
    image: bottomwear,
    path: "/bottomwear",
  },

  {
    id: 3,
    name: "Footwear",
    image: footwear,
    path: "/footwear",
  },

];

function Collections() {

  return (

    <section className="max-w-7xl mx-auto px-5 py-16">

      {/* Heading */}

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold">

          Shop by Collection

        </h2>

        <p className="text-gray-500 mt-3">

          Explore premium collections crafted for every occasion.

        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {collections.map((item) => (

          <Link

            key={item.id}

            to={item.path}

            className="group"

          >

            <div
              className="
              overflow-hidden
              rounded-3xl
              shadow-md
              bg-white
              hover:shadow-2xl
              transition-all
              duration-500
              "
            >

              <div className="overflow-hidden">

                <img

                  src={item.image}

                  alt={item.name}

                  className="
                  w-full
                  h-96
                  object-cover
                  group-hover:scale-110
                  transition-transform
                  duration-700
                  "

                />

              </div>

              <div className="p-6 text-center">

                <h3 className="text-2xl font-semibold">

                  {item.name}

                </h3>

                <p className="text-gray-500 mt-2">

                  Explore Collection

                </p>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>

  );

}

export default Collections;