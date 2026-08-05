import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  ImagePlus,
  Save,
} from "lucide-react";

import {

  getProductById,

  updateProduct,

} from "../../services/productService";

import {

  showSuccess,

  showError,

} from "../../utils/toast";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [preview, setPreview] =
    useState("");

  const [formData, setFormData] =
    useState({

      name: "",

      description: "",

      category: "",

      price: "",

      stock: "",

      image: null,

    });

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    try {

      const product =
        await getProductById(id);

      setFormData({

        name: product.name,

        description:
          product.description,

        category:
          product.category,

        price:
          product.price,

        stock:
          product.stock,

        image: null,

      });

      setPreview(product.image);

    } catch (error) {

      console.log(error);

      showError("Product not found");

    }

  };

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setPreview(
      URL.createObjectURL(file)
    );

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.name)
      return showError(
        "Product name is required"
      );

    if (!formData.description)
      return showError(
        "Description is required"
      );

    if (!formData.category)
      return showError(
        "Category is required"
      );

    if (!formData.price)
      return showError(
        "Price is required"
      );

    if (!formData.stock)
      return showError(
        "Stock is required"
      );

    try {

      setLoading(true);

      const data =
        new FormData();

      data.append(
        "name",
        formData.name
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "stock",
        formData.stock
      );

      if (formData.image) {

        data.append(
          "image",
          formData.image
        );

      }

      await updateProduct(
        id,
        data
      );

      showSuccess(
        "Product Updated Successfully"
      );

      navigate("/admin/products");

    } catch (error) {

      console.log(error);

      showError(

        error.response?.data?.message ||

        "Failed to update product"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-5xl mx-auto">

      <button

        onClick={() => navigate(-1)}

        className="
        flex
        items-center
        gap-2
        mb-6
        "

      >

        <ArrowLeft size={18} />

        Back

      </button>

      <div
        className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        p-8
        shadow-sm
        "
      >

        <h1 className="text-3xl font-bold">

          Edit Product

        </h1>

        <form

          onSubmit={handleSubmit}

          className="mt-8 space-y-6"

        >

          <input

            name="name"

            value={formData.name}

            onChange={handleChange}

            placeholder="Product Name"

            className="w-full border rounded-xl p-4"

          />

          <textarea

            rows="5"

            name="description"

            value={formData.description}

            onChange={handleChange}

            placeholder="Description"

            className="w-full border rounded-xl p-4"

          />

          <select

            name="category"

            value={formData.category}

            onChange={handleChange}

            className="w-full border rounded-xl p-4"

          >

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

          <div className="grid grid-cols-2 gap-6">

            <input

              type="number"

              name="price"

              value={formData.price}

              onChange={handleChange}

              placeholder="Price"

              className="border rounded-xl p-4"

            />

            <input

              type="number"

              name="stock"

              value={formData.stock}

              onChange={handleChange}

              placeholder="Stock"

              className="border rounded-xl p-4"

            />

          </div>

          <label
            className="
            h-60
            border-2
            border-dashed
            rounded-2xl
            flex
            justify-center
            items-center
            cursor-pointer
            overflow-hidden
            "
          >

            {

              preview ? (

                <img

                  src={preview}

                  alt="Preview"

                  className="
                  h-full
                  object-contain
                  "

                />

              ) : (

                <div className="text-center">

                  <ImagePlus size={40} />

                  <p className="mt-3">

                    Change Product Image

                  </p>

                </div>

              )

            }

            <input

              hidden

              type="file"

              accept="image/*"

              onChange={handleImage}

            />

          </label>

          <button

            disabled={loading}

            className="
            bg-black
            text-white
            px-8
            py-4
            rounded-xl
            flex
            items-center
            gap-3
            "

          >

            <Save size={18} />

            {

              loading

                ? "Updating..."

                : "Update Product"

            }

          </button>

        </form>

      </div>

    </div>

  );

}

export default EditProduct;