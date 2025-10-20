import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Shop() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchProducts(); }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="p-8 relative z-10 min-h-screen">
      <h1 className="text-5xl glow mb-8 text-center">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="card hover:scale-105 transition">
            <img src={p.image} alt={p.name} className="w-full h-64 object-cover mb-4 float"/>
            <h2 className="text-2xl font-bold glow mb-2">{p.name}</h2>
            <p className="text-gray-300 mb-2">{p.description}</p>
            <p className="font-bold mb-2 glow">EGP {p.price}</p>
            <div className="flex gap-2">
              <button onClick={() => addToCart(p)} className="btn w-full">
                Add to Cart
              </button>
              <Link to={`/product/${p.id}`} className="btn w-full text-center">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
