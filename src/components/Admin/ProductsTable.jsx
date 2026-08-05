import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
} from "lucide-react";
import { Package } from "lucide-react";
function ProductsTable({

  products = [],

  onDelete,

}) {

  return (

    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      border
      border-gray-200
      overflow-hidden
      "
    >

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left">

                Image

              </th>

              <th className="px-6 py-4 text-left">

                Product

              </th>

              <th className="px-6 py-4 text-left">

                Category

              </th>

              <th className="px-6 py-4 text-left">

                Price

              </th>

              <th className="px-6 py-4 text-left">

                Stock

              </th>

              <th className="px-6 py-4 text-center">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {

              products.length === 0 ? (

                <tr>

          <div
  className="
  py-20
  flex
  flex-col
  items-center
  "
>

  <Package
    size={60}
    className="text-gray-300"
  />

  <h2
    className="
    mt-4
    text-xl
    font-semibold
    "
  >

    No Products Found

  </h2>

  <p className="text-gray-500">

    Try another search.

  </p>

</div>

                </tr>

              ) : (

                products.map((product) => (

                  <tr
                    key={product._id}
                    className="
                    border-t
                    hover:bg-gray-50
                    "
                  >

                    {/* Image */}

                    <td className="px-6 py-4">

                      <img

                        src={product.image}

                        alt={product.name}

                        className="
                        w-16
                        h-16
                        rounded-xl
                        object-cover
                        border
                        "

                      />

                    </td>

                    {/* Name */}

                    <td className="px-6 py-4">

                      <div>

                        <h3 className="font-semibold">

                          {product.name}

                        </h3>

                        <p className="text-sm text-gray-500">

                          {product.brand || "Browear"}

                        </p>

                      </div>

                    </td>

                    {/* Category */}

                    <td className="px-6 py-4">

                      <span
                        className="
                        px-3
                        py-1
                        rounded-full
                        bg-gray-100
                        text-sm
                        "
                      >

                        {product.category}

                      </span>

                    </td>

                    {/* Price */}

                    <td className="px-6 py-4 font-semibold">

                      ₹{product.price}

                    </td>

                    {/* Stock */}

                    <td className="px-6 py-4">

                      <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm

                        ${
                          product.stock > 10

                            ? "bg-green-100 text-green-700"

                            : product.stock > 0

                            ? "bg-yellow-100 text-yellow-700"

                            : "bg-red-100 text-red-700"

                        }
                        `}
                      >

                        {product.stock}

                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">

                      <div
                        className="
                        flex
                        justify-center
                        gap-3
                        "
                      >

                        <Link

                          to={`/admin/products/edit/${product._id}`}

                          className="
                          p-2
                          rounded-lg
                          bg-blue-100
                          hover:bg-blue-200
                          transition
                          "

                        >

                          <Pencil
                            size={18}
                            className="text-blue-600"
                          />

                        </Link>

                        <button

                          onClick={() =>
                            onDelete(product._id)
                          }

                          className="
                          p-2
                          rounded-lg
                          bg-red-100
                          hover:bg-red-200
                          transition
                          "

                        >

                          <Trash2
                            size={18}
                            className="text-red-600"
                          />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ProductsTable;