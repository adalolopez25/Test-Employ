import type { ApiResponse } from "@/core/types/ApiResponse"; 
import type { Character } from "@/core/types/character";     
import { fetcher } from "@/lib/api-client";

export const characterService = {
  // 1. Obtener personajes con paginación y filtro
  getCharacters: async (page: number, name: string): Promise<ApiResponse> => {
    return fetcher<ApiResponse>(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${name}`
    );
  },

  // 2. Obtener un solo personaje con su tipo real
  getSingleCharacter: async (id: string | number): Promise<Character> => {
    return fetcher<Character>(`https://rickandmortyapi.com/api/character/${id}`);
  },

  // 3. Obtener ratings (API Propia)
  getUserRatings: async () => {
    return fetcher<any[]>("/api/ratings");
  }
};