import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Character } from "@/types/character";

interface FavoriteState {
  favorites: Character[];
  addFavorite: (item: Character) => void;
  removeFavorite: (id: number) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (item) => {
        const exists = get().favorites.find((f) => f.id === item.id);
        if (!exists) {
          set({ favorites: [...get().favorites, item] });
        }
      },
      removeFavorite: (id) => {
        set({ favorites: get().favorites.filter((f) => f.id !== id) });
      },
    }),
    { name: "animehero-favorites" }
  )
);