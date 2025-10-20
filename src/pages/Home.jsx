import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="flex flex-col items-center justify-center min-h-screen relative z-10 p-8"
    >
      <h1 className="text-6xl font-bold glow mb-6 text-center">
        Welcome to Phoenix Shop 🌌
      </h1>
      <p className="text-xl mb-8 text-center text-gray-300">
        Futuristic shopping experience. Browse and buy with ease.
      </p>
      <Link to="/shop" className="btn-futuristic w-64 text-center">
        Go to Shop
      </Link>
    </motion.div>
  );
}
