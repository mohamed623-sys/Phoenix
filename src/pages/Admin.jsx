import React, {useEffect, useState} from 'react'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react'

const ADMIN_EMAIL = 'mohamedtareq543219@gmail.com'

export default function Admin(){
  const { user } = useUser() || {}
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({name:'', price:'0', description:''})

  useEffect(()=>{ load() },[])

  async function load(){
    const q = collection(db, 'products')
    const snap = await getDocs(q)
    setProducts(snap.docs.map(d=>({id:d.id, ...d.data()})))
  }

  async function add(e){
    e.preventDefault()
    await addDoc(collection(db,'products'), {...form, price: Number(form.price)})
    setForm({name:'',price:'0',description:''})
    load()
  }

  async function remove(id){
    await deleteDoc(doc(db,'products',id)); load()
  }

  async function updateItem(id){
    const price = prompt('New price (number)');
    if(!price) return;
    await updateDoc(doc(db,'products',id), {price: Number(price)})
    load()
  }

  if(!user) return <div className="container">Please sign in to access admin.</div>
  if(user?.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) return <div className="container">You are not authorized as admin ({user?.primaryEmailAddress?.emailAddress})</div>

  return (
    <div className="container">
      <h2 className="text-3xl mb-4">Admin — Manage Products</h2>
      <form onSubmit={add} className="space-y-3 mb-6">
        <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full p-3 rounded bg-white/5"/>
        <input required value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="Price" className="w-full p-3 rounded bg-white/5"/>
        <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description" className="w-full p-3 rounded bg-white/5"></textarea>
        <button className="btn btn-primary">Add Product</button>
      </form>

      <div className="grid gap-4">
        {products.map(p=>(
          <div key={p.id} className="p-4 bg-white/5 rounded flex justify-between">
            <div>
              <div className="font-bold">{p.name}</div>
              <div className="text-white/70">{p.description}</div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline" onClick={()=>updateItem(p.id)}>Edit</button>
              <button className="btn btn-outline" onClick={()=>remove(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
