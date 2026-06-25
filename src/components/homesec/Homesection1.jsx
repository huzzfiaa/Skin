import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import img2 from "../../assets/images/a-high-end-editorial-macro-photograph-of_zYHRUgoMQHSwlJ_akBJo6A_MDnwEfpUQiWWw2jnPZaP1g_sd.jpeg";
import img4 from "../../assets/images/a-photorealistic-product-photograph-of-a_RQgTtNx6TOW3bHcuvlPoJw_aKIh_CZbSIavpLkhXcU0fA_sd.jpeg";

// ── SVG Doodles ──────────────────────────────────────────────────────────────
const FloatingBlob = ({ className }) => (
  <motion.svg
    className={className}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ rotate: 360 }}
    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
  >
    <path
      fill="rgba(212,175,55,0.08)"
      d="M44.3,-57.1C56.5,-46.3,64.8,-30.8,67.2,-14.2C69.6,2.4,66.1,20.2,57.2,34.2C48.3,48.2,34,58.4,17.6,64.5C1.2,70.6,-17.3,72.6,-32.4,66.2C-47.5,59.8,-59.2,45,-65.4,28.2C-71.6,11.4,-72.3,-7.4,-65.8,-23C-59.3,-38.6,-45.6,-51,-30.7,-61.1C-15.8,-71.2,0.3,-79,15.4,-76.4C30.5,-73.8,32.1,-67.9,44.3,-57.1Z"
      transform="translate(100 100)"
    />
  </motion.svg>
);

const GridLines = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const DiamondAccent = ({ className }) => (
  <motion.svg
    className={className}
    width="24" height="24" viewBox="0 0 24 24"
    animate={{ opacity: [0.3, 0.7, 0.3] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <rect x="12" y="0" width="17" height="17" transform="rotate(45 12 12)"
      fill="none" stroke="rgba(212,175,55,0.6)" strokeWidth="1" />
  </motion.svg>
);

// ── Floating Card ─────────────────────────────────────────────────────────────
const BrandCard = () => (
  <motion.div
    className="relative w-72 md:w-80"
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Glow behind card */}
    <div className="absolute -inset-4 rounded-3xl bg-amber-400/10 blur-2xl" />

    {/* Card */}
    <div
      className="relative rounded-2xl overflow-hidden border border-white/10"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={img4}
          alt="LUMIÈRE brand"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-px bg-amber-400" />
          <span className="text-amber-400 text-[10px] tracking-[0.25em] uppercase font-medium">
            Signature Collection
          </span>
        </div>

        <p className="text-white/90 text-sm leading-relaxed font-light mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          "Crafted for those who understand that true luxury lives in the ritual, not the result."
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-xs font-medium tracking-wider">LUMIÈRE</p>
            <p className="text-white/40 text-[10px] tracking-widest uppercase">Skin Atelier</p>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-2.5 h-2.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
const Homesection1 = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  // Text animation variants
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };
  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1.1, ease: "easeOut" } },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center"
    >
      {/* ── Background Image with parallax ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale: bgScale, y: bgY }}
      >
        <img
          src={img2}
          alt="background"
          className="w-full h-full object-cover object-center"
        />
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </motion.div>

      {/* ── Grid Lines ── */}
      <GridLines />

      {/* ── Floating Blobs ── */}
      <FloatingBlob className="absolute -top-20 -left-20 w-96 h-96 pointer-events-none" />
      <FloatingBlob className="absolute -bottom-32 right-10 w-[28rem] h-[28rem] pointer-events-none" />

      {/* ── Diamond Accents ── */}
      <DiamondAccent className="absolute top-1/4 left-1/3 hidden md:block" />
      <DiamondAccent className="absolute bottom-1/3 right-1/4 hidden md:block" />

      {/* ── Vertical label ── */}
      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-amber-400/60" />
        <span
          className="text-white/30 text-[9px] tracking-[0.4em] uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Est. 2024
        </span>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-amber-400/60" />
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

          {/* Left — Typography */}
          <motion.div
            className="flex-1 max-w-2xl"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-amber-400" />
              <span className="text-amber-400 text-[11px] tracking-[0.35em] uppercase font-medium">
                Lumière Skin Atelier
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-white leading-[1.05] mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(3rem, 7vw, 6rem)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              Skin That
              <br />
              <span className="italic text-amber-200/90">Remembers</span>
              <br />
              <span style={{ fontWeight: 600 }}>Itself.</span>
            </motion.h1>

            {/* Divider */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-amber-400/50" />
              <div className="w-2 h-2 rounded-full border border-amber-400/50" />
              <div className="w-32 h-px bg-white/10" />
            </motion.div>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-10 max-w-md"
              style={{ fontFamily: "Garamond, Georgia, serif", letterSpacing: "0.01em" }}
            >
              Formulated at the intersection of science and ceremony — where each ritual becomes an act of self-knowing.
            </motion.p>

            {/* CTA Row */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <motion.button
                className="relative px-8 py-3.5 text-sm tracking-[0.15em] uppercase font-medium overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #B8860B)",
                  color: "#0a0a0a",
                  borderRadius: "2px",
                  letterSpacing: "0.12em",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a href="products"   className="relative z-10">Explore Collection</a>
                <motion.div
                  className="absolute inset-0 bg-white/20"   
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>

              <motion.button
                className="flex items-center gap-2 text-white/60 text-sm tracking-widest uppercase hover:text-white/90 transition-colors duration-300"
                whileHover={{ x: 4 }}
              >
                <span>Our Story</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeIn}
              className="flex gap-8 mt-14 pt-8 border-t border-white/10"
            >
              {[
                { num: "12+", label: "Actives" },
                { num: "98%", label: "Natural Origin" },
                { num: "5K+", label: "Rituals Daily" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-white text-2xl mb-0.5"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                  >
                    {s.num}
                  </p>
                  <p className="text-white/35 text-[10px] tracking-[0.2em] uppercase">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Brand Card */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrandCard />

            {/* Decorative ring behind card */}
            <motion.div
              className="absolute -z-10 w-96 h-96 rounded-full border border-amber-400/10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute" }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Bottom scroll hint ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-amber-400/60 to-transparent"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-white/25 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Homesection1;