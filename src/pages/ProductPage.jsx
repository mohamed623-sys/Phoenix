import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        navigate("/shop");
      }
    }
    fetchProduct();
  }, [id]);

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  }

  if (!product) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen p-8 relative z-10">
      <h1 className="text-5xl glow mb-6">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full max-w-xl mx-auto rounded-lg mb-6"/>
      <p className="text-gray-300 mb-4">{product.description}</p>
      <p className="font-bold glow text-2xl mb-4">EGP {product.price}</p>
      <button onClick={addToCart} className="btn-futuristic w-48">
        Add to Cart
      </button>
    </div>
  );
}
