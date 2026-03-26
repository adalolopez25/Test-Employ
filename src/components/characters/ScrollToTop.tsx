"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-">
      <button
        onClick={scrollToTop}
        className={`
          group relative flex h-14 w-14 items-center justify-center 
          rounded-2xl border border-white/10 bg-blue-500 
          backdrop-blur-xl transition-all duration-500
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}
          hover:border-blue-500/50 hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]
        `}
      >
        <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-blue-500/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        
        <ChevronUp 
          size={24} 
          className="relative z-10 text-slate-400 transition-colors duration-300 group-hover:text-white group-hover:scale-110" 
        />
      </button>
    </div>
  );
};