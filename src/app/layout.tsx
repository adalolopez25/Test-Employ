import Container from "@/components/layout/header/Container";
import "./index.css";
import Header from "@/components/layout/header/Header";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Providers } from "@/app/Provider";
import ProtectedApp from "@/app/protectedApp/page"; // Tu advertencia de clave

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
          {/* 🔒 Aquí envolvemos toda la app en ProtectedApp */}
          <ProtectedApp>
            <Container>
              <Header />
              <main className="flex-1 w-full">
                {children}
              </main>
            </Container>
          </ProtectedApp>

          {/* TOASTER CONFIGURADO PARA LA CÁPSULA EN LA ESQUINA */}
          <Toaster 
            position="bottom-right" 
            theme="dark"           
            expand={false}        
            visibleToasts={3}
            toastOptions={{
              className: "font-sans",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}