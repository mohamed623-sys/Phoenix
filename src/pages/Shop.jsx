import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Shop({ t }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const q = collection(db, "products");
      const snap = await getDocs(q);
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setProducts(arr);
      setLoading(false);
    }
    load();
  }, []);

  const addToCart = (product) => {
    const raw = localStorage.getItem("cart") || "[]";
    const cart = JSON.parse(raw);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  if (loading) return <div className="py-20 text-center">Loading products...</div>;
  if (products.length === 0) return <div className="py-20 text-center">No products found. Add via Admin.</div>;

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">{t.shopTitle}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
            <Link to={`/product/${p.id}`}>
              <img src={p.image} alt={p.name} className="w-full h-44 object-cover rounded-md mb-3" />
            </Link>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <div className="text-white/70 text-sm">{p.category || ""}</div>
              </div>
              <div className="text-pink-400 font-bold">${p.price}</div>
            </div>
            <div className="mt-3 flex gap-3">
              <button onClick={() => addToCart(p)} className="px-4 py-2 rounded bg-pink-600"> {t.addToCart} </button>
              <Link to={`/product/${p.id}`} className="px-3 py-2 border rounded">View</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
