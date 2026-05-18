// src/components/products/FilterSidebar.jsx
import React from "react";
import { motion } from "framer-motion";
import { categories } from "../../data/products";

const priceRanges = [
  { label: "Under PKR 3,000", value: "under-3000" },
  { label: "PKR 3,000 – 5,000", value: "3000-5000" },
  { label: "Above PKR 5,000", value: "above-5000" },
];

const tags = ["Bestseller", "New", "Limited"];

const Section = ({ title, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className="pb-7 mb-7"
    style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
  >
    <p className="text-[9px] tracking-[0.35em] uppercase mb-5 text-neutral-400"
      style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
      {title}
    </p>
    {children}
  </motion.div>
);

const FilterPill = ({ label, active = false, onClick }) => (
  <motion.button
    whileHover={{ x: 3 }}
    whileTap={{ scale: 0.97 }}
    transition={{ duration: 0.15 }}
    className="flex items-center gap-2 w-full text-left group py-1"
    onClick={onClick}
  >
    <span
      className="w-3.5 h-3.5 rounded-sm flex-shrink-0 transition-all duration-200"
      style={{
        border: active ? "1.5px solid #1a1a1a" : "1px solid rgba(0,0,0,0.2)",
        background: active ? "#1a1a1a" : "transparent",
        position: "relative",
      }}
    >
      {active && (
        <svg className="absolute inset-0 w-full h-full p-0.5" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5l2.5 2.5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </span>
    <span
      className="text-xs transition-colors duration-200"
      style={{
        fontFamily: "SF Pro Text, -apple-system, sans-serif",
        color: active ? "#1a1a1a" : "#888",
        fontWeight: active ? 400 : 300,
        letterSpacing: "0.01em",
      }}
    >
      {label}
    </span>
  </motion.button>
);

const FilterSidebar = ({
  selectedCategory,
  selectedPrice,
  selectedTags,
  onCategorySelect,
  onPriceSelect,
  onTagToggle,
  onClearAll,
}) => {
  return (
    <aside className="w-56 flex-shrink-0 pt-1">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-8"
      >
        <p className="text-sm text-neutral-800"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, letterSpacing: "0.02em" }}>
          Filter
        </p>
        <button
          onClick={onClearAll}
          className="text-[10px] tracking-widest uppercase text-neutral-400 hover:text-neutral-700 transition-colors duration-200"
          style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}
        >
          Clear
        </button>
      </motion.div>

      <Section title="Category" delay={0.05}>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              active={selectedCategory === cat}
              onClick={() => onCategorySelect(cat)}
            />
          ))}
        </div>
      </Section>

      <Section title="Price Range" delay={0.1}>
        <div className="flex flex-col gap-2">
          {priceRanges.map((p) => (
            <FilterPill
              key={p.value}
              label={p.label}
              active={selectedPrice === p.value}
              onClick={() => onPriceSelect(p.value)}
            />
          ))}
        </div>
      </Section>

      <Section title="Collection" delay={0.15}>
        <div className="flex flex-col gap-2">
          {tags.map((tag) => (
            <FilterPill
              key={tag}
              label={tag}
              active={selectedTags?.includes(tag)}
              onClick={() => onTagToggle(tag)}
            />
          ))}
        </div>
      </Section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-2"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M0 40 L0 0 L40 0" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
          <path d="M6 40 L6 6 L40 6" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
        </svg>
      </motion.div>
    </aside>
  );
};

export default FilterSidebar;