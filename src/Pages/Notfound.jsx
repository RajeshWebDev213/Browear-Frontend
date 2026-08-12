import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Shirt, Footprints, ShoppingBag } from "lucide-react";

import brand from "../assets/logo/browear-1.png";

function NotFound() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-2xl text-center">

        {/* Logo */}

        <img
          src={brand}
          alt="Browear"
          className="w-20 mx-auto mb-10"
        />

        {/* Hanging tag signature element */}

        <div className="relative inline-block mb-8">

          <div className="mx-auto w-px h-8 bg-gray-300" />

          <div
            className="
            relative
            border-2
            border-black
            rounded-xl
            px-10
            py-8
            bg-white
            "
          >

            {/* tag hole */}

            <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-black" />

            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-1">
              Style Not Found
            </p>

            <h1 className="text-7xl sm:text-8xl font-black text-black leading-none tracking-tight">
              404
            </h1>

          </div>

        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-black">
          This page is out of stock.
        </h2>

        <p className="mt-3 text-gray-500 leading-relaxed max-w-md mx-auto">
          The page you're looking for was moved, renamed, or never
          existed. Try searching for what you need, or shop one of
          our collections below.
        </p>

        {/* Search bar — real ecommerce touch */}

        <form
          onSubmit={handleSearch}
          className="mt-8 flex items-center max-w-md mx-auto border border-gray-300 rounded-full overflow-hidden focus-within:border-black transition"
        >

          <Search size={18} className="ml-4 text-gray-400 shrink-0" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 py-3 text-sm outline-none"
          />

          <button
            type="submit"
            className="px-5 py-3 bg-black text-white text-sm font-medium hover:bg-zinc-900 transition"
          >
            Search
          </button>

        </form>

        {/* Category shortcuts */}

        <div className="mt-10 grid grid-cols-3 gap-3 max-w-md mx-auto">

          <Link
            to="/topwear"
            className="group flex flex-col items-center gap-2 py-5 rounded-xl border border-gray-200 hover:border-black hover:bg-black transition"
          >
            <Shirt size={20} className="text-black group-hover:text-white transition" />
            <span className="text-xs font-medium text-gray-600 group-hover:text-white transition">
              Topwear
            </span>
          </Link>

          <Link
            to="/bottomwear"
            className="group flex flex-col items-center gap-2 py-5 rounded-xl border border-gray-200 hover:border-black hover:bg-black transition"
          >
            <ShoppingBag size={20} className="text-black group-hover:text-white transition" />
            <span className="text-xs font-medium text-gray-600 group-hover:text-white transition">
              Bottomwear
            </span>
          </Link>

          <Link
            to="/footwear"
            className="group flex flex-col items-center gap-2 py-5 rounded-xl border border-gray-200 hover:border-black hover:bg-black transition"
          >
            <Footprints size={20} className="text-black group-hover:text-white transition" />
            <span className="text-xs font-medium text-gray-600 group-hover:text-white transition">
              Footwear
            </span>
          </Link>

        </div>

        {/* Back links */}

        <div className="mt-10 flex items-center justify-center gap-6 text-sm">

          <Link
            to="/"
            className="font-medium text-black underline underline-offset-4 hover:text-gray-600 transition"
          >
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1.5 text-gray-500 hover:text-black transition"
          >
            <ArrowLeft size={15} />
            Go Back
          </button>

        </div>

      </div>

    </div>
  );
}

export default NotFound;