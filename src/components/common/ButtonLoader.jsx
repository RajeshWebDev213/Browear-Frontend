import React from "react";

function ButtonLoader({
  loading = false,
  children,
  className = "",
  type = "button",
  disabled = false,
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={`
        relative
        flex
        items-center
        justify-center
        gap-2
        w-full
        py-3
        px-6
        rounded-xl
        font-semibold
        transition-all
        duration-300
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading && (
        <span
          className="
          w-5
          h-5
          rounded-full
          border-2
          border-white/40
          border-t-white
          animate-spin
          "
        />
      )}

      <span>
        {loading ? "Please wait..." : children}
      </span>
    </button>
  );
}

export default ButtonLoader;