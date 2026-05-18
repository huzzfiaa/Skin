import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../features/m/order/orderSlice";
import { fetchProducts } from "../features/m/products/productsSlice";
import { addProduct, editProduct, deleteProduct } from "../features/m/products/productsSlice";
import { Package, ShoppingBag, Plus, Pencil, Trash2, X, Check } from "lucide-react";

// ── Shared styles ──
const font = { fontFamily: "SF Pro Text, -apple-system, sans-serif" };
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const label = "text-[9px] tracking-[0.3em] uppercase text-neutral-400";

// ── Empty product form ──
const emptyForm = { name: "", category: "", price: "", ml: "", tag: "", image: "" };
const categories = ["Serum", "Moisturiser", "Toner", "Eye Care", "Mask"];
const tags = ["Bestseller", "New", "Limited"];
const statusOptions = ["confirmed", "processing", "shipped", "delivered", "cancelled"];

// ────────────────────────────────────────────────────────────
// ORDERS TAB
// ────────────────────────────────────────────────────────────
const OrdersTab = () => {
  const dispatch = useDispatch();
  const { allOrders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }));
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <p className={`${label}`} style={font}>Loading orders...</p>
    </div>
  );

  if (!allOrders?.length) return (
    <div className="flex items-center justify-center py-20">
      <p className={`${label}`} style={font}>No orders yet</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {allOrders.map((order) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-white"
          style={{ border: "1px solid rgba(0,0,0,0.07)" }}
        >
          {/* Order header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-neutral-800 text-sm mb-0.5" style={serif}>
                {order.shippingInfo?.fullName}
              </p>
              <p className={label} style={font}>
                {order.shippingInfo?.city} · {order.shippingInfo?.phone}
              </p>
              <p className={`${label} mt-1`} style={font}>
                Order #{order.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-neutral-800 text-sm" style={font}>
                PKR {order.total?.toLocaleString()}
              </p>
              {/* Status dropdown */}
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="text-[10px] tracking-[0.15em] uppercase outline-none px-2 py-1 bg-transparent cursor-pointer"
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  fontFamily: "SF Pro Text, -apple-system, sans-serif",
                  color: order.status === "delivered" ? "#16a34a"
                    : order.status === "cancelled" ? "#dc2626"
                    : order.status === "shipped" ? "#2563eb"
                    : "#737373",
                }}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Order items */}
          <div className="flex flex-col gap-2 pt-3"
            style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <p className="text-xs text-neutral-600" style={font}>
                  {item.name} · {item.ml} × {item.quantity}
                </p>
                <p className="text-xs text-neutral-500" style={font}>
                  PKR {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ────────────────────────────────────────────────────────────
// PRODUCTS TAB
// ────────────────────────────────────────────────────────────
const ProductsTab = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      ml: product.ml,
      tag: product.tag || "",
      image: product.image || "",
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.category || !form.price || !form.ml) return;
    setSaving(true);
    const data = { ...form, price: Number(form.price), tag: form.tag || null };
    if (editingId) {
      await dispatch(editProduct({ id: editingId, data }));
    } else {
      await dispatch(addProduct(data));
    }
    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await dispatch(deleteProduct(id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div>
      {/* Add button */}
      <div className="flex justify-end mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
          className="flex items-center gap-2 px-4 py-2.5 text-[10px] tracking-[0.25em] uppercase text-white"
          style={{ background: "#1a1a1a", fontFamily: "SF Pro Text, -apple-system, sans-serif" }}
        >
          <Plus size={12} />
          Add Product
        </motion.button>
      </div>

      {/* Add/Edit form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 mb-6 bg-neutral-50"
            style={{ border: "1px solid rgba(0,0,0,0.07)" }}
          >
            <p className={`${label} mb-5`} style={font}>
              {editingId ? "Edit Product" : "New Product"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                { name: "name",     label: "Product Name", placeholder: "Radiance Serum No.1" },
                { name: "ml",       label: "Volume",       placeholder: "30ml" },
                { name: "price",    label: "Price (PKR)",  placeholder: "4800" },
                { name: "image",    label: "Image URL",    placeholder: "https://..." },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label className={label} style={font}>{field.label}</label>
                  <input
                    type={field.name === "price" ? "number" : "text"}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="px-3 py-2.5 text-xs text-neutral-700 placeholder-neutral-300 outline-none bg-white"
                    style={{ border: "1px solid rgba(0,0,0,0.1)", fontFamily: "SF Pro Text, -apple-system, sans-serif" }}
                  />
                </div>
              ))}

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className={label} style={font}>Category</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="px-3 py-2.5 text-xs text-neutral-700 outline-none bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.1)", fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Tag */}
              <div className="flex flex-col gap-1.5">
                <label className={label} style={font}>Tag (optional)</label>
                <select name="tag" value={form.tag} onChange={handleChange}
                  className="px-3 py-2.5 text-xs text-neutral-700 outline-none bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.1)", fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
                  <option value="">No tag</option>
                  {tags.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Image preview */}
            {form.image && (
              <div className="mb-4">
                <img src={form.image} alt="preview"
                  className="h-24 w-20 object-cover"
                  style={{ border: "1px solid rgba(0,0,0,0.07)" }}
                  onError={(e) => e.target.style.display = "none"}
                />
              </div>
            )}

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.25em] uppercase text-white"
                style={{ background: saving ? "rgba(0,0,0,0.4)" : "#1a1a1a", fontFamily: "SF Pro Text, -apple-system, sans-serif" }}
              >
                <Check size={12} />
                {saving ? "Saving..." : editingId ? "Update" : "Add Product"}
              </motion.button>
              <button onClick={handleCancel}
                className="flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.25em] uppercase text-neutral-500"
                style={{ border: "1px solid rgba(0,0,0,0.1)", fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>
                <X size={12} />
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products list */}
      {loading ? (
        <p className={label} style={font}>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px"
          style={{ background: "rgba(0,0,0,0.06)" }}>
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 flex gap-3">
              {/* Image */}
              <div className="flex-shrink-0 bg-neutral-50 overflow-hidden"
                style={{ width: 56, height: 70 }}>
                {product.image ? (
                  <img src={product.image} alt={product.name}
                    className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-[8px] tracking-widest uppercase text-neutral-300">img</p>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-neutral-800 text-sm truncate" style={serif}>{product.name}</p>
                <p className={`${label} mt-0.5`} style={font}>{product.category} · {product.ml}</p>
                <p className="text-xs text-neutral-600 mt-1" style={font}>PKR {product.price?.toLocaleString()}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(product)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-800 transition-colors">
                  <Pencil size={13} strokeWidth={1.5} />
                </button>
                <button onClick={() => handleDelete(product.id)}
                  className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors">
                  <Trash2 size={13} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────
// MAIN ADMIN DASHBOARD
// ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const { allOrders } = useSelector((state) => state.orders);
  const { items: products } = useSelector((state) => state.products);

  const tabs = [
    { id: "orders",   label: "Orders",   icon: Package,     count: allOrders?.length },
    { id: "products", label: "Products", icon: ShoppingBag, count: products?.length },
  ];

  return (
    <div className="min-h-screen bg-neutral-50" style={font}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-white max-w-screen-xl mx-auto px-6 md:px-12 pt-16 pb-6"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
      >
        <p className={`${label} mb-2`} style={font}>Lumière Skin Atelier</p>
        <h1 style={{ ...serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 300, letterSpacing: "-0.01em", color: "#1a1a1a" }}>
          Admin Panel
        </h1>
      </motion.div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-8">

        {/* Tabs */}
        <div className="flex gap-1 mb-8"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-5 py-3 text-[10px] tracking-[0.25em] uppercase transition-all duration-200"
                style={{
                  fontFamily: "SF Pro Text, -apple-system, sans-serif",
                  color: activeTab === tab.id ? "#1a1a1a" : "#a3a3a3",
                  borderBottom: activeTab === tab.id ? "1px solid #1a1a1a" : "1px solid transparent",
                  marginBottom: "-1px",
                }}
              >
                <Icon size={13} strokeWidth={1.5} />
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-neutral-100 text-neutral-500 rounded-sm">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "orders" ? <OrdersTab /> : <ProductsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;