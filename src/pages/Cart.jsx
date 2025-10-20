import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  function removeItem(index) {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function checkout() {
    navigate("/checkout");
  }

  if (!cart.length) return <div className="text-center mt-20">Your cart is empty</div>;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen p-8 relative z-10">
      <h1 className="text-5xl glow mb-6 text-center">Cart</h1>
      <div className="grid gap-4">
        {cart.map((item, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
            <span>{item.name} x {item.quantity}</span>
            <span>EGP {item.price * item.quantity}</span>
            <button onClick={() => removeItem(i)} className="btn-futuristic px-4 py-1">Remove</button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <p className="text-xl glow mb-4">Total: EGP {total}</p>
        <button onClick={checkout} className="btn-futuristic w-48">Checkout</button>
      </div>
    </div>
  );
}
