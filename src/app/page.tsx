"use client";

import { useEffect, useState } from "react";
import { Card } from "@/app/components/Card";
import Modal from "@/components/layout/ui/Modal";
import Loading from "./loading";
import type { Character } from "@/types/character";
import type { ApiResponse } from "@/types/ApiResponse";
import AOS from "aos";
import Carousel from "@/components/layout/ui/carrousel/Carrousel"; // Nota: nombre corregido

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      once: false,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch("https://rickandmortyapi.com/api/character");
        const data: ApiResponse = await res.json();
        setCharacters(data.results);
        setLoading(false);
        AOS.refresh();
      } catch (err) {
        console.error("Error fetching characters:", err);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <Loading />
      </div>
    );
  }

  return (
    <div className=" text-white py-10 px-4 md:px-8">
        {/* Encabezado */}
        <h1 className="font-bold text-5xl md:text-6xl text-center mb-12 drop-shadow-lg">
          Rick & Morty Characters
        </h1>

        {/* Carrusel corregido */}
        <Carousel speed={1} gap="2rem">
          {characters.map((character, i) => (
            <div
              key={character.id}
              data-aos="fade-up"
              data-aos-delay={i * 50}
              className="shrink-0 w-80 md:w-96" // ← CLAVE: ancho fijo
            >
              <Card 
                character={character} 
              />
            </div>
          ))}
        </Carousel>

        {/* Modal */}
        {selectedCharacter && (
          <Modal
            title={selectedCharacter.name}
            onClose={() => setSelectedCharacter(null)}
          >
            <div className="space-y-4">
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                className="rounded-xl w-full h-auto shadow-2xl"
              />
              <div className="text-center space-y-2">
                <p className="text-lg"><strong>Status:</strong> {selectedCharacter.status}</p>
                <p className="text-lg"><strong>Species:</strong> {selectedCharacter.species}</p>
                <p className="text-lg"><strong>Origin:</strong> {selectedCharacter.origin.name}</p>
              </div>
            </div>
          </Modal>
        )}
    </div>
  );
}