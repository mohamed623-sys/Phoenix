import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home({ t }) {
  return (
    <motion.section className="text-center py-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-5xl font-extrabold text-pink-400 mb-4">{t.homeTitle}</h1>
      <p className="max-w-2xl mx-auto text-white/80 mb-8">
        Discover cosmic products — premium quality and futuristic designs.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/shop" className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 shadow-lg">{t.explore}</Link>
        <Link to="/custom" className="px-6 py-3 rounded-xl border border-white/10">Custom Design</Link>
      </div>
    </motion.section>
  );
}
