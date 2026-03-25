import Container from "@/components/layout/header/Container";
import "./index.css";
import Header from "@/components/layout/header/Header";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "@/app/Provider";
import { ScrollToTop } from "./characters/components/ScrollToTop";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={geist.variable}>
      {/* Forzamos el fondo oscuro global aquí */}
      <body className="min-h-screen flex flex-col bg-[#050505] text-white antialiased">
        <Providers>
          <Container>
            <Header />
            <main className="flex-1 w-full relative">
              {children}
              <ScrollToTop />
            </main>
          </Container>
          <Toaster position="top-right" theme="dark" closeButton />
        </Providers>
      </body>
    </html>
  );
}