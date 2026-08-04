import React from "react";
import { CollectionImgs } from "./collection";
import { TrendingItems } from "./trending";
import { Fiftyoff } from "./fiftyoff";
import { BestSeller } from "./Bestseller";
import { Link } from "react-router-dom";

function Landingpage() {
  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* HERO */}
      <div className="w-full h-[200px] sm:h-[300px] md:h-[420px] my-6">
        <img
          src="/hero.png"
          alt="hero"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* COLLECTIONS */}
      <section className="text-center my-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Collections
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {CollectionImgs.map((item) => (
            <Link
              to={item.link}
              key={item.id}
              className="flex flex-col items-center gap-2"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover"
              />
              <p className="font-medium">{item.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <Section title="Trending Now" items={TrendingItems} path="trend" />

      {/* BEST SELLER */}
      <Section title="Best Seller" items={BestSeller} path="bestseller" />

      {/* 50% OFFER */}
      <Section title="50% Offer" items={Fiftyoff} path="fiftyoff" />
    </div>
  );
}

export default Landingpage;

/* 🔹 Reusable Section Component */
function Section({ title, items, path }) {
  return (
    <section className="my-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Link key={item.id} to={`/${path}/${item.id}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer">
              <div className="h-60 bg-gray-100 rounded-t-xl overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>

              <div className="p-4">
                <p className="font-semibold truncate">
                  {item.name}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-bold">
                    ₹{item.price}
                  </p>
                  <span className="text-sm text-green-600">
                    ★ {item.rating || 4.5}
                  </span>
                </div>

                <button className="mt-4 w-full border border-black py-2 rounded-lg hover:bg-black hover:text-white transition">
                  View Product
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
