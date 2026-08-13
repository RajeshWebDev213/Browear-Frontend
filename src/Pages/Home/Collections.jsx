import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import topwear from "../../assets/images/topwear.jpg"
import bottomwear from "../../assets/images/bottomwear.jpg"
import footwear from "../../assets/images/footwear.jpg"

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
      <div className="mb-12 flex items-end justify-between border-b border-gray-200 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Curated Edit
          </span>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Shop by Collection
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm text-gray-500 md:block">
          Explore premium collections crafted for every occasion.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {collections.map((item, index) => (
          <Link
            key={item.id}
            to={item.path}
            className={`
              group relative block overflow-hidden bg-black
              ${index === 0 ? "md:mt-0" : "md:mt-0"}
            `}
          >
            {/* Image */}
            <div className="relative h-[28rem] w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-70"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          
            </div>

            {/* Text block */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {item.name}
                </h3>
                <span className="mt-1 inline-block h-px w-8 bg-white/50 transition-all duration-500 group-hover:w-16" />
                <p className="mt-2 text-sm text-white/70">
                  Explore Collection
                </p>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Collections;