'use client';

import { useEffect, useState } from "react";
import Container from "@/components/layout/header/Container";
import { Card } from "@/app/components/Card";
import Modal from "@/components/layout/ui/Modal";
import Loading from "./loading";
import type { Character } from "@/types/character";
import type { ApiResponse } from "@/types/ApiResponse";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data: ApiResponse = await res.json();
      setCharacters(data.results);
      setLoading(false);
    };

    fetchCharacters();
  }, []);

  const handleRate = (id: number, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {characters.map((character) => (
          <Card
            key={character.id}
            character={character}
          />
        ))}
      </div>

      {selectedCharacter && (
        <Modal
          title={selectedCharacter.name}
          onClose={() => setSelectedCharacter(null)}
        >
          <img
            src={selectedCharacter.image}
            className="rounded-xl mb-4"
          />

          <p className="text-white">
            ⭐ Rating: {ratings[selectedCharacter.id] || "Sin calificar"}
          </p>
        </Modal>
      )}
    </Container>
  );
}
