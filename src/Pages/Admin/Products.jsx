import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import { Link } from "react-router-dom";

import ProductsTable from "../../components/admin/ProductsTable";

import Loader from "../../components/common/Loader";

import { getAllProducts } from "../../services/productService";

function Products() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const data = await getAllProducts();

      setProducts(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <Loader />;

  }

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

      <ProductsTable

        products={products}

        fetchProducts={fetchProducts}

      />

    </div>

  );

}

export default Products;