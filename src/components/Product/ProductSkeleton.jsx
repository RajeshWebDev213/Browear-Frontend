function ProductSkeleton() {
  return (
    <div
      className="
      bg-white
      rounded-xl
      border
      border-gray-100
      overflow-hidden
      "
    >
      {/* Image */}

      <div className="w-full h-80 skeleton"></div>

      {/* Content */}

      <div className="p-5">

        {/* Category */}

        <div className="w-24 h-3 rounded skeleton"></div>

        {/* Product Name */}

        <div className="mt-4 space-y-3">

          <div className="w-full h-4 rounded skeleton"></div>

          <div className="w-3/4 h-4 rounded skeleton"></div>

        </div>

        {/* Rating */}

        <div className="mt-5 flex items-center gap-2">

          <div className="w-5 h-5 rounded-full skeleton"></div>

          <div className="w-10 h-3 rounded skeleton"></div>

        </div>

        {/* Price */}

        <div className="mt-6 flex gap-3">

          <div className="w-20 h-6 rounded skeleton"></div>

          <div className="w-14 h-5 rounded skeleton"></div>

        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-3 mt-8">

          <div className="h-11 rounded-xl skeleton"></div>

          <div className="h-11 rounded-xl skeleton"></div>

        </div>

      </div>
    </div>
  );
}

export default ProductSkeleton;