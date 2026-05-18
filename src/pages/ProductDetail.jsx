import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/m/cart/cartSlice";
import { fetchProducts } from "../features/m/products/productsSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const { items: products, loading } = useSelector((state) => state.products);

  // ── If products not loaded yet, fetch them ──
  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch]);

  const product = products.find((p) => p.id === id);
  const related = product
    ? products.filter((p) => p.category === product.category && p.id !== id).slice(0, 3)
    : [];

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <motion.div animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="12" y="1" width="16" height="16" transform="rotate(45 12 12)"
              stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
          </svg>
        </motion.div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-300"
          style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>Loading</p>
      </div>
    );
  }

  // ── Not found ──
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="24" y="2" width="30" height="30" transform="rotate(45 24 24)"
            stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
        </svg>
        <p className="text-[11px] tracking-[0.35em] uppercase text-neutral-300"
          style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
          Product not found
        </p>
        <button onClick={() => navigate("/products")}
          className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors mt-2"
          style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
          ← Back to products
        </button>
      </div>
    );
  }

  const { name, category, price, ml, tag, image } = product;

  return (
    <div className="min-h-screen bg-white"
      style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>

      {/* ── Breadcrumb ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-xl mx-auto px-6 md:px-12 pt-10 pb-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/products")}
            className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 hover:text-neutral-700 transition-colors duration-200">
            Products
          </button>
          <span className="text-neutral-200 text-xs">›</span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400">{category}</span>
          <span className="text-neutral-200 text-xs">›</span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-700">{name}</span>
        </div>
      </motion.div>

      {/* ── Main ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }} className="relative">
            {tag && (
              <div className="absolute top-4 left-4 z-10 px-2 py-0.5"
                style={{ border: "1px solid rgba(0,0,0,0.12)" }}>
                <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-500">{tag}</span>
              </div>
            )}
            <div className="w-full bg-neutral-50 overflow-hidden" style={{ aspectRatio: "4/5" }}>
              {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 relative">
                  <span className="absolute top-4 left-4 w-6 h-6"
                    style={{ borderTop: "1px solid rgba(0,0,0,0.1)", borderLeft: "1px solid rgba(0,0,0,0.1)" }} />
                  <span className="absolute top-4 right-4 w-6 h-6"
                    style={{ borderTop: "1px solid rgba(0,0,0,0.1)", borderRight: "1px solid rgba(0,0,0,0.1)" }} />
                  <span className="absolute bottom-4 left-4 w-6 h-6"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", borderLeft: "1px solid rgba(0,0,0,0.1)" }} />
                  <span className="absolute bottom-4 right-4 w-6 h-6"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", borderRight: "1px solid rgba(0,0,0,0.1)" }} />
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="10" y="0" width="14" height="14" transform="rotate(45 10 10)"
                      stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
                  </svg>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-300">{category}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col justify-center py-4">
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
              Lumière Skin Atelier
            </p>
            <h1 className="text-neutral-900 mb-2 leading-tight" style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 300, letterSpacing: "-0.01em",
            }}>
              {name}
            </h1>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-8">
              {category} · {ml}
            </p>
            <div className="w-full h-px bg-neutral-100 mb-8" />
            <p className="text-neutral-800 mb-8"
              style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.01em" }}>
              PKR {price.toLocaleString()}
            </p>
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full py-4 text-[11px] tracking-[0.3em] uppercase transition-all duration-300"
              style={{
                border: "1px solid rgba(0,0,0,0.15)",
                fontFamily: "SF Pro Text, -apple-system, sans-serif",
                background: added ? "#1a1a1a" : "transparent",
                color: added ? "#fff" : "#404040",
              }}>
              {added ? "Added to Cart" : "Add to Cart"}
            </motion.button>
            <div className="w-full h-px bg-neutral-100 mt-8 mb-8" />
            <div className="flex flex-col gap-3">
              {[["Category", category], ["Volume", ml], ["Collection", tag ?? "—"]].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">{label}</span>
                  <span className="text-[11px] tracking-[0.1em] text-neutral-600">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Related ── */}
      {related.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-screen-xl mx-auto px-6 md:px-12 py-16"
          style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-8">
            You may also like
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px"
            style={{ background: "rgba(0,0,0,0.06)" }}>
            {related.map((p) => (
              <div key={p.id} className="bg-white">
                <motion.div whileHover={{ scale: 1.01 }} className="cursor-pointer group"
                  onClick={() => navigate(`/product/${p.id}`)}>
                  <div className="relative overflow-hidden bg-neutral-50" style={{ aspectRatio: "4/5" }}>
                    {p.image ? (
                      <img src={p.image} alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-300">{p.category}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-neutral-800 text-sm mb-0.5"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}>
                      {p.name}
                    </p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                      PKR {p.price.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductDetail;