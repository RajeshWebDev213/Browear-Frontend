import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Topwearitems } from "../Products/Topwearitems";
import { BottomwearItems } from "../Products/bottomwearitems";
import { FootwearItems } from "../Products/Footwearitems";
import { BestSeller } from "../Landing page/Bestseller";
import { Fiftyoff } from "../Landing page/fiftyoff";
import { TrendingItems } from "../Landing page/trending";
import { useCart } from "../Cart/CartContext";
import { AuthContext } from "../Header/AuthContext";
function ProductDetails() {
  const {clearCart, addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const sizes = ["S", "M", "L", "XL"];
  const [selected, setSelected] = useState("");
  const {user} = useContext(AuthContext);

  const allProducts = [
    ...FootwearItems,
    ...Topwearitems,
    ...BottomwearItems,
    ...BestSeller,
    ...TrendingItems,
     ...Fiftyoff
  ];

  const product = allProducts.find(
    (p) => String(p.id) === String(id)
  );

  const HandleBuyNow = () =>{
   if(!user){
    navigate("/Login",{state : {from : "buy"}})
   }
   else{
    clearCart();
    addToCart({...product, quantity : 1})
    navigate("/Checkout")
   }
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-xl font-semibold">
          Product not found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* IMAGE SECTION (FIXED FOR MOBILE) */}
        <div
          className="bg-gray-100 rounded-lg overflow-hidden
                     h-[320px] sm:h-[400px] md:h-[500px]
                     flex justify-center items-center"
        >
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* DETAILS SECTION */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-3">
            {product.description}
          </p>

          <div className="mt-4 space-y-1">
            <p>
              <span className="font-semibold">Discount:</span>{" "}
              {product.discount}%
            </p>
            <p>
              <span className="font-semibold">Fabric:</span>{" "}
              {product.fabric}
            </p>
            <p>
              <span className="font-semibold">Rating:</span>{" "}
              ★ {product.rating || 4.5}
            </p>
          </div>

          {/* SIZE SELECTION */}
          <div className="mt-6">
            <p className="text-lg font-medium mb-2">
              Select Size
            </p>

            <div className="flex gap-3 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelected(size)}
                  className={`px-4 py-2 border rounded-md transition ${
                    selected === size
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <p className="text-3xl font-bold mt-6">
            ₹{product.price}
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() =>
                addToCart({ ...product, size: selected })
              }
              className="w-full sm:w-48 h-12 bg-black text-white rounded-lg"
            >
              Add to Cart
            </button>

            <button onClick={HandleBuyNow}
              className="w-full sm:w-48 h-12 border border-black rounded-lg
                         hover:bg-black hover:text-white transition"
            >
              {user ?  "Buy Now" : "Login to buy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
