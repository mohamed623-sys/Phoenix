import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  const goToCheckout = () => navigate("/checkout");

  if (cart.length === 0) {
    return (
      <div className="p-8 text-white min-h-screen relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl glow mb-4">Your Cart is Empty</h1>
        <Link to="/shop" className="btn-futuristic">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen relative z-10">
      <h1 className="text-5xl glow mb-4">Your Cart</h1>
      <div className="flex flex-col gap-4">
        {cart.map((p, i) => (
          <div key={i} className="cart-item neon-hover">
            <span>{p.name}</span>
            <span>EGP {p.price}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 font-bold glow">Total: EGP {total}</p>
      <button onClick={goToCheckout} className="btn-futuristic mt-4">
        Proceed to Checkout
      </button>
    </div>
  );
}
