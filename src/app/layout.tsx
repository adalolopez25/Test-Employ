// app/layout.tsx
import Container from "@/components/layout/header/Container";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      {/* Añadimos clases de Tailwind para asegurar que el body ocupe todo */}
      <body className="min-h-screen flex flex-col">
        <Container>
          <Header />
          <main className="flex-1 w-full">
            {/* Si Container tiene un max-width, ponlo solo rodeando al children o dentro de las páginas */}
            {children}
          </main>
        </Container>
      </body>
    </html>
  );
}
