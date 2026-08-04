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
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-10">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <SlidersHorizontal size={22} />

        <h2 className="text-2xl font-semibold">
          Filters
        </h2>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            w-full
            h-12
            rounded-xl
            border
            border-gray-200
            pl-11
            pr-4
            outline-none
            focus:border-black
            "
          />

        </div>

        {/* Category */}

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="
          h-12
          rounded-xl
          border
          border-gray-200
          px-4
          outline-none
          focus:border-black
          "
        >
          <option value="">
            All Categories
          </option>

          <option value="Topwear">
            Topwear
          </option>

          <option value="Bottomwear">
            Bottomwear
          </option>

          <option value="Footwear">
            Footwear
          </option>

        </select>

        {/* Minimum Price */}

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value)
          }
          className="
          h-12
          rounded-xl
          border
          border-gray-200
          px-4
          outline-none
          focus:border-black
          "
        />

        {/* Maximum Price */}

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value)
          }
          className="
          h-12
          rounded-xl
          border
          border-gray-200
          px-4
          outline-none
          focus:border-black
          "
        />

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="
          h-12
          rounded-xl
          border
          border-gray-200
          px-4
          outline-none
          focus:border-black
          "
        >
          <option value="">
            Sort By
          </option>

          <option value="lowToHigh">
            Price: Low → High
          </option>

          <option value="highToLow">
            Price: High → Low
          </option>

          <option value="rating">
            Highest Rated
          </option>

          <option value="discount">
            Highest Discount
          </option>

          <option value="newest">
            Newest
          </option>

        </select>

      </div>

      {/* Clear */}

      <div className="flex justify-end mt-6">

        <button
          onClick={clearFilters}
          className="
          flex
          items-center
          gap-2
          px-5
          py-3
          rounded-xl
          border
          hover:bg-black
          hover:text-white
          transition
          "
        >

          <RotateCcw size={18} />

          Clear Filters

        </button>

      </div>

    </div>
  );
}

export default ProductFilter;