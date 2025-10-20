import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) setProduct({ id: snapshot.id, ...snapshot.data() });
      else navigate("/shop");
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  if (!product) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="min-h-screen p-10 text-white flex flex-col md:flex-row gap-10">
      <img src={product.image || "/default-product.png"} alt={product.name} className="w-full md:w-1/2 rounded-xl" />
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold glow">{product.name}</h1>
        <p className="text-gray-400">{product.description}</p>
        <p className="text-2xl font-bold">${product.price}</p>
        <button onClick={addToCart} className="btn-futuristic w-48 mt-4">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
