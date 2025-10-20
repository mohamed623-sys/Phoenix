import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const snapshot = await getDocs(collection(db, "products"));
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-8 relative z-10">
      <h1 className="text-5xl glow mb-8 text-center">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <Link to={`/product/${p.id}`} key={p.id} className="card cursor-pointer">
            <img src={p.image} alt={p.name} className="w-full h-64 object-cover mb-2 rounded-lg"/>
            <h2 className="text-xl glow mb-2">{p.name}</h2>
            <p className="text-gray-300 mb-2">{p.description}</p>
            <p className="font-bold glow">EGP {p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
