import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/m/auth/authSlice";
import { logoutUser } from "../../firebase/auth";
import { toggleCart } from "../../features/m/cart/cartSlice";

import {
  Home, Sparkles, Tag, Mail,
  ShoppingBag, LogOut, User, Menu, X,
} from "lucide-react";

const navLinks = [
  { label: "Home",     path: "/",         icon: Home },
  { label: "Products", path: "/products", icon: Sparkles },
  { label: "Sales",    path: "/sales",    icon: Tag },
  { label: "Contact",  path: "/contact",  icon: Mail },
];

const NavItem = ({ item, isActive }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const Icon = item.icon;

  return (
    <button
      ref={ref}
      onClick={() => navigate(item.path)}
      onMouseEnter={() => gsap.to(ref.current, { y: -1, duration: 0.2, ease: "power2.out" })}
      onMouseLeave={() => gsap.to(ref.current, { y: 0,  duration: 0.2, ease: "power2.out" })}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200"
      style={{
        background: isActive ? "rgba(59,130,246,0.12)" : "transparent",
        border:     isActive ? "1px solid rgba(59,130,246,0.3)" : "1px solid transparent",
      }}
    >
      <Icon size={15} style={{ color: isActive ? "#2563eb" : "#64a0dc", flexShrink: 0 }} />
      <span style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "0.7rem", letterSpacing: "0.12em", fontWeight: 500,
        background: isActive ? "linear-gradient(135deg, #1d4ed8, #38bdf8)" : "transparent",
        WebkitBackgroundClip: isActive ? "text" : "unset",
        WebkitTextFillColor: isActive ? "transparent" : "unset",
        color: isActive ? "transparent" : "#3b82f6",
      }}>
        {item.label}
      </span>
    </button>
  );
};

const Navbar = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    navigate("/login");
  };

  const navStyle = {
    background: "rgba(219,234,254,0.75)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(147,197,253,0.5)",
    boxShadow: "0 4px 24px rgba(59,130,246,0.10), inset 0 1px 0 rgba(255,255,255,0.8)",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:wght@300;400&display=swap');
      `}</style>

      {/* ── DESKTOP ── */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex">
        <nav className="flex items-center gap-1 px-3 py-2 rounded-full" style={navStyle}>

          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2 px-3 mr-2">
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #1d4ed8, #38bdf8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(59,130,246,0.3)",
            }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.75rem", fontWeight: 600, color: "#fff" }}>L</span>
            </div>
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: "0.7rem",
              letterSpacing: "0.22em", fontWeight: 500,
              background: "linear-gradient(135deg, #1d4ed8, #38bdf8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>LUMIÈRE</span>
          </button>

          <div style={{ width: 1, height: 20, background: "rgba(59,130,246,0.2)", margin: "0 4px" }} />

          {navLinks.map((item) => (
            <NavItem key={item.path} item={item} isActive={location.pathname === item.path} />
          ))}

          <div style={{ width: 1, height: 20, background: "rgba(59,130,246,0.2)", margin: "0 4px" }} />

          {user ? (
            <div className="flex items-center gap-1">

              {/* Cart */}
              <button
                onClick={() => dispatch(toggleCart())}
                className="relative flex items-center px-3 py-2 rounded-full transition-all duration-200"
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(59,130,246,0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <ShoppingBag size={15} style={{ color: "#3b82f6" }} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white"
                    style={{
                      background: "linear-gradient(135deg, #1d4ed8, #38bdf8)",
                      fontSize: "9px", fontFamily: "'Cinzel', serif",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Dashboard */}
              <button
                onClick={() => navigate(role === "admin" ? "/admin" : "/dashboard")}
                className="flex items-center px-3 py-2 rounded-full transition-all duration-200"
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(59,130,246,0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <User size={15} style={{ color: "#3b82f6" }} />
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                  e.currentTarget.style.border = "1px solid rgba(239,68,68,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.08)";
                  e.currentTarget.style.border = "1px solid rgba(239,68,68,0.2)";
                }}
              >
                <LogOut size={13} style={{ color: "rgba(239,68,68,0.8)" }} />
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.12em", color: "rgba(239,68,68,0.8)" }}>
                  Logout
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-4 py-2 rounded-full ml-1 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #38bdf8)",
                boxShadow: "0 2px 12px rgba(59,130,246,0.3)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#fff" }}>
                Sign In
              </span>
            </button>
          )}
        </nav>
      </div>

      {/* ── MOBILE ── */}
      <div className="fixed top-4 left-4 right-4 z-50 flex md:hidden">
        <nav className="flex items-center justify-between w-full px-4 py-3 rounded-2xl" style={navStyle}>
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: "0.85rem",
            letterSpacing: "0.22em", fontWeight: 500,
            background: "linear-gradient(135deg, #1d4ed8, #38bdf8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>LUMIÈRE</span>

          <div className="flex items-center gap-2">
            {/* Mobile cart badge */}
            <button onClick={() => dispatch(toggleCart())} className="relative p-1">
              <ShoppingBag size={18} style={{ color: "#3b82f6" }} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white"
                  style={{
                    background: "linear-gradient(135deg, #1d4ed8, #38bdf8)",
                    fontSize: "9px", fontFamily: "'Cinzel', serif",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "#3b82f6" }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div
            className="absolute top-16 left-0 right-0 rounded-2xl p-4 flex flex-col gap-2"
            style={{
              background: "rgba(219,234,254,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(147,197,253,0.5)",
              boxShadow: "0 8px 32px rgba(59,130,246,0.12)",
            }}
          >
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setMobileOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: location.pathname === item.path ? "rgba(59,130,246,0.1)" : "transparent",
                    border:     location.pathname === item.path ? "1px solid rgba(59,130,246,0.25)" : "1px solid transparent",
                  }}
                >
                  <Icon size={16} style={{ color: "#3b82f6" }} />
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.75rem", letterSpacing: "0.12em", color: "#1d4ed8" }}>
                    {item.label}
                  </span>
                </button>
              );
            })}

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl mt-1"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <LogOut size={16} style={{ color: "rgba(239,68,68,0.8)" }} />
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.75rem", letterSpacing: "0.12em", color: "rgba(239,68,68,0.8)" }}>
                  Logout
                </span>
              </button>
            ) : (
              <button
                onClick={() => { navigate("/login"); setMobileOpen(false); }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl mt-1"
                style={{ background: "linear-gradient(135deg, #1d4ed8, #38bdf8)", boxShadow: "0 2px 12px rgba(59,130,246,0.3)" }}
              >
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#fff" }}>
                  Sign In
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;