import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../features/orders/ordersSlice";
import { clearCart } from "../features/m/cart/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.orders);

  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    if (!form.fullName || !form.phone || !form.address || !form.city) return;

    const result = await dispatch(placeOrder({
      userId: user.uid,
      items,
      total,
      shippingInfo: form,
    }));

    if (placeOrder.fulfilled.match(result)) {
      dispatch(clearCart());
      setSuccess(true);
    }
  };

  // ── Success screen ──
  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center gap-6 text-center"
        >
          {/* Diamond checkmark */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="24" y="2" width="30" height="30" transform="rotate(45 24 24)"
              stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
            <path d="M16 24l5 5 11-11" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" />
          </svg>

          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3"
              style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
              Lumière Skin Atelier
            </p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "2rem", fontWeight: 300, letterSpacing: "-0.01em",
              color: "#1a1a1a",
            }}>
              Order Confirmed
            </h1>
            <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mt-2"
              style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
              Thank you, {form.fullName}
            </p>
          </div>

          <div className="w-full max-w-xs h-px bg-neutral-100" />

          <p className="text-xs text-neutral-400 max-w-xs leading-relaxed"
            style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
            Your order of PKR {total.toLocaleString()} has been placed and will be delivered to {form.city}.
          </p>

          <div className="flex gap-4 mt-2">
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/products")}
              className="px-6 py-3 text-[10px] tracking-[0.25em] uppercase text-neutral-600"
              style={{ border: "1px solid rgba(0,0,0,0.12)", fontFamily: "SF Pro Text, -apple-system, sans-serif" }}
            >
              Continue Shopping
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/orders")}
              className="px-6 py-3 text-[10px] tracking-[0.25em] uppercase text-white"
              style={{ background: "#1a1a1a", fontFamily: "SF Pro Text, -apple-system, sans-serif" }}
            >
              View Orders
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Empty cart ──
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-[11px] tracking-[0.35em] uppercase text-neutral-300"
          style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
          Your cart is empty
        </p>
        <button onClick={() => navigate("/products")}
          className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors"
          style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
          ← Back to products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white"
      style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>

      {/* ── Header ── */}
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
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 300, letterSpacing: "-0.01em", lineHeight: 1, color: "#1a1a1a",
        }}>
          Checkout
        </h1>
      </motion.div>

      {/* ── Body ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── Left — Shipping form ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-[9px] tracking-[0.35em] uppercase text-neutral-400 mb-6"
              style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
              Shipping Information
            </p>

            <div className="flex flex-col gap-4">
              {[
                { name: "fullName", label: "Full Name",    placeholder: "Aneela Atif" },
                { name: "phone",    label: "Phone Number", placeholder: "+92 300 0000000" },
                { name: "address",  label: "Address",      placeholder: "Street, Area" },
                { name: "city",     label: "City",         placeholder: "Karachi" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-400"
                    style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="px-4 py-3 text-sm text-neutral-700 placeholder-neutral-300 outline-none bg-transparent"
                    style={{
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontFamily: "SF Pro Text, -apple-system, sans-serif",
                    }}
                  />
                </div>
              ))}
            </div>

            {error && (
              <p className="text-[10px] tracking-widest uppercase text-red-400 mt-4"
                style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
                {error}
              </p>
            )}
          </motion.div>

          {/* ── Right — Order summary ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-[9px] tracking-[0.35em] uppercase text-neutral-400 mb-6"
              style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
              Order Summary
            </p>

            {/* Items */}
            <div className="flex flex-col divide-y divide-neutral-100 mb-6">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 py-4">
                  <div className="flex-shrink-0 bg-neutral-50 overflow-hidden"
                    style={{ width: 60, height: 75 }}>
                    {product.image ? (
                      <img src={product.image} alt={product.name}
                        className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-[8px] tracking-widest uppercase text-neutral-300">
                          {product.category}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-neutral-800 text-sm"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}>
                      {product.name}
                    </p>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mt-0.5"
                      style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
                      {product.ml} · Qty {quantity}
                    </p>
                  </div>
                  <p className="text-sm text-neutral-700 self-center"
                    style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif", fontWeight: 300 }}>
                    PKR {(product.price * quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-4"
              style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400"
                style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
                Total
              </span>
              <span style={{
                fontFamily: "SF Pro Text, -apple-system, sans-serif",
                fontWeight: 300, fontSize: "1.1rem", color: "#1a1a1a",
              }}>
                PKR {total.toLocaleString()}
              </span>
            </div>

            {/* Place order button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full py-4 text-[11px] tracking-[0.3em] uppercase text-white mt-4 transition-all duration-300"
              style={{
                background: loading ? "rgba(0,0,0,0.4)" : "#1a1a1a",
                fontFamily: "SF Pro Text, -apple-system, sans-serif",
              }}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;