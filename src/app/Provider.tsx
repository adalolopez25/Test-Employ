"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes"; // Importante instalar: npm install next-themes
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
    <QueryClientProvider client={queryClient}>
      {/* Envolvemos todo con el ThemeProvider. 
          attribute="class" permite que Tailwind use la clase .dark 
      */}
      <NextThemesProvider 
        attribute="class" 
        defaultTheme="dark" 
        enableSystem={true}
      >
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
}