"use client";

import React, { useState } from "react";
import type { Character } from "@/types/character";
import { useRouter } from "next/navigation";
import { Heart as HeartIcon } from "lucide-react";
import { useAuthStore } from "@/hooks/store/useAuthStore"
import { useFavoriteStore } from "@/hooks/store/useFavoriteStore"; 
; 


interface CardProps {
  character: Character;
  rating?: number;
  onRate?: (id: number, value: number) => void;
  onOpen?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number, value: boolean) => void;
}

export const Card = ({
  character,
  rating = 0,
  onRate,
  onOpen,
  isFavorite = false,
  onToggleFavorite,
}: CardProps) => {
  const router = useRouter();
  const [hoveredStar, setHoveredStar] = useState(0);
  const [favorite, setFavorite] = useState(isFavorite);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const addFavorite  =  useFavoriteStore((state) => state.addFavorite);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);
  // Obtenemos el usuario actual desde zustand
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = Boolean(user);

  const handleUpdateInteraction = async (rating: number, isFavorite: boolean) => {
    if (!user) return; // No enviamos nada si no hay sesión

    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterId: character.id,
          userId: user.id, // <-- usamos el id real
          rating,
          isFavorite,
          name: character.name,
          image: character.image,
          status: character.status,
          species: character.species,
          origin: character.origin.name,
          location: character.location.name,
          type: character.type,
          gender: character.gender,
        }),
      });

      if (!response.ok) throw new Error("Error al guardar en BD");
      const data = await response.json();
      console.log("Sincronizado con MongoDB:", data);
    } catch (error) {
      console.error("Fallo la conexión con el servidor:", error);
    }
  };

  const handleCardClick = () => {
    onOpen?.();
    router.push(`//${character.id}`);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
  e.stopPropagation();

  if (!user) {
    setShowLoginAlert(true);
    return;
  }

  if (!favorite) {
    addFavorite(character); // agrega al store
  } else {
    removeFavorite(character.id); // elimina del store
  }

  setFavorite(!favorite);
  handleUpdateInteraction(rating, !favorite);
};

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group relative w-full max-w-70 h-105 rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-slate-950 transition-all duration-500 ease-[cubic-bezier(0.17,0.67,0.3,1)] hover:-translate-y-4 hover:shadow-2xl hover:shadow-black/60"
      >
        <img
          src={character.image}
          alt={character.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.17,0.67,0.3,1)] group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80 z-10" />

        {/* Corazón favoritos */}
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 z-50 p-3 rounded-full  shadow-lg"
        >
          <HeartIcon
            fill={favorite ? "red" : "white"}
            size={28}
            className={`transition-colors duration-300 ${
              favorite ? `hover:scale-130` : `hover:scale-130 hover:transition-transform hover:animate-out`
            }`}
          />
        </button>

        {/* Botón "View Details" */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 opacity-0 z-30 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 px-6 py-2.5 rounded-full border border-white/40 bg-blue-500 backdrop-blur-md text-[10px] font-bold tracking-[2px] uppercase text-white whitespace-nowrap">
          View details
        </div>

        {/* Nombre */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-20 transition-all duration-500 group-hover:translate-y-10 group-hover:opacity-0">
          <h3 className="text-white text-xl font-extrabold drop-shadow-md">
            {character.name}
          </h3>
        </div>

        {/* Información al hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 bg-linear-to-t from-slate-900 via-slate-900/90 to-transparent translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
          <div className="mb-4">
            <h4 className="text-white text-lg font-bold mb-3">{character.name}</h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p>
                <span className="text-slate-500 uppercase tracking-tighter mr-1">Status:</span>{" "}
                <b className="text-slate-100">{character.status}</b>
              </p>
              <p>
                <span className="text-slate-500 uppercase tracking-tighter mr-1">Species:</span>{" "}
                <b className="text-slate-100">{character.species}</b>
              </p>
              <p>
                <span className="text-slate-500 uppercase tracking-tighter mr-1">Origin:</span>{" "}
                <b className="text-slate-100">{character.origin.name}</b>
              </p>
              <p>
                <span className="text-slate-500 uppercase tracking-tighter mr-1">Location:</span>{" "}
                <b className="text-slate-100">{character.location.name}</b>
              </p>
            </div>
          </div>

          {onRate && (
            <div
              className="flex justify-center gap-1.5 pt-4 border-t border-white/10"
              onMouseLeave={() => setHoveredStar(0)}
            >
              {[1, 2, 3, 4, 5].map((n) => {
                const isFilled = hoveredStar ? hoveredStar >= n : rating >= n;
                return (
                  <span
                    key={n}
                    onMouseEnter={() => setHoveredStar(n)}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRate(character.id, n);
                      handleUpdateInteraction(n, favorite);
                    }}
                    className={`text-xl cursor-pointer transition-transform duration-200 hover:scale-125 ${
                      isFilled ? "text-yellow-400" : "text-slate-600"
                    }`}
                  >
                    ★
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal de alerta si no está logeado */}
      {showLoginAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowLoginAlert(false)}>
          <div className="bg-slate-900 p-6 rounded-xl max-w-xs text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white font-bold mb-2">Necesitas iniciar sesión</h3>
            <p className="text-slate-300 mb-4">Para agregar favoritos, primero debes iniciar sesión.</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              onClick={() => setShowLoginAlert(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </> 
  );
};