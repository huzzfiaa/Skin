import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = () => {
  const loaderRef = useRef(null);
  const shineRef = useRef(null);

  useEffect(() => {
    // rotate shine smoothly
    gsap.to(shineRef.current, {
      rotate: 360,
      duration: 1.5,
      ease: "linear",
      repeat: -1,
    });

    // subtle breathing effect
    gsap.to(loaderRef.current, {
      scale: 1.08,
      duration: 1.2,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
      
      <div
        ref={loaderRef}
        className="relative w-20 h-20 rounded-full 
        bg-white/10 backdrop-blur-xl border border-white/20 
        shadow-[0_0_25px_rgba(255,255,255,0.2),inset_0_0_12px_rgba(255,255,255,0.1)]
        overflow-hidden"
      >
        <div
          ref={shineRef}
          className="absolute inset-0 
          bg-gradient-to-tr from-transparent via-white/50 to-transparent"
        />
      </div>

    </div>
  );
};

export default Loader;