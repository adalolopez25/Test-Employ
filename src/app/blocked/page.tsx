import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowBigDown, TriangleAlert } from "lucide-react";

const Page = () => { 
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[70vh] px-4"
      suppressHydrationWarning
    >
      <div className="flex flex-col md:flex-row items-center gap-6 justify-center mb-4">
        <TriangleAlert size={60} className="text-yellow-500 animate-pulse" />
        <h2 className="text-4xl md:text-6xl italic font-black tracking-tighter uppercase text-center">
          Acceso Restringido
        </h2>
        <TriangleAlert size={60} className="text-yellow-500 animate-pulse" />
      </div>

      <p className="text-slate-400 text-lg md:text-xl font-light tracking-widest uppercase">
        Inicia sesión para autorizar la entrada
      </p>

      <div className="mt-12 mb-12">
        <ArrowBigDown size={100} className="text-blue-500 animate-bounce" />
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/login">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-8 text-xl font-black italic uppercase rounded-none skew-x-[-10deg] transition-all hover:scale-110">
            Iniciar Sesion
          </Button>
        </Link>

        <Link href="/">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-12 py-8 text-xl font-black italic uppercase rounded-none skew-x-[-10deg] transition-all">
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;