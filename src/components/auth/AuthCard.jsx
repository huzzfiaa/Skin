import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AuthCard = ({ children }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative p-10 rounded-3xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Inner glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,125,0.6), transparent)" }}
      />
      {children}
    </div>
  );
};

export default AuthCard;