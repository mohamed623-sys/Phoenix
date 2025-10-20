import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("vodafone");

  const handlePayment = () => {
    alert(`Paid with ${paymentMethod.toUpperCase()}!`);
    localStorage.removeItem("cart");
    navigate("/success");
  };

  return (
    <div className="p-8 min-h-screen relative z-10 flex flex-col items-center">
      <h1 className="text-5xl glow mb-6">Checkout</h1>
      <div className="payment-method mb-6 flex flex-col gap-4">
        <label>
          <input type="radio" name="payment" value="vodafone" checked={paymentMethod === "vodafone"} 
                 onChange={(e) => setPaymentMethod(e.target.value)} />
          <span className="ml-2">Vodafone Cash</span>
        </label>
        <label>
          <input type="radio" name="payment" value="meeza" checked={paymentMethod === "meeza"} 
                 onChange={(e) => setPaymentMethod(e.target.value)} />
          <span className="ml-2">Meeza Card / Visa</span>
        </label>
      </div>
      <button onClick={handlePayment} className="btn-futuristic w-64">
        Pay Now
      </button>
    </div>
  );
}
