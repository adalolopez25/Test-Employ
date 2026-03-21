"use client";

import { useEffect, useState } from "react";
import { Card } from "@/app/components/Card";
import Loading from "../loading"; // O tu componente de carga
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function RatedPage() {
  const [ratedCharacters, setRatedCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRated = async () => {
      try {
        const res = await fetch("/api/ratings"); // Tu ruta de API
        const data = await res.json();
        
        // Filtramos para mostrar solo los que tienen rating > 0
        setRatedCharacters(data.filter((item: any) => item.rating > 0));
      } catch (error) {
        console.error("Error cargando calificados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRated();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="text-white py-10 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <nav className="mb-12">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Volver al Multiverso
        </Link>
      </nav>

      <header className="mb-16">
        <h1 className="text-5xl font-black italic bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-orange-500 mb-2">
          MIS CALIFICADOS
        </h1>
        <p className="text-slate-500 uppercase tracking-widest text-sm">Personajes guardados en tu base de datos</p>
      </header>

      {ratedCharacters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {ratedCharacters.map((char: any) => (
            <Card 
              key={char.characterId}
              // Mapeamos los datos de la DB al formato que espera la Card
              character={{
                id: char.characterId,
                name: char.name,
                image: char.image,
                species: char.species,
                status: char.status,
                origin: { name: char.origin ,url : ""},
                location: { name: char.location , url : ""},
                type: char.type,
                gender: char.gender,
                
              }}
              rating={char.rating}
              // Re-usamos la lógica de calificar por si quieres cambiarla desde aquí
              onRate={async (id, val) => {
                // Aquí podrías copiar la lógica de handleUpdateInteraction si quieres permitir editar
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-slate-500 text-xl italic">Aún no has calificado a nadie en esta dimensión...</p>
          <Link href="/" className="text-blue-400 hover:underline mt-4 inline-block">Ir a calificar</Link>
        </div>
      )}
    </div>
  );
}