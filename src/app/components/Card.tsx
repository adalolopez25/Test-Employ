"use client";

import React, { useState } from "react";
import type { Character } from "@/types/character";
import { useRouter } from "next/navigation";

interface CardProps {
  character: Character;
  rating?: number;
  onRate?: (id: number, value: number) => void;
  onOpen?: () => void;
}

export const Card = ({ character, rating = 0, onRate, onOpen }: CardProps) => {
  const router = useRouter();
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleUpdateInteraction = async (
    rating: number,
    isFavorite: boolean,
  ) => {
    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          characterId: character.id, // ID del personaje de la API de Rick & Morty
          userId: "user_2026", // Por ahora manual, luego vendrá de un Login
          rating: rating,
          isFavorite: isFavorite,
          name: character.name,
          image: character.image,
          status: character.status,
          species: character.species,
          origin: character.origin.name,
          location: character.location.name,
          type : character.type,
          gender : character.gender,
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
    router.push(`/characters/${character.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative w-full max-w-70 h-105 rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-slate-950 transition-all duration-500 ease-[cubic-bezier(0.17,0.67,0.3,1)] hover:-translate-y-4 hover:shadow-2xl hover:shadow-black/60"
    >
      {/* Imagen con Zoom */}
      <img
        src={character.image}
        alt={character.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.17,0.67,0.3,1)] group-hover:scale-110"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80 z-10" />

      {/* Botón "View Details" (Glassmorphism) */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 opacity-0 z-30 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 px-6 py-2.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-md text-[10px] font-bold tracking-[2px] uppercase text-white whitespace-nowrap">
        View details
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-20 transition-all duration-500 group-hover:translate-y-10 group-hover:opacity-0">
        <h3 className="text-white text-xl font-extrabold drop-shadow-md">
          {character.name}
        </h3>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 bg-linear-to-t from-slate-900 via-slate-900/90 to-transparent translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
        <div className="mb-4">
          <h4 className="text-white text-lg font-bold mb-3">
            {character.name}
          </h4>

          <div className="space-y-1.5 text-xs text-slate-300">
            <p>
              <span className="text-slate-500 uppercase tracking-tighter mr-1">
                Status:
              </span>{" "}
              <b className="text-slate-100">{character.status}</b>
            </p>
            <p>
              <span className="text-slate-500 uppercase tracking-tighter mr-1">
                Species:
              </span>{" "}
              <b className="text-slate-100">{character.species}</b>
            </p>
            <p>
              <span className="text-slate-500 uppercase tracking-tighter mr-1">
                Origin:
              </span>{" "}
              <b className="text-slate-100">{character.origin.name}</b>
            </p>
            <p>
              <span className="text-slate-500 uppercase tracking-tighter mr-1">
                Location:
              </span>{" "}
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
                    handleUpdateInteraction(n, false)
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
  );
};
