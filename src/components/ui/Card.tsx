"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Heart as HeartIcon, ShieldAlert, LogIn, Plus } from "lucide-react";
import { useAuthStore } from "@/core/hooks/store/useAuthStore";
import { useFavoriteStore } from "@/core/hooks/store/useFavoriteStore"; 
import Image from "next/image";
import { fetcher } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { toast } from "sonner"; 

export const Card = ({ character, rating = 0, onRate }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [hoveredStar, setHoveredStar] = useState(0);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // --- STORES ---
  const user = useAuthStore((state) => state.user); //
  const addFavorite = useFavoriteStore((state) => state.addFavorite);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);
  const favorites = useFavoriteStore((state) => state.favorites);

  // Verificamos si es favorito solo si hay un usuario activo
  const isFavorite = useMemo(() => 
    user ? favorites.some((fav: any) => fav.id === character.id) : false, 
    [favorites, character.id, user]
  );

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["character", String(character.id)],
      queryFn: () => fetcher(`https://rickandmortyapi.com/api/character/${character.id}`),
    });
  };

  const handleRateClick = (e: React.MouseEvent, value: number) => {
    e.stopPropagation();
    if (!user) {
      toast.custom((t) => (
        <div className="relative overflow-hidden bg-slate-900 border border-red-500/30 p-4 rounded-xl shadow-2xl flex items-center flex-col gap-3 animate-in fade-in slide-in-from-right-4">
          <ShieldAlert className="text-red-500" size={20} />
          <p className="text-white text-xs font-bold uppercase tracking-tighter">Acceso Denegado</p>
          <span className="text-gray-400 text-sm"> Debes iniciar sesión para calificar </span>
          <div className="absolute bottom-0 left-0 h-1 bg-red-500 animate-shrink-width" style={{ width: '100%' }} />
        </div>
      ), { position: "top-right", duration: 4000 });
      return;
    }
    onRate?.(character.id, value);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    // BLOQUEO: Si no hay usuario, mostramos la alerta y salimos de la función
    if (!user) {
      setShowLoginAlert(true);
      return;
    }

    // Si hay usuario, procedemos con la lógica normal
    if (isFavorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <div
      onClick={() => !showLoginAlert && router.push(`/info/${character.id}`)}
      onMouseEnter={handlePrefetch}
      className="group relative w-full h-105 rounded-3xl overflow-hidden bg-slate-950 border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <Image
        src={character.image}
        alt={character.name}
        fill
        priority={character.id <= 4}
        className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent z-10" />

      {/* Botón Corazón - Siempre visible, pero condicionado por 'user' para el color */}
      <button
        onClick={toggleFavorite}
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-white/10 transition-all active:scale-75"
      >
        <HeartIcon 
          fill={isFavorite && user ? "#ef4444" : "transparent"} 
          stroke={isFavorite && user ? "#ef4444" : "white"} 
          size={20} 
        />
      </button>

      {/* --- ALERTA DE NEXO PROTEGIDO (Tu diseño original) --- */}
      <div className={cn(
        "absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-8 transition-all duration-500 ease-in-out",
        showLoginAlert ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}>
        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
          <LogIn className="text-blue-500" size={28} />
        </div>
        <p className="text-white font-black text-xs uppercase italic tracking-[2px] mb-6">Nexo Protegido</p>
        <div className="flex flex-col gap-2 w-full">
          <button 
            onClick={(e) => { e.stopPropagation(); router.push('/login'); }} 
            className="py-3 bg-blue-600 text-[10px] font-black rounded-lg text-white uppercase italic hover:bg-blue-500 transition-colors"
          >
            Entrar al Sistema
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setShowLoginAlert(false); }} 
            className="py-3 bg-slate-800 text-[10px] font-black rounded-lg text-slate-400 uppercase italic hover:bg-slate-700 transition-colors"
          >
            Abortar
          </button>
        </div>
      </div>

      {/* --- INFORMACIÓN DEL PERSONAJE --- */}
      <div className="absolute inset-x-0 bottom-0 p-8 z-20 transition-transform duration-500 ease-[cubic-bezier(0.17,0.67,0.3,1)] group-hover:-translate-y-24">
        <h3 className="text-white text-2xl font-black italic uppercase leading-[0.9] mb-3 tracking-tighter drop-shadow-2xl">
          {character.name}
        </h3>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] space-y-1 opacity-80">
          <p>Status: <span className={character.status === 'Alive' ? 'text-emerald-400' : 'text-red-500'}>{character.status}</span></p>
          <p>Species: <span className="text-slate-200">{character.species}</span></p>
        </div>
      </div>

      {/* --- HOVER CONTROLS --- */}
      <div className="absolute inset-x-0 bottom-8 z-30 opacity-0 translate-y-8 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 flex flex-col items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/info/${character.id}`);
          }}
          className="absolute bottom-12 flex items-center gap-2 px-5 py-2 bg-blue-600/90 hover:bg-blue-500 text-white text-[10px] font-black uppercase italic rounded-full border border-blue-400/30 shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all active:scale-95"
        >
          Info <Plus size={14} strokeWidth={3} />
        </button>

        {/* Sistema de Estrellas */}
        <div className="flex gap-2 justify-center pt-4 border-t border-white/5 w-full max-w-[80%]" onMouseLeave={() => setHoveredStar(0)}>
          {[1,2,3,4,5].map((n) => (
            <span
              key={n}
              onMouseEnter={() => setHoveredStar(n)}
              onClick={(e) => handleRateClick(e, n)}
              className={cn(
                "text-2xl cursor-pointer transition-all duration-300 hover:scale-150 active:scale-90",
                (hoveredStar >= n || (!hoveredStar && rating >= n)) 
                  ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" 
                  : "text-slate-700"
              )}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};