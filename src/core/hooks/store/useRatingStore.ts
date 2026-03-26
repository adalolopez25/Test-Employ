import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Rating {
  characterId: number;
  characterName: string;
  image: string;
  value: number;
}

interface RatingStore {
  ratings: Rating[];
  setRating: (rating: Rating) => void;
}

export const useRatingStore = create<RatingStore>()(
  persist(
    (set) => ({
      ratings: [],
      setRating: (newRating) => set((state) => {
        const index = state.ratings.findIndex(r => r.characterId === newRating.characterId);
        if (index > -1) {
          const updated = [...state.ratings];
          updated[index] = newRating;
          return { ratings: updated };
        }
        return { ratings: [...state.ratings, newRating] };
      }),
    }),
    { name: 'user-ratings-storage' }
  )
);