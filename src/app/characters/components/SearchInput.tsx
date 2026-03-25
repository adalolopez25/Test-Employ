"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export const SearchInput = ({ onSearch }: SearchInputProps) => {
  return (
    <div className="flex justify-center mb-16">
      <div className="relative w-full md:w-96 group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder="Escanear base de datos..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-12 pr-6 outline-none focus:border-blue-500/50 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm text-white placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};