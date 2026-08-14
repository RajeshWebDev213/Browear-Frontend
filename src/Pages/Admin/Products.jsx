// Products.jsx (Pages/Admin) — fixed case
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import ProductsTable from "../../components/Admin/ProductsTable";
import Loader from "../../components/common/Loader";
import DeleteProductModal from "../../components/Admin/DeleteProductModal";

import { getAllProducts, deleteProduct } from "../../services/productService";
import { showSuccess, showError } from "../../utils/toast";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
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
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "" ? true : product.category === category;

    return matchesSearch && matchesCategory;
  });

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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
      showError(error.response?.data?.message || "Failed to delete product");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
            Inventory
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Products
          </h1>
          <p className="mt-1 text-sm text-gray-500">Manage all products</p>
        </div>

        <Link
          to="/admin/products/add"
          className="flex items-center gap-2 bg-black px-5 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-black"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-black sm:w-60"
        >
          <option value="">All Categories</option>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Footwear">Footwear</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <ProductsTable
            products={currentProducts}
            onDelete={(id) => {
              setSelectedId(id);
              setDeleteModal(true);
            }}
          />
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`flex h-9 w-9 items-center justify-center border text-sm font-medium transition-colors ${
                currentPage === index + 1
                  ? "border-black bg-black text-white"
                  : "border-gray-300 text-gray-600 hover:border-black hover:text-black"
              }`}
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