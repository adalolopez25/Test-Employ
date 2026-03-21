import Container from "@/components/layout/header/Container";
import "./index.css"; // Asegúrate que el nombre sea correcto
import Header from "@/components/layout/header/Header";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Providers } from "@/app/Provider"; // Importamos el cliente de TanStack

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col bg-[#050505]" suppressHydrationWarning>
        <Providers>
          <Container>
            <Header />
            <main className="flex-1 w-full">
              {children}
            </main>
          </Container>
          
          {/* TOASTER CONFIGURADO PARA LA CÁPSULA EN LA ESQUINA */}
          <Toaster 
            position="bottom-right" 
            theme="dark"           
            expand={false}        
            visibleToasts={3}
            toastOptions={{
              // Quitamos estilos de aquí para que el toast.custom tenga libertad total
              className: "font-sans",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}