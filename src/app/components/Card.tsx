'use client';

import React, { useState } from "react";
import styled from "styled-components";
import type { Character } from "@/types/character";
import { useRouter } from "next/navigation";

interface CardProps {
  character: Character;
  rating?: number;
  onRate?: (id: number, value: number) => void;
  onOpen?: () => void;
}

/* ================== STYLES ================== */

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 280px;
  height: 420px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.17, 0.67, 0.3, 1), box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-20px);
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.7);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.17, 0.67, 0.3, 1);

  ${CardContainer}:hover & {
    transform: scale(1.15);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  opacity: 0;
  transition: opacity 0.5s ease;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

// Botón "View details" elegante - centrado, solo al hover
const ViewDetailsButton = styled.div`
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  background: rgba(15, 23, 42, 0.75);
  color: #f1f5f9;
  font-size: 0.5rem;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 14px 32px;
  border-radius: 9999px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  opacity: 0;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${CardContainer}:hover & {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.9;
    background : none;

  }
`;

const NamePlate = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 16px;
  text-align: center;
  pointer-events: none;

  h3 {
    color: #f1f5f9;
    font-size: 1.35rem;
    font-weight: 700;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
    margin: 0;
    transition: transform 0.4s ease;
  }

  ${CardContainer}:hover h3 {
    transform: translateY(-8px);
  }
`;

const DetailsPanel = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 70px;
  height:100%;
  background: linear-gradient(to top, #1e293b 0%, #1e293be6 70%, transparent 100%);
  padding: 80px 20px 24px 20px;
  color: #cbd5e1;

  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s ease;

  ${CardContainer}:hover & {
    transform: translateY(0);
    opacity: 0.5;
  }
`;

const DetailItem = styled.p`
  margin: 10px 0;
  font-size: 0.92rem;

  span {
    color: #f8fafc;
    font-weight: 600;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
`;

const Star = styled.span<{ $filled: boolean }>`
  cursor: pointer;
  font-size: 1.4rem;
  color: ${({ $filled }) => ($filled ? "#facc15" : "#64748b")};
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.25);
  }
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

      <Overlay />
      <HoverOverlay />

      {/* Botón elegante centrado que aparece solo al hover */}

      <NamePlate>
        <h3>{character.name}</h3>
      </NamePlate>

      <DetailsPanel>
        <DetailItem><span>Status:</span> {character.status}</DetailItem>
        <DetailItem><span>Species:</span> {character.species}</DetailItem>
        {character.type && <DetailItem><span>Type:</span> {character.type}</DetailItem>}
        <DetailItem><span>Gender:</span> {character.gender}</DetailItem>
        <DetailItem><span>Origin:</span> {character.origin.name}</DetailItem>
        <DetailItem><span>Location:</span> {character.location.name}</DetailItem>

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
      </DetailsPanel>
      <ViewDetailsButton>View details</ViewDetailsButton>
    </CardContainer>
  );
};