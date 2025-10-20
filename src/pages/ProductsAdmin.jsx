import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: 0, image: "" });

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAdd = async () => {
    await addDoc(collection(db, "products"), newProduct);
    setNewProduct({ name: "", description: "", price: 0, image: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Manage Products</h1>
      <div className="flex flex-col gap-2 mb-4">
        <input placeholder="Name" className="p-2 rounded text-black" value={newProduct.name} onChange={e=>setNewProduct({...newProduct,name:e.target.value})} />
        <input placeholder="Description" className="p-2 rounded text-black" value={newProduct.description} onChange={e=>setNewProduct({...newProduct,description:e.target.value})} />
        <input placeholder="Price" type="number" className="p-2 rounded text-black" value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:Number(e.target.value)})} />
        <input placeholder="Image URL" className="p-2 rounded text-black" value={newProduct.image} onChange={e=>setNewProduct({...newProduct,image:e.target.value})} />
        <button onClick={handleAdd} className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">Add Product</button>
      </div>
      <div className="flex flex-col gap-2">
        {products.map(p => (
          <div key={p.id} className="flex justify-between bg-gray-800 p-2 rounded">
            <span>{p.name}</span>
            <button onClick={()=>handleDelete(p.id)} className="bg-red-500 px-2 py-1 rounded hover:bg-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
