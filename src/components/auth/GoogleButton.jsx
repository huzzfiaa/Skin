import { useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { gsap } from "gsap";

const GoogleButton = ({ onClick, loading }) => {
  const btnRef = useRef(null);

  const handleEnter = () => {
    gsap.to(btnRef.current, { scale: 1.03, duration: 0.2, ease: "power2.out" });
  };
  const handleLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      disabled={loading}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-medium text-sm tracking-wide transition-opacity"
      style={{
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(255,255,255,0.3)",
        color: "#1a1008",                          // ✅ black text
        letterSpacing: "0.08em",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.95rem",
      }}
    >
      {loading ? (
        <span className="animate-pulse">Please wait...</span>
      ) : (
        <>
          <FcGoogle size={20} />
          Continue with Google
        </>
      )}
    </button>
  );
};

export default GoogleButton;