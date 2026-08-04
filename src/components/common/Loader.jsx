import React from "react";

function Loader({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}) {

  const spinnerSize = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-[3px]",
    lg: "w-14 h-14 border-4",
    xl: "w-20 h-20 border-[5px]",
  };

  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-4
        ${
          fullScreen
            ? "fixed inset-0 z-50 bg-white"
            : "py-12"
        }
      `}
    >
      {/* Spinner */}

      <div
        className={`
          ${spinnerSize[size]}
          rounded-full
          border-gray-300
          border-t-black
          animate-spin
        `}
      ></div>

      {/* Text */}

      {text && (
        <p className="text-gray-600 text-sm font-medium tracking-wide">
          {text}
        </p>
      )}
    </div>
  );
}

export default Loader;