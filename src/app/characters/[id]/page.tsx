'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/layout/header/Container";
import Loading from "@/app/loading"; // tu componente de loading

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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-900">
        <Loading />
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-900 text-white">
        <p>{error || "Personaje no encontrado"}</p>
      </div>
    );
  }

  return (
    <Container className="flex flex-col items-center justify-center min-h-screen bg-slate-900 py-10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 max-w-6xl w-full">
        {/* Imagen grande */}
        <div className="shrink-0">
          <img
            src={character.image}
            alt={character.name}
            className="w-80 md:w-100 h-auto rounded-2xl shadow-2xl"
          />
        </div>

        {/* Información del personaje */}
        <div className="flex-1 text-white space-y-4">
          <h1 className="text-5xl font-extrabold">{character.name}</h1>
          <p className="text-lg text-gray-300">
            <strong>Estado:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full font-semibold ${
                character.status === "Alive"
                  ? "bg-green-400 text-slate-900"
                  : character.status === "Dead"
                  ? "bg-red-500 text-white"
                  : "bg-gray-400 text-slate-900"
              }`}
            >
              {character.status}
            </span>
          </p>
          <p className="text-lg text-gray-300"><strong>Especie:</strong> {character.species}</p>
          {character.type && <p className="text-lg text-gray-300"><strong>Tipo:</strong> {character.type}</p>}
          <p className="text-lg text-gray-300"><strong>Género:</strong> {character.gender}</p>
          <p className="text-lg text-gray-300"><strong>Origen:</strong> {character.origin.name}</p>
          <p className="text-lg text-gray-300"><strong>Ubicación:</strong> {character.location.name}</p>

          {/* Botón de volver */}
          <button
            onClick={() => router.back()}
            className="mt-6 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    </Container>
  );
}
