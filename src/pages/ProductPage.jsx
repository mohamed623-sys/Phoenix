import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

export default function ProductPage({ t }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);
      if (snap.exists()) setProduct({ id: snap.id, ...snap.data() });
      setLoading(false);
    }
    load();
  }, [id]);

  const addToCart = () => {
    const raw = localStorage.getItem("cart") || "[]";
    const cart = JSON.parse(raw);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!product) return <div className="py-20 text-center">Product not found</div>;

  return (
    <div className="py-12 grid md:grid-cols-2 gap-8">
      <img src={product.image} alt={product.name} className="w-full rounded-lg object-cover h-96" />
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="text-pink-400 text-2xl font-bold mb-4">${product.price}</div>
        <p className="text-white/80 mb-6">{product.description}</p>
        <div className="flex gap-3">
          <button onClick={addToCart} className="px-6 py-3 bg-pink-600 rounded"> {t.addToCart} </button>
        </div>
      </div>
    </div>
  );
}
