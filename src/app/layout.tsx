// app/layout.tsx
import Container from "@/components/layout/header/Container";
import "./globals.css";
import Header from "@/components/layout/header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
