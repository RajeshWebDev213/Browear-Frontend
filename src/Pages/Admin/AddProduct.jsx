import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getSizesByCategory } from "../../utils/productSizes";

import { ImagePlus, ArrowLeft, Save } from "lucide-react";

import { addProduct } from "../../services/productService";

import { showSuccess, showError } from "../../utils/toast";

function AddProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
    sizes: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) return showError("Product name is required");
    if (!formData.description) return showError("Description is required");
    if (!formData.category) return showError("Category is required");
    if (!formData.brand) return showError("Brand is required");
    if (!formData.price) return showError("Price is required");
    if (!formData.stock) return showError("Stock is required");
    if (formData.sizes.length === 0)
      return showError("Please select at least one size.");
    if (!formData.image) return showError("Image is required");

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("brand", formData.brand);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("sizes", JSON.stringify(formData.sizes));
      data.append("image", formData.image);

      await addProduct(data);

      showSuccess("Product Added Successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 p-3 text-sm text-gray-900 outline-none transition-colors focus:border-black sm:p-3.5";
  const labelClass = "mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500";

  return (
    <div className="mx-auto w-full max-w-5xl px-3 sm:px-5 lg:px-0">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Main Card */}
      <div className="border border-gray-200 p-4 sm:p-6 lg:p-8">
        {/* Heading */}
        <div className="border-b border-gray-100 pb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
            Inventory
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Add Product
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a new product to your store.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Product Name */}
          <div>
            <label className={labelClass}>Product Name</label>
            <input
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              rows={5}
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Category + Brand */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`${inputClass} bg-white`}
              >
                <option value="">Select Category</option>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Footwear">Footwear</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Brand</label>
              <input
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className={labelClass}>Available Sizes</label>

            {formData.category ? (
              <div className="flex flex-wrap gap-2">
                {getSizesByCategory(formData.category).map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => {
                      if (formData.sizes.includes(size)) {
                        setFormData({
                          ...formData,
                          sizes: formData.sizes.filter((s) => s !== size),
                        });
                      } else {
                        setFormData({
                          ...formData,
                          sizes: [...formData.sizes, size],
                        });
                      }
                    }}
                    className={`flex h-11 min-w-[44px] items-center justify-center border px-3 text-sm font-medium transition-colors ${
                      formData.sizes.includes(size)
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-gray-700 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                Select a category to choose sizes.
              </p>
            )}
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Price</label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Stock</label>
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className={inputClass}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className={labelClass}>Product Image</label>

            <label className="flex min-h-52 w-full cursor-pointer flex-col items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-black sm:h-64">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-52 max-w-full object-contain sm:max-h-60"
                />
              ) : (
                <>
                  <ImagePlus size={32} className="text-gray-300" />
                  <p className="mt-3 text-center text-sm text-gray-600">
                    Upload Product Image
                  </p>
                  <p className="mt-1 text-xs text-gray-400">PNG, JPG or WEBP</p>
                </>
              )}
              <input type="file" hidden accept="image/*" onChange={handleImage} />
            </label>
          </div>

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-black px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <Save size={16} />
              {loading ? "Saving..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;