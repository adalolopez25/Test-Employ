"use client";

import { WifiOff } from "lucide-react";

export const ErrorState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-40 text-blue-500 italic">
      <WifiOff size={48} className="mb-4 opacity-50 animate-pulse" />
      <p className="font-black uppercase tracking-widest text-center max-w-xs">
        Fallo en la sincronización 
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-6 text-[10px] font-bold uppercase tracking-widest border-b border-blue-500/30 pb-1 hover:text-white hover:border-white transition-colors"
      >
        Reintentar conexión
      </button>
    </div>
  );
};