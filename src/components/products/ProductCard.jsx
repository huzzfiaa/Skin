import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/m/cart/cartSlice";

const ProductCard = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, name, category, price, ml, tag, image } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative flex flex-col"
      style={{ border: "1px solid rgba(0,0,0,0.08)" }}
    >
      {/* ── Tag ── */}
      {tag && (
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5"
          style={{ border: "1px solid rgba(0,0,0,0.12)" }}>
          <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-500"
            style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
            {tag}
          </span>
        </div>
      )}

      {/* ── Image area ── */}
      <div
        className="relative overflow-hidden bg-neutral-50 cursor-pointer"
        style={{ aspectRatio: "4/5" }}
        onClick={() => navigate(`/product/${id}`)}
      >
        {image ? (
          <img src={image} alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <span className="absolute top-3 left-3 w-5 h-5"
              style={{ borderTop: "1px solid rgba(0,0,0,0.12)", borderLeft: "1px solid rgba(0,0,0,0.12)" }} />
            <span className="absolute top-3 right-3 w-5 h-5"
              style={{ borderTop: "1px solid rgba(0,0,0,0.12)", borderRight: "1px solid rgba(0,0,0,0.12)" }} />
            <span className="absolute bottom-3 left-3 w-5 h-5"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.12)", borderLeft: "1px solid rgba(0,0,0,0.12)" }} />
            <span className="absolute bottom-3 right-3 w-5 h-5"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.12)", borderRight: "1px solid rgba(0,0,0,0.12)" }} />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="10" y="0" width="14" height="14" transform="rotate(45 10 10)"
                stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
            </svg>
            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-300"
              style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
              {category}
            </p>
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.0)" }}
          whileHover={{ background: "rgba(255,255,255,0.5)" }}
          transition={{ duration: 0.25 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[10px] tracking-[0.35em] uppercase text-neutral-700"
            style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}
          >
            View
          </motion.span>
        </motion.div>
      </div>

      {/* ── Card body ── */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <p className="text-neutral-800 text-sm mb-0.5 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, letterSpacing: "0.01em" }}>
            {name}
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400"
            style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
            {category} · {ml}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-neutral-700 text-sm"
            style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif", fontWeight: 300, letterSpacing: "0.01em" }}>
            PKR {price.toLocaleString()}
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
            style={{ border: "1px solid rgba(0,0,0,0.12)", fontFamily: "SF Pro Text, -apple-system, sans-serif" }}
            onClick={() => dispatch(addToCart(product))}
          >
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;