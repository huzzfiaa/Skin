// src/components/products/SearchSort.jsx
import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

const SearchSort = ({ searchValue, sortValue, resultCount, onSearchChange, onSortChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex items-center justify-between gap-4 mb-8 pb-6"
      style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
    >
      <div
        className="flex items-center gap-3 flex-1 max-w-xs px-4 py-2.5"
        style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: "2px" }}
      >
        <Search size={13} strokeWidth={1.5} className="text-neutral-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent text-xs text-neutral-700 placeholder-neutral-300 outline-none w-full"
          style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif", letterSpacing: "0.01em" }}
        />
      </div>

      <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-300 hidden md:block"
        style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
        {resultCount ?? 0} Products
      </p>

      <div className="flex items-center gap-3">
        <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 hidden sm:block"
          style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
          Sort
        </span>
        <div className="relative" style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: "2px" }}>
          <select
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-transparent text-xs text-neutral-600 outline-none px-4 py-2.5 pr-8 cursor-pointer"
            style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif", letterSpacing: "0.01em" }}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 4l3 3 3-3" stroke="#aaa" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchSort;