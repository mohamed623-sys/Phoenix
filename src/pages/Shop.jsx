import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const productsCol = collection(db, "products");
    const snapshot = await getDocs(productsCol);
    setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <motion.div
      className="min-h-screen px-6 py-24 text-white grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {loading ? (
        <p>Loading products...</p>
      ) : (
        products.map(p => <ProductCard key={p.id} product={p} />)
      )}
    </motion.div>
  );
}
