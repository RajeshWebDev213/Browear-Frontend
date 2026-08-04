import React from "react";

function FullScreenLoader() {
  return (
    <div
      className="
      fixed
      inset-0
      z-[9999]
      flex
      flex-col
      items-center
      justify-center
      bg-white
      overflow-hidden
      "
    >
      {/* Logo */}

      <div className="mb-10 animate-pulse">

        <h1
          className="
          text-5xl
          md:text-6xl
          font-extrabold
          tracking-[0.25em]
          text-black
          uppercase
          "
        >
          Browear
        </h1>

      </div>

      {/* Spinner */}

      <div
        className="
        relative
        w-16
        h-16
        "
      >

        <div
          className="
          absolute
          inset-0
          rounded-full
          border-[5px]
          border-gray-200
          "
        />

        <div
          className="
          absolute
          inset-0
          rounded-full
          border-[5px]
          border-transparent
          border-t-black
          animate-spin
          "
        />

      </div>

      {/* Loading Text */}

      <p
        className="
        mt-8
        text-gray-500
        tracking-[0.3em]
        uppercase
        text-sm
        animate-pulse
        "
      >
        Loading...
      </p>

      {/* Bottom Text */}

      <p
        className="
        absolute
        bottom-10
        text-xs
        text-gray-400
        tracking-widest
        "
      >
        PREMIUM MEN'S FASHION
      </p>

    </div>
  );
}

export default FullScreenLoader;