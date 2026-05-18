import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity, clearCart, toggleCart } from "../../features/m/cart/cartSlice";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isOpen } = useSelector((state) => state.cart);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = () => {
    dispatch(toggleCart());
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.2)" }}
            onClick={() => dispatch(toggleCart())}
          />

          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 right-0 h-full z-50 bg-white flex flex-col"
            style={{ width: "min(420px, 100vw)", borderLeft: "1px solid rgba(0,0,0,0.07)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
              <div>
                <p className="text-neutral-900"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 400, letterSpacing: "0.01em" }}>
                  Your Cart
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-0.5"
                  style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button onClick={() => dispatch(toggleCart())}
                className="p-2 text-neutral-400 hover:text-neutral-800 transition-colors duration-200">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 pb-16">
                  <ShoppingBag size={32} strokeWidth={1} className="text-neutral-200" />
                  <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-300"
                    style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-neutral-100">
                  <AnimatePresence>
                    {items.map(({ product, quantity }) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 py-5"
                      >
                        <div className="flex-shrink-0 bg-neutral-50 overflow-hidden"
                          style={{ width: 72, height: 90 }}>
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

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <p className="text-neutral-800 text-sm leading-snug"
                              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}>
                              {product.name}
                            </p>
                            <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mt-0.5"
                              style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
                              {product.category} · {product.ml}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-3"
                              style={{ border: "1px solid rgba(0,0,0,0.1)" }}>
                              <button
                                onClick={() =>
                                  quantity === 1
                                    ? dispatch(removeFromCart(product.id))
                                    : dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))
                                }
                                className="px-2.5 py-1.5 text-neutral-400 hover:text-neutral-800 transition-colors"
                              >
                                <Minus size={11} strokeWidth={1.5} />
                              </button>
                              <span className="text-xs text-neutral-700 w-4 text-center"
                                style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
                                {quantity}
                              </span>
                              <button
                                onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))}
                                className="px-2.5 py-1.5 text-neutral-400 hover:text-neutral-800 transition-colors"
                              >
                                <Plus size={11} strokeWidth={1.5} />
                              </button>
                            </div>
                            <p className="text-sm text-neutral-700"
                              style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif", fontWeight: 300 }}>
                              PKR {(product.price * quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => dispatch(removeFromCart(product.id))}
                          className="self-start pt-1 text-neutral-300 hover:text-neutral-600 transition-colors">
                          <X size={13} strokeWidth={1.5} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 flex flex-col gap-4"
                style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400"
                    style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
                    Subtotal
                  </span>
                  <span className="text-neutral-800"
                    style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif", fontWeight: 300, fontSize: "1rem" }}>
                    PKR {total.toLocaleString()}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full py-4 text-[11px] tracking-[0.3em] uppercase text-white transition-colors duration-200"
                  style={{ background: "#1a1a1a", fontFamily: "SF Pro Text, -apple-system, sans-serif" }}
                >
                  Proceed to Checkout
                </motion.button>

                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-[10px] tracking-[0.2em] uppercase text-neutral-300 hover:text-neutral-600 transition-colors text-center"
                  style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;