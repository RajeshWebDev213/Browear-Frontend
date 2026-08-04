import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

import brand from "../assets/logo/browear-1.png";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-6">

      <div
        className="
        w-full
        max-w-xl
        bg-white/90
        backdrop-blur-xl
        rounded-3xl
        shadow-2xl
        border
        border-gray-200
        p-10
        text-center
        "
      >

        {/* Logo */}

        <img
          src={brand}
          alt="Browear"
          className="w-24 mx-auto mb-6"
        />

        {/* 404 */}

        <h1 className="text-8xl font-black text-black">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500 leading-relaxed">
          Sorry, the page you're looking for doesn't exist,
          has been moved, or the URL is incorrect.
        </p>

        {/* Buttons */}

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/"
            className="
            flex
            items-center
            justify-center
            gap-2
            px-6
            py-3
            rounded-2xl
            bg-black
            text-white
            font-medium
            hover:bg-zinc-900
            transition
            "
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="
            flex
            items-center
            justify-center
            gap-2
            px-6
            py-3
            rounded-2xl
            border
            border-gray-300
            hover:bg-gray-100
            transition
            "
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

      </div>

    </div>
  );
}

export default NotFound;