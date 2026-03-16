"use client";

import { useEffect, useState } from "react";
import { Card } from "@/app/components/Card";
import Loading from "../loading";
import type { Character } from "@/types/character";
import Link from "next/link";

export default function RatedPage() {
  const [ratedCharacters, setRatedCharacters] = useState<Character[]>([]);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Cargar ratings de LocalStorage
    const savedRatings = JSON.parse(localStorage.getItem("rm-ratings") || "{}");
    setRatings(savedRatings);

    // 2. Obtener los IDs que tienen rating > 0
    const ratedIds = Object.keys(savedRatings).filter(id => savedRatings[id] > 0);

    if (ratedIds.length === 0) {
      setLoading(false);
      return;
    }

    // 3. Fetch de esos personajes específicos
    const fetchRated = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${ratedIds.join(",")}`);
        const data = await res.json();
        // Si es solo uno, la API devuelve un objeto, si son varios devuelve un array
        setRatedCharacters(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error al cargar calificados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRated();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen text-white py-10 px-4 md:px-8 max-w-7xl mx-auto">
      <header className="mb-12">
        <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors mb-4 inline-block">
          ← Volver al inicio
        </Link>
        <h1 className="text-4xl md:text-6xl font-black mt-2">Mis Calificados</h1>
        <p className="text-slate-400 mt-2">Personajes que has puntuado en el multiverso.</p>
      </header>

      {ratedCharacters.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700">
          <p className="text-xl text-slate-500">Aún no has calificado a nadie...</p>
          <Link href="/" className="mt-4 inline-block bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-500 transition">
            Ir a calificar
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {ratedCharacters.map((char) => (
            <Card 
              key={char.id} 
              character={char} 
              rating={ratings[char.id]} 
              // Pasamos una función vacía o una que actualice localmente para que las estrellas sean visibles
              onRate={(id, val) => {
                const newRatings = { ...ratings, [id]: val };
                setRatings(newRatings);
                localStorage.setItem("rm-ratings", JSON.stringify(newRatings));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}