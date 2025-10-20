import React, { useEffect, useState } from "react";

export default function Cart({ t }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("cart") || "[]";
    setItems(JSON.parse(raw));
  }, []);

  const remove = (index) => {
    const newItems = items.slice();
    newItems.splice(index, 1);
    setItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const total = items.reduce((s, i) => s + (i.price || 0), 0);

  if (items.length === 0) return <div className="py-20 text-center">Your cart is empty.</div>;

  return (
    <div className="py-12 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Cart</h2>
      <div className="space-y-4">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded">
            <img src={it.image} alt={it.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <div className="font-semibold">{it.name}</div>
              <div className="text-white/70">${it.price}</div>
            </div>
            <button onClick={() => remove(idx)} className="px-3 py-1 border rounded">Remove</button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-lg font-bold">Total: ${total.toFixed(2)}</div>
        <button className="px-6 py-2 bg-pink-600 rounded">Checkout (placeholder)</button>
      </div>
    </div>
  );
}
