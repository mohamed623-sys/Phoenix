import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", description: "", category: "", inStock: true });
  const [editId, setEditId] = useState(null);

  const productsRef = collection(db, "products");

  async function load() {
    const snap = await getDocs(productsRef);
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  }
  useEffect(()=>{ load(); }, []);

  async function submit(e) {
    e.preventDefault();
    if (editId) {
      const ref = doc(db, "products", editId);
      await updateDoc(ref, { ...form, price: Number(form.price) });
      setEditId(null);
    } else {
      await addDoc(productsRef, { ...form, price: Number(form.price) });
    }
    setForm({ name: "", price: "", image: "", description: "", category: "", inStock: true });
    load();
  }

  async function remove(id) {
    await deleteDoc(doc(db, "products", id));
    load();
  }

  function edit(p) {
    setEditId(p.id);
    setForm({ name: p.name, price: p.price, image: p.image, description: p.description, category: p.category || "", inStock: !!p.inStock });
  }

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold mb-4">Admin — Products</h2>
      <form onSubmit={submit} className="max-w-2xl bg-white/5 p-4 rounded mb-6">
        <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full p-2 rounded mb-2 bg-black/40" />
        <input required value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="Price" className="w-full p-2 rounded mb-2 bg-black/40" />
        <input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder="Image URL" className="w-full p-2 rounded mb-2 bg-black/40" />
        <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="Category" className="w-full p-2 rounded mb-2 bg-black/40" />
        <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description" className="w-full p-2 rounded mb-2 bg-black/40" />
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-pink-600 rounded">{editId ? "Update" : "Add"}</button>
          {editId && <button type="button" onClick={()=>{ setEditId(null); setForm({ name: "", price: "", image: "", description: "", category: "", inStock: true }) }} className="px-4 py-2 border rounded">Cancel</button>}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-white/5 p-4 rounded">
            <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded mb-3"/>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">{p.name}</div>
                <div className="text-white/70">{p.category}</div>
              </div>
              <div className="font-bold text-pink-400">${p.price}</div>
            </div>
            <p className="text-white/70 mt-2 line-clamp-2">{p.description}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={()=>edit(p)} className="px-3 py-1 border rounded">Edit</button>
              <button onClick={()=>remove(p.id)} className="px-3 py-1 border rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
