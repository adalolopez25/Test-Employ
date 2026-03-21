export function AboutSeries() {
  return (
    /* 1. Usamos max-w-full con un padding lateral que coincida con el del banner */
    <section className="w-full px-4  mb-20"> 
      
      {/* 2. El contenedor interno usa el mismo redondeado y ancho que el banner */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Lado Izquierdo: El contenido principal (Proporción 2/3) */}
        <div className="flex-[2] bg-white/[0.03] border border-white/10 rounded-[3.5rem] p-12 md:p-16 flex flex-col justify-center">
          <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-6">
            Base de datos interactiva
          </span>
          
          <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.85] mb-8">
            Rick & Morty <br />
            <span className="text-blue-600 font-black">Multiverse</span>
          </h2>
          
          <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
            Una plataforma diseñada para explorar cada rincón de la serie. 
            Desde la Ciudadela hasta las dimensiones más remotas, 
            esta terminal organiza los registros de todas las temporadas existentes.
          </p>
        </div>

        {/* Lado Derecho: Estadísticas (Proporción 1/3) */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Card Temporadas */}
          <div className="flex-1 bg-blue-600/10 border border-blue-500/20 rounded-[3.5rem] p-10 flex flex-col justify-center">
            <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-3">
              Temporadas
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-black italic text-white leading-none">07</span>
              <span className="text-blue-500/40 font-black italic text-xl">SEASONS</span>
            </div>
          </div>

          {/* Card Episodios */}
          <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-[3.5rem] p-10 flex flex-col justify-center">
            <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-3">
              Episodios
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-black italic text-white leading-none">71</span>
              <span className="text-white/10 font-black italic text-xl">CAPS</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}