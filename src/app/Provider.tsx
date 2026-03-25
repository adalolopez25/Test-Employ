"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Configuración de React Query
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, 
        retry: 2, 
        refetchOnWindowFocus: false, 
      },
    },
  }));

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {/* Eliminamos NextThemesProvider ya que tu app es nativamente oscura */}
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}