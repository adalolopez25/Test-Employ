'use client';

import React, { useState } from "react";
import styled from "styled-components";
import type { Character } from "@/types/character";
import { useRouter } from "next/navigation";

/* ================== TYPES ================== */

interface CardProps {
  character: Character;
  rating?: number; // ahora opcional
  onRate?: (id: number, value: number) => void;
  onOpen?: () => void;
}

interface StarProps {
  $filled: boolean;
}

/* ================== STYLES ================== */

const CardContainer = styled.div`
  width: 100%;
  max-width: 280px;
  height: 420px;
  background-color: #1e293b;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.55);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: #334155;
`;

const CardContent = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 180px);
`;

const CardName = styled.h3`
  color: #f1f5f9;
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 6px;
`;

const CardDetails = styled.div`
  font-size: 0.85rem;
  color: #cbd5e1;
  line-height: 1.4;

  span {
    color: #f8fafc;
    font-weight: 500;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`;

const Star = styled.span<StarProps>`
  cursor: pointer;
  font-size: 1.3rem;
  color: ${({ $filled }) => ($filled ? "#facc15" : "#64748b")};
  transition: color 0.2s ease;
`;

/* ================== COMPONENT ================== */

export const Card = ({
  character,
  rating = 0,
  onRate,
  onOpen,
}: CardProps) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(0);

  const handleCardClick = () => {
    onOpen?.();
    router.push(`/characters/${character.id}`);
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <CardImage src={character.image} alt={character.name} />

      <CardContent>
        <div>
          <CardName>{character.name}</CardName>

          <CardDetails>
            <p><span>Status:</span> {character.status}</p>
            <p><span>Species:</span> {character.species}</p>
            <p><span>Gender:</span> {character.gender}</p>
            <p><span>Origin:</span> {character.origin.name}</p>
            <p><span>Location:</span> {character.location.name}</p>
          </CardDetails>
        </div>

        {/* ⭐ SOLO EN DASHBOARD */}
        {onRate && (
          <StarsContainer onMouseLeave={() => setHovered(0)}>
            {[1, 2, 3, 4, 5].map((n) => {
              const isFilled = hovered ? hovered >= n : rating >= n;

              return (
                <Star
                  key={n}
                  $filled={isFilled}
                  onMouseEnter={() => setHovered(n)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRate(character.id, n);
                  }}
                >
                  ★
                </Star>
              );
            })}
          </StarsContainer>
        )}
      </CardContent>
    </CardContainer>
  );
};
