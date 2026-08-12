import { Link } from "react-router-dom";
import { Pencil, Trash2, Package } from "lucide-react";

function ProductsTable({ products = [], onDelete }) {
  return (
    <div className="border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Stock
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="flex flex-col items-center py-20">
                    <Package size={44} className="text-gray-300" />
                    <h2 className="mt-4 text-base font-semibold text-gray-900">
                      No Products Found
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Try another search.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="transition-colors hover:bg-gray-50"
                >
                  {/* Image */}
                  <td className="px-6 py-4">
                    <img
                      src={product.images?.[0]?.url}
                      alt={product.name}
                      className="h-14 w-14 border border-gray-200 object-cover"
                    />
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {product.brand || "Browear"}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ₹{product.price}
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium ${
                        product.stock > 10
                          ? "bg-green-50 text-green-700"
                          : product.stock > 0
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="flex h-8 w-8 items-center justify-center border border-gray-200 text-gray-500 transition-colors hover:border-black hover:text-black"
                      >
                        <Pencil size={15} />
                      </Link>

                      <button
                        onClick={() => onDelete(product._id)}
                        className="flex h-8 w-8 items-center justify-center border border-gray-200 text-gray-500 transition-colors hover:border-red-500 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsTable;