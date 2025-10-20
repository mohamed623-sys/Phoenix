import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-white relative z-10">
      <h1 className="text-5xl font-extrabold mb-6">Welcome to Phoenix Store 🌌</h1>
      <p className="text-gray-300 mb-6 text-center max-w-xl">
        Explore futuristic products in a cosmic environment. Add to cart, checkout via Vodafone Cash or Meeza, and enjoy a fully immersive experience.
      </p>
      <div className="flex gap-4">
        <Link
          to="/shop"
          className="bg-blue-500 px-6 py-3 rounded hover:bg-blue-600 transition"
        >
          Shop Now
        </Link>
        <Link
          to="/cart"
          className="bg-green-500 px-6 py-3 rounded hover:bg-green-600 transition"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}
