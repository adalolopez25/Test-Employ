"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Play, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/api-client";
import Image from "next/image";

const fetchFeatured = async () => {
  const data = await fetcher<any>("https://rickandmortyapi.com/api/character/1,2,3,4,5,180,242,331");
  return Array.isArray(data) ? data : [data];
};

export function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data: characters, isLoading } = useQuery({
    queryKey: ["featured-characters"],
    queryFn: fetchFeatured,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (!characters || characters.length === 0 || isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % characters.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [characters, isPaused]);

  if (isLoading) return (
    <div className="h-[80vh] w-full flex items-center justify-center bg-white/5 rounded-[3.5rem] border border-white/5">
      <Loader2 className="animate-spin text-blue-500" size={40} />
    </div>
  );

  if (!characters) return null;

  const next = () => setCurrent((prev) => (prev + 1) % characters.length);
  const prev = () => setCurrent((prev) => (prev === 0 ? characters.length - 1 : prev - 1));

  return (
    <section 
      className="relative w-full h-[85vh] overflow-hidden rounded-[3.5rem] border border-white/10 my-4 bg-slate-950/20 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {characters.map((char: any, index: number) => {
        const isCurrent = index === current;
        const [firstName, ...lastName] = char.name.split(' ');

        return (
          <div
            key={char.id}
            className={cn(
              "absolute inset-0 flex items-center transition-all duration-1200 ease-[cubic-bezier(0.23,1,0.32,1)]",
              isCurrent ? "opacity-100 translate-x-0 z-10 visible" : "opacity-0 translate-x-12 z-0 invisible"
            )}
          >
            {/* LADO IZQUIERDO: TEXTO */}
            <div className="relative z-20 w-full md:w-[50%] h-full flex flex-col justify-center pl-16 md:pr-10">
              <div className={cn(
                "transition-all duration-1000 delay-300",
                isCurrent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-0.5 w-12 bg-blue-600 rounded-full" />
                  <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em]">
                    {char.species} Detected
                  </span>
                </div>
                
                <h2 className="text-6xl md:text-[5rem] font-black italic uppercase tracking-tighter leading-[0.85] mb-8 text-white">
                  {firstName} <br />
                  <span className="text-blue-600">{lastName.join(' ')}</span>
                </h2>

                <p className="text-white/70 text-sm md:text-base font-medium mb-10 max-w-sm leading-relaxed bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 italic">
                    Ubicación: <span className="text-blue-400 font-bold">{char.location.name}</span>. <br/>
                    Origen detectado en {char.origin.name}.
                </p>

                <Link href={`/info/${char.id}`} className="relative z-30 bg-white text-black px-12 py-5 rounded-full font-black italic uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 inline-flex items-center gap-3 w-fit">
                  <Play size={18} fill="currentColor" /> Ver Perfil
                </Link>
              </div>
            </div>

            {/* LADO DERECHO: IMAGEN */}
            <div className={cn(
              "absolute top-0 right-0 w-full md:w-[70%] h-full z-0 flex items-center justify-end overflow-hidden transition-all duration-1500",
              isCurrent ? "scale-100 opacity-100" : "scale-110 opacity-0"
            )}>
              <div className="relative w-full h-full flex items-center justify-center pr-10 md:pr-24">
                <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-[140px] opacity-20 animate-pulse" />
                <div className="relative w-[80%] h-[80%]">
                  <Image 
                    src={char.image} 
                    alt={char.name}
                    fill
                    priority={index === 0}
                    className="object-contain relative drop-shadow-[0_0_80px_rgba(37,99,235,0.4)]"
                    style={{ 
                      WebkitMaskImage: 'radial-gradient(circle, black 55%, transparent 95%)',
                      maskImage: 'radial-gradient(circle, black 55%, transparent 95%)' 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* NAVEGACIÓN - CORRECCIÓN DE Z-INDEX */}
      <div className="absolute bottom-12 left-0 w-full px-16 z-50 flex items-center justify-between pointer-events-none">
        <div className="flex gap-2 bg-black/40 backdrop-blur-xl p-3 rounded-full border border-white/10 pointer-events-auto">
          {characters.map((_: any, i: number) => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-700",
                i === current ? "w-10 bg-blue-600 shadow-[0_0_15px_#2563eb]" : "w-2 bg-white/20 hover:bg-white/40"
              )} 
            />
          ))}
        </div>

        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={(e) => { e.stopPropagation(); prev(); }} 
            className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-blue-600 text-white transition-all group active:scale-90"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); next(); }} 
            className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-blue-600 text-white transition-all group active:scale-90"
          >
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}