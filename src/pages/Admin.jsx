import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";

export default function Admin() {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, description: "", image: "" });

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress !== "mohamedtareq543219@gmail.com") {
      alert("Access Denied");
      return;
    }
    async function fetchProducts() {
      const snapshot = await getDocs(collection(db, "products"));
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchProducts();
  }, [user]);

  async function addProduct() {
    await addDoc(collection(db, "products"), newProduct);
    setNewProduct({ name: "", price: 0, description: "", image: "" });
    const snapshot = await getDocs(collection(db, "products"));
    setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  async function removeProduct(id) {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter(p => p.id !== id));
  }

  async function editProduct(id, field, value) {
    const ref = doc(db, "products", id);
    await updateDoc(ref, { [field]: value });
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  }

  return (
    <div className="min-h-screen p-8 relative z-10">
      <h1 className="text-5xl glow mb-6 text-center">Admin Panel</h1>
      <div className="mb-6">
        <input placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="input-futuristic"/>
        <input placeholder="Price" type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} className="input-futuristic"/>
        <input placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="input-futuristic"/>
        <input placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="input-futuristic"/>
        <button onClick={addProduct} className="btn-futuristic mt-2">Add Product</button>
      </div>
      <div className="grid gap-4">
        {products.map(p => (
          <div key={p.id} className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
            <div>
              <input value={p.name} onChange={e => editProduct(p.id, "name", e.target.value)} className="input-futuristic mb-1"/>
              <input type="number" value={p.price} onChange={e => editProduct(p.id, "price", parseFloat(e.target.value))} className="input-futuristic mb-1"/>
            </div>
            <div className="flex gap-2">
              <button onClick={() => removeProduct(p.id)} className="btn-futuristic px-4 py-1">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
