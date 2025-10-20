import React from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function payWithVodafone() {
    alert("Payment via Vodafone Cash simulated! Redirecting...");
    localStorage.removeItem("cart");
    navigate("/success");
  }

  function payWithMeeza() {
    alert("Payment via Meeza card simulated! Redirecting...");
    localStorage.removeItem("cart");
    navigate("/success");
  }

  if (!cart.length) return <div className="text-center mt-20">Your cart is empty</div>;

  return (
    <div className="min-h-screen p-8 relative z-10">
      <h1 className="text-5xl glow mb-6 text-center">Checkout</h1>
      <p className="text-gray-300 mb-4 text-center">
        Choose payment method:
      </p>
      <div className="flex justify-center gap-6">
        <button onClick={payWithVodafone} className="btn-futuristic w-48">Vodafone Cash</button>
        <button onClick={payWithMeeza} className="btn-futuristic w-48">Meeza / Visa</button>
      </div>
    </div>
  );
}
