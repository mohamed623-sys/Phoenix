import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex flex-col gap-2">
      <img src={product.image || "/default-product.png"} alt={product.name} className="w-full h-48 object-cover rounded-xl" />
      <h3 className="text-xl font-bold glow">{product.name}</h3>
      <p className="text-gray-400">{product.description}</p>
      <p className="text-lg font-bold">${product.price}</p>
      <Link to={`/product/${product.id}`} className="btn-futuristic mt-2 text-center">
        View Product
      </Link>
    </div>
  );
}
