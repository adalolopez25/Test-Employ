import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-white px-4">
      {/* Efecto de Glitch/Neon en el 404 */}
      <h1 className="text-9xl font-black italic tracking-tighter text-blue-600 animate-pulse drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]">
        404
      </h1>
      
      <div className="text-center mt-4">
        <h2 className="text-2xl font-black uppercase italic tracking-widest mb-2">
          Salto Interdimensional Fallido
        </h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-10">
          Has aterrizado en una zona muerta del multiverso.
        </p>
      </div>

      <Link href="/characters">
        <button className="px-10 py-4 bg-blue-600 rounded-2xl font-black uppercase text-[10px] tracking-[3px] italic 
                           hover:bg-white hover:text-blue-600 transition-all duration-300 
                           shadow-[0_0_30px_rgba(37,99,235,0.3)] active:scale-95">
          Regresar a la Base
        </button>
      </Link>
      
      {/* Decoración de fondo sutil */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]" />
    </div>
  );
}