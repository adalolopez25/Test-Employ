"use client";

import { useState, useEffect, useRef } from "react";

interface StatusFilterProps {
  onFilterChange: (status: string) => void;
}
const DropDownMenu = ({ onFilterChange }: StatusFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("all");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event : KeyboardEvent) => {
        if(event.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const option = ["all", "Alive", "Dead", "unknown"];

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onFilterChange(option);
  };

  return (
    <div className="relative inline-block text-left w-48" ref={menuRef}>
      {/* Botón Principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg flex justify-between items-center border border-slate-700 hover:bg-slate-700 transition"
      >
        <span>Estado: {selected}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <ul className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
          {option.map((option) => (
            <li key={option}>
              <button
                onClick={() => handleSelect(option)}
                className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-blue-600 hover:text-white transition"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownMenu;
