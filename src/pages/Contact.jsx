import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white"
      style={{ fontFamily: "SF Pro Text, -apple-system, sans-serif" }}>

      {/* Header */}
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
          Contact Us
        </h1>
      </motion.div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-4 py-12"
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="20" y="2" width="24" height="24" transform="rotate(45 20 20)"
                    stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
                  <path d="M13 20l4 4 10-10" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.5rem", fontWeight: 300, color: "#1a1a1a",
                }}>
                  Message Sent
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Thank you, {form.name}. We'll get back to you shortly.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 hover:text-neutral-800 transition-colors text-left mt-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-5">
                <p className="text-[9px] tracking-[0.35em] uppercase text-neutral-400 mb-2">
                  Send a Message
                </p>

                {[
                  { name: "name",    label: "Full Name",     placeholder: "Your name",          type: "text" },
                  { name: "email",   label: "Email Address", placeholder: "your@email.com",     type: "email" },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="px-4 py-3 text-sm text-neutral-700 placeholder-neutral-300 outline-none bg-transparent"
                      style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                    />
                  </div>
                ))}

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    className="px-4 py-3 text-sm text-neutral-700 placeholder-neutral-300 outline-none bg-transparent resize-none"
                    style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full py-4 text-[11px] tracking-[0.3em] uppercase text-white"
                  style={{ background: "#1a1a1a" }}
                >
                  Send Message
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Right — Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-10 lg:pt-10"
          >
            <div>
              <p className="text-[9px] tracking-[0.35em] uppercase text-neutral-400 mb-6">
                Get in Touch
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                We'd love to hear from you. Whether you have a question about our products,
                need skincare advice, or want to place a custom order — we're here.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                { icon: Mail,    label: "Email",   value: "hello@lumiere.pk" },
                { icon: Phone,   label: "Phone",   value: "+92 300 0000000" },
                { icon: MapPin,  label: "Location", value: "Karachi, Pakistan" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                    <Icon size={13} strokeWidth={1.5} className="text-neutral-400" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.25em] uppercase text-neutral-400 mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm text-neutral-700">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <rect x="30" y="2" width="38" height="38" transform="rotate(45 30 30)"
                  stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />
                <rect x="30" y="10" width="24" height="24" transform="rotate(45 30 30)"
                  stroke="rgba(0,0,0,0.04)" strokeWidth="0.6" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;