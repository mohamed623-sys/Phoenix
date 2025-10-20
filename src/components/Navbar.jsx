import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md flex justify-between items-center p-4">
      <Link to="/" className="text-white text-2xl font-bold glow">Phoenix</Link>
      <div className="flex gap-4">
        <Link to="/shop" className="btn-futuristic">Shop</Link>
        <Link to="/cart" className="btn-futuristic">Cart</Link>
        <Link to="/admin" className="btn-futuristic">Admin</Link>
      </div>
    </nav>
  );
}
