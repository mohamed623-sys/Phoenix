import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("vodafone");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = () => {
    if (!name || !phone) return alert("Enter all info");
    // Here implement your payment API: Vodaphone Cash or Visa to your Meeza card
    localStorage.removeItem("cart");
    navigate("/success");
  };

  return (
    <div className="min-h-screen px-6 py-24 text-white max-w-xl mx-auto">
      <h1 className="text-4xl font-bold glow mb-6">Checkout</h1>
      <p className="mb-4">Total: ${total}</p>
      <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className="input-futuristic mb-4 w-full" />
      <input type="text" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="input-futuristic mb-4 w-full" />
      <select value={method} onChange={e => setMethod(e.target.value)} className="input-futuristic mb-4 w-full">
        <option value="vodafone">Vodafone Cash</option>
        <option value="visa">Visa/Mastercard</option>
      </select>
      <button onClick={handleSubmit} className="btn-futuristic w-full">Pay Now</button>
    </div>
  );
}
