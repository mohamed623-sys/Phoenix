import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import StarsBackground from "./components/StarsBackground";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="relative w-full h-full bg-black text-white overflow-x-hidden">
      <StarsBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />

        <Route
          path="/admin/*"
          element={
            <SignedIn>
              <Admin />
            </SignedIn>
          }
        />
        <Route
          path="/admin/*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
