import type { ApiResponse } from "@/core/types/ApiResponse"; 
import type { Character } from "@/core/types/character";     
import { fetcher } from "@/lib/api-client";

export const characterService = {
  getCharacters: async (page: number, name: string): Promise<ApiResponse> => {
    return fetcher<ApiResponse>(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${name}`
    );
  },

  getSingleCharacter: async (id: string | number): Promise<Character> => {
    return fetcher<Character>(`https://rickandmortyapi.com/api/character/${id}`);
  },

  getUserRatings: async () => {
    return fetcher<any[]>("/api/ratings");
  }
};