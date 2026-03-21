"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Play, ChevronLeft, ChevronRight, Loader2, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const fetchFeatured = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character/1,2,3,4,5,180,242,331"); 
  if (!res.ok) throw new Error("Error en la terminal");
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
};

export function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data: characters, isLoading } = useQuery({
    queryKey: ["featured-characters"],
    queryFn: fetchFeatured,
  });

  useEffect(() => {
    if (!characters || characters.length === 0 || isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % characters.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [characters, isPaused]);

  if (isLoading) return (
    <div className="h-[80vh] w-full flex items-center justify-center bg-white/5 rounded-[3.5rem]">
      <Loader2 className="animate-spin text-blue-500" size={40} />
    </div>
  );

  if (!characters) return null;

  const next = () => setCurrent((prev) => (prev + 1) % characters.length);
  const prev = () => setCurrent((prev) => (prev === 0 ? characters.length - 1 : prev - 1));

  return (
    <section 
      className="relative w-full h-[85vh] overflow-hidden rounded-[3.5rem] border border-white/10 my-4 bg-transparent group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {characters.map((char: any, index: number) => {
        const total = characters.length;
        const isCurrent = index === current;
        const isPrev = index === (current === 0 ? total - 1 : current - 1);

        return (
          <div
            key={char.id}
            className={cn(
              "absolute inset-0 flex items-center transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
              isCurrent 
                ? "opacity-100 translate-x-0 z-20 visible" 
                : isPrev
                  ? "opacity-0 -translate-x-full z-0 invisible" 
                  : "opacity-0 translate-x-full z-0 invisible"
            )}
          >
            {/* --- CONTENIDO (IZQUIERDA EXTREMA) --- */}
            <div className="relative z-100 w-full md:w-[45%] h-full flex flex-col justify-center pl-12 md:pr-24">
              <div className={cn(
                "transition-all duration-1000 delay-300",
                isCurrent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-[2px] w-12 bg-blue-600 rounded-full" />
                  <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em]">
                    {char.species} Protocol
                  </span>
                </div>
                
                <h2 className="text-6xl md:text-[7.5rem] font-black italic uppercase tracking-tighter leading-[0.8] mb-8 text-white drop-shadow-2xl">
                  {char.name.split(' ')[0]} <br />
                  <span className="text-blue-600">{char.name.split(' ').slice(1).join(' ')}</span>
                </h2>

                <p className="text-white/80 text-sm md:text-lg font-medium mb-10 max-w-md leading-relaxed bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 italic">
                  Sujeto detectado en <span className="text-blue-400 font-bold">{char.location.name}</span>. 
                  Origen: {char.origin.name}. Analizando compatibilidad multiversal...
                </p>

                <Link href={`/info/${char.id}`} className="bg-white text-black px-12 py-5 rounded-full font-black italic uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 inline-flex items-center gap-3 w-fit">
                  <Play size={18} fill="currentColor" /> Analizar
                </Link>
              </div>
            </div>

            {/* --- IMAGEN (DERECHA Y LIMPIA) --- */}
            <div className={cn(
              "absolute top-0 right-0 w-full md:w-[65%] h-full z-[30] flex items-center justify-end overflow-hidden transition-all duration-[1500ms]",
              isCurrent ? "scale-100 opacity-100" : "scale-110 opacity-0"
            )}>
              <div className="relative w-[500px] h-[500px] md:w-[850px] md:h-[850px] flex items-center justify-center pr-10 md:pr-24">
                <div className="absolute inset-0 bg-blue-600/10 rounded-lg blur-[140px] opacity-30 animate-pulse" />
                <img 
                  src={char.image} 
                  className="w-[85%] h-[85%] object-contain relative z-[40] drop-shadow-[0_0_50px_rgba(37,99,235,0.3)] "
                  alt={char.name}
                  style={{ 
                    WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 95%)',
                    maskImage: 'radial-gradient(circle, black 60%, transparent 95%)' 
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* --- BARRA DE PERSONAJES Y NAVEGACIÓN --- */}
      <div className="absolute bottom-12 left-0 w-full px-12 md:px-24 z-[110] flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Barra de Progreso */}
        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full">
          <div className="flex gap-2">
            {characters.map((_: any, i: number) => (
              <div 
                key={i} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-700",
                  i === current ? "w-12 bg-blue-600 shadow-[0_0_10px_#2563eb]" : "w-2 bg-white/20"
                )} 
              />
            ))}
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-4">
          <button onClick={prev} className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-blue-600 text-white transition-all group">
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button onClick={next} className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-blue-600 text-white transition-all group">
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}