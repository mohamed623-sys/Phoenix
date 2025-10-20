import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen text-white px-6 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-6xl font-bold glow mb-4">Phoenix Store</h1>
      <p className="text-xl glow mb-10 text-center">
        Futuristic shopping experience with 3D space vibes 🌌
      </p>
      <Link to="/shop" className="btn-futuristic">
        Explore Shop
      </Link>
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
        <div className="p-4 bg-gray-900 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold glow">New Arrivals</h3>
          <p className="text-gray-400">Check latest products</p>
        </div>
        <div className="p-4 bg-gray-900 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold glow">Top Sellers</h3>
          <p className="text-gray-400">Most loved items</p>
        </div>
        <div className="p-4 bg-gray-900 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold glow">Custom Orders</h3>
          <p className="text-gray-400">Make your own design</p>
        </div>
        <div className="p-4 bg-gray-900 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold glow">Exclusive Deals</h3>
          <p className="text-gray-400">Limited time offers</p>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-0 right-0 flex justify-center space-x-6"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Link to="/login" className="btn-futuristic text-sm">
          Login
        </Link>
        <Link to="/admin" className="btn-futuristic text-sm">
          Admin
        </Link>
      </motion.div>
    </motion.div>
  );
}
