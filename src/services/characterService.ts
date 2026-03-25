import type { ApiResponse } from "@/types/ApiResponse";
import { fetcher } from "@/lib/api-client"; // Importamos tu nuevo cliente pro

export const characterService = {
  // 1. Obtener personajes (API Externa)
  getCharacters: async (page: number, name: string): Promise<ApiResponse> => {
    // El fetcher ya sabe si es una URL externa por el "https://"
    return fetcher<ApiResponse>(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${name}`
    );
  },

  // 2. Obtener ratings (API Propia / MongoDB)
  getUserRatings: async () => {
    // Fíjate que ya NO necesitamos pasar el token como parámetro. 
    // El api-client lo sacará de Zustand o Cookies automáticamente.
    return fetcher<any[]>("/api/ratings");
  },

  // 3. Obtener un solo personaje (Para tu CharacterPage)
  getSingleCharacter: async (id: string | number) => {
    return fetcher<any>(`https://rickandmortyapi.com/api/character/${id}`);
  }
};