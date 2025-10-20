import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6">
      <h1 className="text-5xl font-bold glow mb-4">Payment Successful!</h1>
      <p className="text-xl mb-6">Thank you for your purchase 🚀</p>
      <Link to="/shop" className="btn-futuristic">
        Continue Shopping
      </Link>
    </div>
  );
}
