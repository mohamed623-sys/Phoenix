import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setProduct({ id: docSnap.id, ...docSnap.data() });
      else navigate("/shop");
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  if (!product) return <p className="text-white p-8">Loading...</p>;

  return (
    <div className="p-8 min-h-screen relative z-10">
      <h1 className="text-5xl glow mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded mb-4 float"/>
      <p className="mb-2 neon-hover">{product.description}</p>
      <p className="font-bold mb-4 glow">EGP {product.price}</p>
      <button onClick={addToCart} className="btn-futuristic">
        Add to Cart
      </button>
    </div>
  );
}
