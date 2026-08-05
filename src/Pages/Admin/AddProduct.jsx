import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ImagePlus,
  ArrowLeft,
  Save,
} from "lucide-react";

import {
  addProduct,
} from "../../services/productService";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

function AddProduct() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [preview, setPreview] =
    useState(null);

  const [formData, setFormData] =
    useState({

      name: "",

      description: "",

      category: "",

      price: "",

      stock: "",

      image: null,

    });

  const handleChange = (e) => {

    const { name, value } = e.target;

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

    if (!formData.name) {
      return showError(
        "Product name is required"
      );
    }

    if (!formData.description) {
      return showError(
        "Description is required"
      );
    }

    if (!formData.category) {
      return showError(
        "Category is required"
      );
    }

    if (!formData.price) {
      return showError(
        "Price is required"
      );
    }

    if (!formData.stock) {
      return showError(
        "Stock is required"
      );
    }

    if (!formData.image) {
      return showError(
        "Image is required"
      );
    }

    try {

      setLoading(true);

      const data = new FormData();

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

      data.append(
        "image",
        formData.image
      );

      await addProduct(data);

      showSuccess(
        "Product Added Successfully"
      );

      navigate("/admin/products");

    } catch (error) {

      console.log(error);

      showError(

        error.response?.data?.message ||

        "Failed to add product"

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
        text-gray-600
        hover:text-black
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
        shadow-sm
        p-8
        "
      >

        <h1 className="text-3xl font-bold">

          Add Product

        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <input

            name="name"

            placeholder="Product Name"

            value={formData.name}

            onChange={handleChange}

            className="w-full border rounded-xl p-4"

          />

          <textarea

            rows="5"

            name="description"

            placeholder="Description"

            value={formData.description}

            onChange={handleChange}

            className="w-full border rounded-xl p-4"

          />

          <select

            name="category"

            value={formData.category}

            onChange={handleChange}

            className="w-full border rounded-xl p-4"

          >

            <option value="">

              Select Category

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

          <div className="grid grid-cols-2 gap-6">

            <input

              type="number"

              name="price"

              placeholder="Price"

              value={formData.price}

              onChange={handleChange}

              className="border rounded-xl p-4"

            />

            <input

              type="number"

              name="stock"

              placeholder="Stock"

              value={formData.stock}

              onChange={handleChange}

              className="border rounded-xl p-4"

            />

          </div>

          <div>

            <label
              className="
              h-56
              border-2
              border-dashed
              rounded-2xl
              flex
              flex-col
              justify-center
              items-center
              cursor-pointer
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
                    rounded-xl
                    "

                  />

                ) : (

                  <>

                    <ImagePlus
                      size={40}
                    />

                    <p className="mt-3">

                      Upload Product Image

                    </p>

                  </>

                )

              }

              <input

                type="file"

                hidden

                accept="image/*"

                onChange={handleImage}

              />

            </label>

          </div>

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

                ? "Saving..."

                : "Add Product"

            }

          </button>

        </form>

      </div>

    </div>

  );

}

export default AddProduct;