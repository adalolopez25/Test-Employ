"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link"; // Usamos Link de Next.js para la navegación

const CHARACTERS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: i === 0 ? "Rick Sanchez" : i === 1 ? "Morty Smith" : `Specimen ${i + 1}`,
  status: i % 2 === 0 ? "Alive" : "Dead",
  species: "Humanoid",
  image: `https://rickandmortyapi.com/api/character/avatar/${i + 1}.jpeg`,
}));

export function CharacterRow() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-20 bg-transparent group/section overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 mb-10 flex justify-between items-end">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
            Personajes <span className="text-blue-600 font-black">Principales</span>
          </h2>
        </div>
        
        {/* Enlace rápido opcional arriba (opcional, el principal está en la grilla) */}
        <Link 
          href="/characters" 
          className="hidden md:flex items-center gap-2 text-blue-500 font-black uppercase italic tracking-widest text-[10px] hover:text-white transition-colors group/link"
        >
           Bases de Datos
          <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="relative w-full">
        {/* Flechas Navegación */}
        <button onClick={() => scroll("left")} className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-blue-600/10 backdrop-blur-md text-white border border-white/10 hover:bg-blue-600 transition-all opacity-0 group-hover/section:opacity-100">
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
        <button onClick={() => scroll("right")} className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-blue-600/10 backdrop-blur-md text-white border border-white/10 hover:bg-blue-600 transition-all opacity-0 group-hover/section:opacity-100">
          <ChevronRight size={28} strokeWidth={3} />
        </button>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide px-12 py-8 transition-all duration-500">
          {CHARACTERS.map((char, index) => {
            const isLast = index === CHARACTERS.length - 1;
            return (
              <div 
                key={char.id}
                className={`
                  relative h-[400px] md:h-[480px] min-w-[220px] md:min-w-[260px] 
                  hover:min-w-[420px] md:hover:min-w-[480px] 
                  transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                  group/card cursor-pointer rounded-[2.5rem] overflow-hidden
                  ${isLast ? 'origin-right' : 'origin-left'}
                `}
              >
                <img src={char.image} alt={char.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover/card:opacity-90" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter leading-tight group-hover/card:text-4xl transition-all duration-500">{char.name}</h3>
                    <div className="max-h-0 opacity-0 group-hover/card:max-h-32 group-hover/card:opacity-100 transition-all duration-700 delay-200 overflow-hidden">
                      <div className="mt-4 flex items-center gap-3">
                        <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase rounded-lg italic shadow-[0_0_15px_rgba(37,99,235,0.4)]">{char.status}</span>
                        <span className="text-blue-400 text-[9px] font-black uppercase tracking-[0.2em]">{char.species}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* BOTÓN "VER MÁS" AL FINAL DE LA GRILLA */}
          <div className="flex-none flex items-center justify-center pl-10 pr-20">
            <Link 
              href="/characters"
              className="group/btn relative flex flex-col items-center gap-6"
            >
              {/* Círculo Minimalista con Icono */}
              <div className="w-24 h-24 rounded-full border-2 border-white/10 flex items-center justify-center transition-all duration-500 group-hover/btn:border-blue-600 group-hover/btn:bg-blue-600 group-hover/btn:shadow-[0_0_40px_rgba(37,99,235,0.4)] group-hover/btn:scale-110">
                <ArrowRight size={32} className="text-white/30 group-hover/btn:text-white transition-colors" />
              </div>
              
              {/* Texto Vertical / Minimalista */}
              <div className="flex flex-col items-center">
                <span className="text-blue-600 font-black italic uppercase tracking-[0.3em] text-[10px] mb-1">
                  Explorar
                </span>
                <span className="text-white font-black italic uppercase tracking-tighter text-3xl group-hover/btn:text-blue-500 transition-colors">
                  Ver Más
                </span>
              </div>

              {/* Efecto de Brillo de fondo */}
              <div className="absolute -z-10 w-40 h-40 bg-blue-600/5 blur-[80px] rounded-full group-hover/btn:bg-blue-600/20 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}