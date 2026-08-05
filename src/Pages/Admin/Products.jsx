import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import { Link } from "react-router-dom";

import ProductsTable from "../../components/admin/ProductsTable";

import Loader from "../../components/common/Loader";

import { getAllProducts } from "../../services/productService";
import DeleteProductModal
from "../../components/admin/DeleteProductModal";

import {
  deleteProduct,
} from "../../services/productService";

import {
  showSuccess,
  showError,
} from "../../utils/toast";
function Products() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [deleteModal, setDeleteModal] =useState(false);
  const [selectedId, setSelectedId] =useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);


  const fetchProducts = async () => {

  try {

    setLoading(true);

    const data = await getAllProducts();

    setProducts(data.products || data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};

  useEffect(() => {

    fetchProducts();

  }, []);

const filteredProducts = products.filter((product) => {

  const matchesSearch =
    product.name
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesCategory =
    category === ""
      ? true
      : product.category === category;

  return matchesSearch && matchesCategory;

});

const lastIndex =
  currentPage * productsPerPage;

const firstIndex =
  lastIndex - productsPerPage;

const currentProducts =
  filteredProducts.slice(
    firstIndex,
    lastIndex
  );

const totalPages = Math.ceil(
  filteredProducts.length /
  productsPerPage
);

  if (loading) {

    return <Loader />;

  }
const handleDelete = async () => {

  try {

    setDeleteLoading(true);

  await deleteProduct(selectedId);

showSuccess("Product Deleted Successfully");

await fetchProducts();

setCurrentPage(1);

setDeleteModal(false);

setSelectedId(null);

  } catch (error) {

    console.log(error);

    showError(

      error.response?.data?.message ||

      "Failed to delete product"

    );

  } finally {

    setDeleteLoading(false);

  }

};
  return (

    <div className="space-y-6">

      <div
        className="
        flex
        items-center
        justify-between
        "
      >

        <div>

          <h1 className="text-3xl font-bold">

            Products

          </h1>

          <p className="text-gray-500 mt-1">

            Manage all products

          </p>

        </div>

        <Link
          to="/admin/products/add"
          className="
          bg-black
          text-white
          px-5
          py-3
          rounded-xl
          flex
          items-center
          gap-2
          hover:bg-zinc-900
          transition
          "
        >

          <Plus size={18} />

          Add Product

        </Link>

      </div>
<div className="flex gap-4 mb-6">

  <input
    type="text"
    placeholder="Search Products..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setCurrentPage(1);
    }}
    className="
      flex-1
      border
      border-gray-300
      rounded-xl
      px-4
      py-3
      outline-none
      focus:border-black
    "
  />

  <select
    value={category}
    onChange={(e) => {
      setCategory(e.target.value);
      setCurrentPage(1);
    }}
    className="
      w-60
      border
      border-gray-300
      rounded-xl
      px-4
      py-3
      outline-none
      focus:border-black
    "
  >

    <option value="">All Categories</option>

    <option value="Topwear">Topwear</option>

    <option value="Bottomwear">Bottomwear</option>

    <option value="Footwear">Footwear</option>

  </select>

</div>

<ProductsTable

  products={currentProducts}

  onDelete={(id) => {

    setSelectedId(id);

    setDeleteModal(true);

  }}

/>
{totalPages > 1 && (

  <div className="flex justify-center gap-2 mt-8">

    {[...Array(totalPages)].map((_, index) => (

      <button
        key={index}
        onClick={() =>
          setCurrentPage(index + 1)
        }
        className={`
          w-10
          h-10
          rounded-lg
          transition

          ${
            currentPage === index + 1
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }
        `}
      >

        {index + 1}

      </button>

    ))}

  </div>

)}
<DeleteProductModal

  isOpen={deleteModal}

  loading={deleteLoading}

  onClose={() => setDeleteModal(false)}

  onDelete={handleDelete}

/>
    </div>

  );

}

export default Products;