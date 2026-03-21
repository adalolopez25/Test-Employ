"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Evitamos que el cliente se recree en cada renderizado
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // La data se considera fresca por 5 min
        retry: 2, // Reintenta fallos de red automáticamente
        refetchOnWindowFocus: false, // Evita peticiones extra al cambiar de pestaña
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}