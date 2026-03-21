"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/app/components/Card";
import Modal from "@/components/layout/ui/Modal";
import Loading from "@/components/layout/ui/Loading";
import type { Character } from "@/types/character";
import type { ApiResponse } from "@/types/ApiResponse";
import AOS from "aos";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  X,
  WifiOff,
} from "lucide-react";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { toast } from "sonner";

// --- FETCHERS ---
const fetchCharacters = async (
  page: number,
  name: string,
): Promise<ApiResponse> => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${name}`,
  );
  if (!res.ok) throw new Error("Error de red");
  return res.json();
};

const fetchRatings = async (token: string | null) => {
  if (!token) return [];
  const res = await fetch("/api/ratings", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("DB Error");
  return res.json();
};

export default function CharactersPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const { token } = useAuthStore();

  // --- QUERIES ---
  const { data, isLoading, isError } = useQuery({
    queryKey: ["characters", page, searchQuery],
    queryFn: () => fetchCharacters(page, searchQuery),
    placeholderData: (prev) => prev,
  });

  const { data: ratingsData } = useQuery({
    queryKey: ["ratings", token],
    queryFn: () => fetchRatings(token),
    enabled: !!token,
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // --- TOAST CÁPSULA (72px) ---
  const handleRate = async (id: number, value: number) => {
    if (!token) {
      toast.custom(
        (t) => (
          <div className="bg-[#0a0a0a] border border-white/10 w-95 h-18 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center px-6 gap-4 overflow-hidden relative">
            <div className="absolute bottom-0 left-0 h-0.75 bg-blue-600 animate-shrink-width" />
            <div className="bg-blue-600/10 p-2.5 rounded-xl border border-blue-600/20 text-blue-500">
              <ShieldAlert size={20} />
            </div>
            <div className="flex-1 text-[12px]">
              <span className="font-black text-white italic uppercase block mb-0.5">
                Acceso Denegado
              </span>
              Identificación requerida para calificar.
            </div>
            <button onClick={() => toast.dismiss(t)}>
              <X size={18} className="text-slate-600" />
            </button>
          </div>
        ),
        { duration: 5000 },
      );
      return;
    }
  };

  const Pagination = () => (
    <div className="flex items-center justify-center gap-8 py-10">
      <button
        onClick={() => {
          setPage((p) => Math.max(1, p - 1));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={page === 1}
        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 disabled:opacity-20 transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <div className="flex flex-col items-center">
        <span className="text-blue-500 text-2xl font-black italic">{page}</span>
        <span className="text-slate-500 text-[9px] uppercase font-bold tracking-widest text-center">
          Página
        </span>
      </div>
      <button
        onClick={() => {
          setPage((p) => Math.min(data?.info.pages || 1, p + 1));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={page === data?.info.pages}
        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 disabled:opacity-20 transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );

  if (isLoading && !data) return <Loading />;

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center py-40 text-blue-500 italic">
        <WifiOff size={48} className="mb-4 opacity-50" />
        <p className="font-black uppercase tracking-widest text-center">
          Fallo en la sincronización multiversal
        </p>
      </div>
    );

  return (
    <div className="text-white py-10 min-h-screen">
      {/* SEARCH ENGINE */}
      <div className="flex justify-center mb-16">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Escanear base de datos..."
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-12 pr-6 outline-none focus:border-blue-500 transition-all text-sm"
          />
        </div>
      </div>

      <header className="text-center mb-16" data-aos="zoom-in">
        <h1 className="font-black text-6xl md:text-[8rem] mb-2 bg-clip-text text-transparent bg-linear-to-b from-white to-white/10 italic tracking-tighter uppercase leading-none">
          Rick & Morty
        </h1>
        <p className="text-blue-500 text-[10px] font-black tracking-[1.2em] uppercase opacity-70">
          AnimeHero Data Engine
        </p>
      </header>

      {/* PAGINACIÓN SUPERIOR */}
      {data?.info.pages! > 1 && <Pagination />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {data?.results.map((char: Character, i: number) => (
          <div
            key={char.id}
            data-aos="fade-up"
            data-aos-delay={(i % 4) * 50}
            onClick={() => setSelectedCharacter(char)}
            className="cursor-pointer"
          >
            <Card
              character={char}
              onRate={handleRate}
              rating={
                ratingsData?.find((r: any) => r.characterId === char.id)
                  ?.rating || 0
              }
            />
          </div>
        ))}
      </div>

      {/* PAGINACIÓN INFERIOR */}
      {data?.info.pages! > 1 && <Pagination />}

      {/* MODAL DETALLES */}
      {selectedCharacter && (
        <Modal
          title={selectedCharacter.name}
          onClose={() => setSelectedCharacter(null)}
        >
          <div className="flex flex-col md:flex-row gap-8 p-4 italic uppercase">
            <img
              src={selectedCharacter.image}
              className="w-full md:w-1/2 rounded-[2.5rem] border border-white/10"
              alt=""
            />
            <div className="flex-1 flex flex-col justify-center gap-4">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <p className="text-blue-500 text-[9px] font-black tracking-widest mb-1">
                  Status
                </p>
                <p
                  className={`text-2xl font-black ${selectedCharacter.status === "Alive" ? "text-green-400" : "text-red-500"}`}
                >
                  {selectedCharacter.status}
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <p className="text-blue-500 text-[9px] font-black tracking-widest mb-1">
                  Especie
                </p>
                <p className="text-2xl font-black text-white">
                  {selectedCharacter.species}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
