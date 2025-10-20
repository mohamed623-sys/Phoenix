import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "@clerk/clerk-react";

export default function Admin() {
  const { user } = useAuth();
  const adminEmail = "mohamedtareq543219@gmail.com";
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!user || user.primaryEmailAddress?.emailAddress !== adminEmail) return;
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    const col = collection(db, "products");
    const snap = await getDocs(col);
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const addProduct = async () => {
    if (!name || !desc || !price) return alert("All fields required");
    await addDoc(collection(db, "products"), { name, description: desc, price: parseFloat(price) });
    setName(""); setDesc(""); setPrice("");
    fetchProducts();
  };

  const updateProduct = async () => {
    if (!editing) return;
    const docRef = doc(db, "products", editing);
    await updateDoc(docRef, { name, description: desc, price: parseFloat(price) });
    setEditing(null); setName(""); setDesc(""); setPrice("");
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  if (!user || user.primaryEmailAddress?.emailAddress !== adminEmail)
    return <p className="text-white p-10">Access Denied</p>;

  return (
    <div className="min-h-screen p-10 text-white">
      <h1 className="text-4xl font-bold glow mb-6">Admin Panel</h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="input-futuristic" />
        <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="input-futuristic" />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="input-futuristic" />
        {editing ? (
          <button onClick={updateProduct} className="btn-futuristic">Update Product</button>
        ) : (
          <button onClick={addProduct} className="btn-futuristic">Add Product</button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-gray-900 p-4 rounded-xl shadow-lg flex flex-col gap-2">
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="text-gray-400">{p.description}</p>
            <p className="text-lg font-bold">${p.price}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => { setEditing(p.id); setName(p.name); setDesc(p.description); setPrice(p.price); }} className="btn-futuristic text-sm">
                Edit
              </button>
              <button onClick={() => deleteProduct(p.id)} className="btn-futuristic text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
