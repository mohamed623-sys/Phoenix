import React, { useState, Suspense } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import StarsBackground from "./components/StarsBackground";
import { locales } from "./i18n";
import Login from "./pages/Login";

const Home = React.lazy(() => import("./pages/Home"));
const Shop = React.lazy(() => import("./pages/Shop"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));
const Custom = React.lazy(() => import("./pages/Custom"));
const Cart = React.lazy(() => import("./pages/Cart"));
const ProductsAdmin = React.lazy(() => import("./pages/ProductsAdmin"));

export default function App() {
  const [lang, setLang] = useState("en");
  const t = locales[lang];
  const location = useLocation();

  return (
    <div className="min-h-screen text-white font-sans">
      <StarsBackground />

      {/* navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold text-pink-400">PHOENIX</Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="hover:text-pink-300">Home</Link>
            <Link to="/shop" className="hover:text-pink-300">Shop</Link>
            <Link to="/custom" className="hover:text-pink-300">Custom</Link>
            <Link to="/cart" className="hover:text-pink-300">Cart</Link>
            <Link to="/admin" className="hover:text-pink-300">Admin</Link>

            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-white/5 rounded px-2 py-1 text-sm"
            >
              <option value="en">EN</option>
              <option value="ar">AR</option>
            </select>
            <Link to="/login" className="ml-2 px-3 py-1 border rounded text-sm">Account</Link>
          </nav>
        </div>
      </header>

      <main className="pt-24 max-w-6xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <Suspense fallback={<Loader />}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home t={t} lang={lang} />} />
                <Route path="/shop" element={<Shop t={t} lang={lang} />} />
                <Route path="/product/:id" element={<ProductPage t={t} lang={lang} />} />
                <Route path="/custom" element={<Custom t={t} lang={lang} />} />
                <Route path="/cart" element={<Cart t={t} lang={lang} />} />
                <Route path="/admin" element={<ProductsAdmin t={t} lang={lang} />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </motion.div>
          </Suspense>
        </AnimatePresence>
      </main>

      <footer className="mt-16 text-center text-white/70 py-8">© {new Date().getFullYear()} Phoenix</footer>
    </div>
  );
}

function Loader() {
  return (
    <div className="py-20 text-center">
      <div className="inline-block w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mb-4" />
      <div>Loading...</div>
    </div>
  );
}
