import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

function ProductFilter({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  clearFilters,
}) {
  const selectClass =
    "h-11 border-b border-gray-300 bg-transparent px-1 text-sm text-gray-900 outline-none transition-colors focus:border-black";

  return (
    <div className="mb-10 border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={17} className="text-gray-400" />
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
          Filters
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-5">
        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full border-b border-gray-300 bg-transparent pl-6 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-black"
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectClass}
        >
          <option value="">All Categories</option>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Footwear">Footwear</option>
        </select>

        {/* Minimum Price */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="h-11 border-b border-gray-300 bg-transparent px-1 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-black"
        />

        {/* Maximum Price */}
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="h-11 border-b border-gray-300 bg-transparent px-1 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-black"
        />

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={selectClass}
        >
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low → High</option>
          <option value="highToLow">Price: High → Low</option>
          <option value="rating">Highest Rated</option>
          <option value="discount">Highest Discount</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Clear */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
        >
          <RotateCcw size={15} />
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default ProductFilter;