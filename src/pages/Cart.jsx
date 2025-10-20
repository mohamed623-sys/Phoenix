import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(items);
  }, []);

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen px-6 py-24 text-white">
      <h1 className="text-4xl font-bold glow mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/shop" className="btn-futuristic ml-2">Go Shopping</Link></p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between bg-gray-900 p-4 rounded-xl shadow-lg">
              <span>{item.name} - ${item.price}</span>
              <button onClick={() => removeItem(i)} className="btn-futuristic text-sm">Remove</button>
            </div>
          ))}
          <p className="text-2xl mt-4 font-bold">Total: ${total}</p>
          <button onClick={() => navigate("/checkout")} className="btn-futuristic mt-4">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
