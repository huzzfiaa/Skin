// src/components/products/ProductGrid.jsx
// UI ONLY — receives products array as prop, maps to cards

import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        {/* Empty state — border art */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="24" y="2" width="30" height="30" transform="rotate(45 24 24)"
            stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
          <rect x="24" y="8" width="20" height="20" transform="rotate(45 24 24)"
            stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
        </svg>
        <p
          className="text-[11px] tracking-[0.35em] uppercase text-neutral-300"
          style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}
        >
          No products found
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-px"
      style={{ background: "rgba(0,0,0,0.06)" }} // gap color via bg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {products.map((product, i) => (
        <div key={product.id} className="bg-white">
          <ProductCard product={product} index={i} />
        </div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;