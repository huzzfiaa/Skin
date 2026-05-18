import { useRef } from "react";
import { gsap } from "gsap";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  error,
  loading,
}) => {
  const btnRef = useRef(null);

  const handleEnter = () => {
    gsap.to(btnRef.current, { scale: 1.03, duration: 0.2, ease: "power2.out" });
  };
  const handleLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
  };

  const inputBase = {
    background: "rgba(30, 60, 120, 0.15)",
    border: "1px solid rgba(99, 155, 255, 0.15)",
    color: "#ffffff",                              // ✅ white text
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "0.95rem",
    letterSpacing: "0.03em",
  };

  const inputFocus = (e) => {
    e.target.style.border = "1px solid rgba(99, 155, 255, 0.55)";
    e.target.style.background = "rgba(30, 80, 180, 0.12)";
    e.target.style.boxShadow = "none";
  };

  const inputBlur = (e) => {
    e.target.style.border = "1px solid rgba(99, 155, 255, 0.15)";
    e.target.style.background = "rgba(30, 60, 120, 0.15)";
    e.target.style.boxShadow = "none";
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">

      {error && (
        <p
          className="text-center text-sm py-2 px-4 rounded-lg"
          style={{
            color: "#f87171",
            background: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.2)",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {error}
        </p>
      )}

      {/* Email Input */}
      <div className="relative">
        <MdOutlineEmail
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: "rgba(99,155,255,0.6)" }}
          size={18}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          type="email"
          className="w-full pl-11 pr-4 py-3.5 rounded-xl outline-none transition-all duration-300"
          style={inputBase}
          onFocus={inputFocus}
          onBlur={inputBlur}
        />
      </div>

      {/* Password Input */}
      <div className="relative">
        <MdLockOutline
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: "rgba(99,155,255,0.6)" }}
          size={18}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full pl-11 pr-4 py-3.5 rounded-xl outline-none transition-all duration-300"
          style={{
            ...inputBase,
            color: "#ffffff",                      // ✅ white dots & text
          }}
          onFocus={inputFocus}
          onBlur={inputBlur}
        />
      </div>

      {/* Submit Button */}
      <button
        ref={btnRef}
        type="submit"
        disabled={loading}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="w-full py-3.5 rounded-xl font-medium tracking-widest uppercase text-sm transition-opacity"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e3a8a 100%)",
          backgroundSize: "200% 200%",
          color: "#ffffff",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.8rem",
          letterSpacing: "0.2em",
          boxShadow: "none",
          animation: "gradientShift 3s ease infinite",
        }}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Cinzel:wght@400;500&display=swap');
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        input::placeholder { color: rgba(255,255,255,0.35); }
      `}</style>
    </form>
  );
};

export default LoginForm;