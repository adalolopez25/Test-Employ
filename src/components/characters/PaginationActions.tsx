"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export const PaginationActions = ({ current, total, onChange }: PaginationProps) => {
  const handlePrev = () => {
    onChange(Math.max(1, current - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    onChange(Math.min(total, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex items-center justify-center gap-8 py-10">
      <button
        onClick={handlePrev}
        disabled={current === 1}
        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-400 disabled:opacity-20 disabled:hover:bg-white/5 transition-all group"
      >
        <ChevronLeft size={20} className="group-active:scale-75 transition-transform" />
      </button>

      <div className="flex flex-col items-center">
        <span className="text-blue-500 text-2xl font-black italic leading-none">{current}</span>
        <span className="text-slate-500 text-[9px] uppercase font-bold tracking-widest text-center mt-1">
          Página
        </span>
      </div>

      <button
        onClick={handleNext}
        disabled={current === total}
        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-400 disabled:opacity-20 disabled:hover:bg-white/5 transition-all group"
      >
        <ChevronRight size={20} className="group-active:scale-75 transition-transform" />
      </button>
    </div>
  );
};