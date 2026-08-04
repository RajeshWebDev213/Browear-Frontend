import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";

export const useProducts = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const data = await getAllProducts();

      setProducts(data.products || data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchProducts();

  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};