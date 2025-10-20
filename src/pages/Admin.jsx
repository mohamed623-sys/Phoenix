import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: 0, image: "" });

  const isAdmin = user?.primaryEmailAddress?.emailAddress === "mohamedtareq543219@gmail.com";

  useEffect(() => {
    if (!isAdmin) navigate("/shop");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleAdd = async () => {
    await addDoc(collection(db, "products"), form);
    setForm({ name: "", description: "", price: 0, image: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const handleUpdate = async (id, updated) => {
    await updateDoc(doc(db, "products", id), updated);
    fetchProducts();
  };

  return (
    <div className="p-8 min-h-screen relative z-10">
      <h1 className="text-5xl glow mb-6 text-center">Admin Panel</h1>
      <div className="flex flex-col gap-4 mb-6">
        <input placeholder="Name" className="input" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Description" className="input" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/>
        <input placeholder="Price" type="number" className="input" value={form.price} onChange={(e)=>setForm({...form,price:parseFloat(e.target.value)})}/>
        <input placeholder="Image URL" className="input" value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})}/>
        <button onClick={handleAdd} className="btn-futuristic w-64 mt-2">Add Product</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="card">
            <img src={p.image} alt={p.name} className="w-full h-64 object-cover mb-2"/>
            <h2 className="text-xl glow mb-2">{p.name}</h2>
            <p className="text-gray-300 mb-2">{p.description}</p>
            <p className="font-bold glow mb-2">EGP {p.price}</p>
            <div className="flex gap-2">
              <button onClick={()=>handleDelete(p.id)} className="btn w-full">Delete</button>
              <button onClick={()=>handleUpdate(p.id,{price:p.price+10})} className="btn w-full">Update +10 EGP</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
