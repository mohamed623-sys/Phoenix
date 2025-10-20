import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen p-8 relative z-10 flex flex-col items-center justify-center">
      <h1 className="text-6xl glow mb-6 text-center">✅ Purchase Successful!</h1>
      <p className="text-gray-300 text-center mb-8">
        Thank you for your order. Your payment has been received.
      </p>
      <Link to="/shop" className="btn-futuristic w-64 text-center">Back to Shop</Link>
    </div>
  );
}
