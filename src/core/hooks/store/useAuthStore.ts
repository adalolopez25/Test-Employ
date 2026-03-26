import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  image?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => {
        set({ user });
      },

      logout: async () => {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
          });
        } catch (error) {
          console.error("Logout error:", error);
        }

        set({ user: null });

        localStorage.removeItem("animehero-auth");
      },
    }),
    { name: "animehero-auth" }
  )
);