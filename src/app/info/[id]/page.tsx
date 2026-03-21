'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/layout/header/Container";
import Loading from "@/app/loading";
import Link from "next/link";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  image: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
}

export default function CharacterPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!res.ok) throw new Error("Personaje no encontrado");
        const data: Character = await res.json();
        setCharacter(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading) return <div className="min-h-screen flex justify-center items-center bg-transparent text-white"><Loading /></div>;
  if (error || !character) return <div className="min-h-screen flex justify-center items-center bg-slate-950 text-white"><p>{error}</p></div>;

  return (
    <div className="min-h-screen bg-tranparent text-slate-200 relative overflow-hidden">
      {/* Círculos de luz de fondo (Efecto decorativo) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px]" />

      <Container className="relative z-10 py-12 px-6">
        {/* Botón Volver Minimalista */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-medium tracking-wide uppercase text-xs">Regresar al multiverso</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* LADO IZQUIERDO: Imagen con marco brillante */}
          <div className="relative group">
            <div className={`absolute -inset-1 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 ${
              character.status === 'Alive' ? 'bg-green-400' : 'bg-red-500'
            }`} />
            <img
              src={character.image}
              alt={character.name}
              className="relative w-80 md:w-[450px] rounded-2xl shadow-2xl object-cover border border-white/10"
            />
          </div>

          {/* LADO DERECHO: Información Estructurada */}
          <div className="flex-1 w-full">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter uppercase italic">
                {character.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border ${
                  character.status === 'Alive' 
                  ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${character.status === 'Alive' ? 'bg-green-400' : 'bg-red-400'}`} />
                  {character.status}
                </span>
                <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm font-bold text-slate-300">
                  {character.species}
                </span>
              </div>
            </div>

            {/* Grilla de Datos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoBox label="Gender" value={character.gender} />
              <InfoBox label="Origin" value={character.origin.name} />
              <InfoBox label="Location" value={character.location.name} />
              {character.type && <InfoBox label="Sub-type" value={character.type} />}
            </div>
            
            {/* Dato Extra Estilizado */}
            <div className="mt-8 p-6 bg-blue-600/5 border border-blue-500/20 rounded-2xl">
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">ID del Registro</p>
              <p className="text-2xl font-mono text-blue-200">#00{character.id}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

// Sub-componente interno para las cajas de info
function InfoBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{label}</p>
      <p className="text-xl text-white font-semibold truncate">{value}</p>
    </div>
  );
}