import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="p-8 min-h-screen relative z-10 flex flex-col items-center justify-center">
      <h1 className="text-5xl glow mb-6">Payment Successful 🎉</h1>
      <p className="text-gray-300 mb-6 text-center">Thank you for your purchase! Your items are on the way.</p>
      <Link to="/shop" className="btn-futuristic w-64 text-center">
        Continue Shopping
      </Link>
    </div>
  );
}
