import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        // Al hacer login, podrías asegurar la cookie aquí o en tu componente
        set({ user, token });
      },
      logout: () => {
        // 1. Borrar la cookie del navegador (Crucial para el Middleware)
        // Usamos max-age=0 para que expire ya mismo
        document.cookie = "session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "user-role=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        // 2. Limpiar el estado de Zustand
        set({ user: null, token: null });

        // 3. Limpiar localStorage (Zustand persist lo hace, pero por seguridad extra)
        localStorage.removeItem("animehero-auth");
      }
    }),
    { name: "animehero-auth" }
  ),
);