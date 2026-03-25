// src/lib/api-client.ts
import { useAuthStore } from "@/hooks/store/useAuthStore";

export const fetcher = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const isExternal = endpoint.startsWith("http");
  const url = isExternal ? endpoint : `${process.env.NEXT_PUBLIC_APP_URL || ""}${endpoint}`;
  const token = useAuthStore.getState().token;

  // 1. Convertimos los headers externos a un formato manipulable
  // Usamos la clase Headers nativa para normalizar cualquier formato de entrada
  const headers = new Headers(options?.headers);

  // 2. Seteamos los valores por defecto si no existen
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // 3. Inyección de token
  if (token && !isExternal) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Error: ${res.statusText}`);
  }

  return res.json();
};