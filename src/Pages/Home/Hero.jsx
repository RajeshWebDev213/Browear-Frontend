import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import hero from "../../assets/images/hero.png";

function Hero() {
  return (
    <section className="relative h-[480px] w-full overflow-hidden bg-black md:h-[640px]">
      {/* Background image */}
      <img
        src={hero}
        alt="Browear Hero"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-16 md:pb-24">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
          New Season Arrivals
        </span>

        <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
          Fashion that speaks before you do.
        </h1>

        <p className="mt-4 max-w-md text-sm text-white/70 md:text-base">
          Discover premium topwear, bottomwear, and footwear crafted for
          every occasion.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <Link
            to="/topwear"
            className="flex items-center gap-2 bg-white px-7 py-3 text-sm font-medium tracking-wide text-black transition-colors duration-300 hover:bg-gray-200"
          >
            Shop Now
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/collections"
            className="border border-white/40 px-7 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;