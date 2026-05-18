import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/m/products/productsSlice";
import FilterSidebar from "../components/products/FilterSidebar";
import SearchSort from "../components/products/SearchSort";
import ProductGrid from "../components/products/ProductGrid";

const Products = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("featured");

  // ── Fetch from Firestore on mount ──
  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory((prev) => (prev === cat ? "All" : cat));
  };
  const handlePriceSelect = (value) => {
    setSelectedPrice((prev) => (prev === value ? null : value));
  };
  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedPrice(null);
    setSelectedTags([]);
    setSortBy("featured");
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedPrice === "under-3000") {
      result = result.filter((p) => p.price < 3000);
    } else if (selectedPrice === "3000-5000") {
      result = result.filter((p) => p.price >= 3000 && p.price <= 5000);
    } else if (selectedPrice === "above-5000") {
      result = result.filter((p) => p.price > 5000);
    }
    if (selectedTags.length > 0) {
      result = result.filter((p) => selectedTags.includes(p.tag));
    }
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result = result.filter((p) => p.tag === "New").concat(
        result.filter((p) => p.tag !== "New")
      );
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedPrice, selectedTags, sortBy]);

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="12" y="1" width="16" height="16" transform="rotate(45 12 12)"
              stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
          </svg>
        </motion.div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-300"
          style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
          Loading
        </p>
      </div>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-[11px] tracking-[0.35em] uppercase text-red-300"
          style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
          Failed to load products
        </p>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white"
      style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>

      {/* ── Page header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-screen-xl mx-auto px-6 md:px-12 pt-16 pb-10"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3">
          Lumière Skin Atelier
        </p>
        <div className="flex items-end justify-between gap-4">
          <h1 className="text-neutral-900" style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 300, letterSpacing: "-0.01em", lineHeight: 1,
          }}>
            All Products
          </h1>
          <div className="hidden md:flex items-center gap-3 pb-1">
            <div className="w-24 h-px bg-neutral-100" />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="5" y="0" width="7" height="7" transform="rotate(45 5 5)"
                stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
            </svg>
            <div className="w-8 h-px bg-neutral-100" />
          </div>
        </div>
      </motion.div>

      {/* ── Body ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-10">
        <div className="flex gap-12">
          <div className="hidden lg:block sticky top-8 self-start">
            <FilterSidebar
              selectedCategory={selectedCategory}
              selectedPrice={selectedPrice}
              selectedTags={selectedTags}
              onCategorySelect={handleCategorySelect}
              onPriceSelect={handlePriceSelect}
              onTagToggle={handleTagToggle}
              onClearAll={handleClearAll}
            />
          </div>
          <div className="flex-1 min-w-0">
            <SearchSort
              searchValue={searchQuery}
              sortValue={sortBy}
              resultCount={filtered.length}
              onSearchChange={setSearchQuery}
              onSortChange={setSortBy}
            />
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;