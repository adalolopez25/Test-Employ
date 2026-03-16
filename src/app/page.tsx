"use client";

import { useEffect, useState } from "react";
import { Card } from "@/app/components/Card";
import Modal from "@/components/layout/ui/Modal";
import Loading from "./loading";
import type { Character } from "@/types/character";
import type { ApiResponse } from "@/types/ApiResponse";
import AOS from "aos";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, Star } from "lucide-react";

export default function Home() {
  // Estados principales
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  
  // Estados de Paginación y Búsqueda
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Estado de Ratings (Persistencia)
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

  // 1. Inicialización de Datos Locales y Animaciones
  useEffect(() => {
    const saved = localStorage.getItem("rm-ratings");
    if (saved) setRatings(JSON.parse(saved));

    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // 2. Fetch de Personajes (Se activa al cambiar página o búsqueda)
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
        const res = await fetch(url);
        
        if (!res.ok) {
          setCharacters([]);
          setTotalPages(0);
        } else {
          const data: ApiResponse = await res.json();
          setCharacters(data.results);
          setTotalPages(data.info.pages);
        }
        
        setLoading(false);
        setTimeout(() => AOS.refresh(), 100);
      } catch (err) {
        console.error("Error fetching characters:", err);
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchCharacters();
    }, 300); // Pequeño retraso para no saturar la API mientras escribes

    return () => clearTimeout(debounceTimer);
  }, [page, searchQuery]);

  // 3. Manejo de Calificaciones
  const handleRate = (id: number, value: number) => {
    const newRatings = { ...ratings, [id]: value };
    setRatings(newRatings);
    localStorage.setItem("rm-ratings", JSON.stringify(newRatings));
  };

  if (loading && page === 1 && !searchQuery) {
    return <div className="flex items-center justify-center min-h-screen"><Loading /></div>;
  }

  return (
    <div className="text-white py-10 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Navegación Superior */}
      <nav className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text"
            placeholder="Buscar personaje..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1); // Resetear a página 1 al buscar
            }}
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 outline-none focus:border-blue-500 transition-all backdrop-blur-sm"
          />
        </div>

        <Link 
          href="/rated" 
          className="flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/30 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all font-bold group"
        >
          <Star size={18} className="group-hover:rotate-12 transition-transform" />
          Ver Calificados
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="text-center mb-16">
        <h1 className="font-extrabold text-6xl md:text-8xl mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-300 italic tracking-tighter">
          Rick & Morty
        </h1>
        <p className="text-slate-500 text-sm uppercase tracking-[0.4em] font-medium">Rick and Morty Database</p>
      </header>

      {/* Grilla de Resultados */}
      {characters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {characters.map((character, i) => (
            <div
              key={`${character.id}-${page}`}
              data-aos="fade-up"
              data-aos-delay={(i % 4) * 50}
              onClick={() => setSelectedCharacter(character)}
            >
              <Card 
                character={character} 
                onRate={handleRate} 
                rating={ratings[character.id] || 0} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-slate-500 text-xl italic">No se encontraron personajes en esta dimensión...</p>
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-6 pb-20">
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setPage(p => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={page === 1}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-600 disabled:opacity-20 disabled:hover:bg-transparent transition-all group"
            >
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <div className="flex flex-col items-center">
              <span className="text-blue-400 text-3xl font-black">{page}</span>
              <span className="text-slate-600 text-[10px] uppercase font-bold tracking-widest">de {totalPages}</span>
            </div>

            <button
              onClick={() => {
                setPage(p => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={page === totalPages}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-600 disabled:opacity-20 disabled:hover:bg-transparent transition-all group"
            >
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-700 ease-out" 
              style={{ width: `${(page / totalPages) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Modal de Detalle */}
      {selectedCharacter && (
        <Modal 
          title={selectedCharacter.name} 
          onClose={() => setSelectedCharacter(null)}
        >
          <div className="flex flex-col md:flex-row gap-8 p-4">
            <img 
              src={selectedCharacter.image} 
              alt={selectedCharacter.name}
              className="w-full md:w-1/2 rounded-3xl border border-white/10 shadow-2xl"
            />
            <div className="flex-1 space-y-6 flex flex-col justify-center">
              <div className="space-y-1">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Origin</p>
                <p className="text-2xl text-white font-semibold">{selectedCharacter.origin.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Current Location</p>
                <p className="text-2xl text-white font-semibold">{selectedCharacter.location.name}</p>
              </div>
              <div className={`inline-block px-4 py-2 rounded-xl border w-fit font-bold ${
                selectedCharacter.status === 'Alive' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}>
                {selectedCharacter.status} • {selectedCharacter.species}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}