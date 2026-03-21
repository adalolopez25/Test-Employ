'use client';

import { Cpu, Globe, Layout, Code2, Zap, Database } from "lucide-react";

export default function About() {
  return (
    <section className="w-full px-4 md:px-8 py-24 bg-transparent">
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Encabezado con Identidad del Proyecto */}
        <div className="mb-16 pl-6 border-l-4 border-blue-600">
          <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px] block mb-2">
            Protocolo de Documentación // Ver. 16.1.7
          </span>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">
            Acerca del <span className="text-blue-600 font-black">Proyecto</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Columna Izquierda: La Narrativa Real del Desarrollo */}
          <div className="lg:col-span-8 bg-white/[0.03] border border-white/10 rounded-[3.5rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
            {/* Decoración sutil de fondo */}
            <Database size={300} className="absolute -right-20 -bottom-20 text-blue-600/5 rotate-12 pointer-events-none" />
            
            <p className="relative z-10 text-white/80 text-xl md:text-2xl leading-relaxed font-medium italic mb-10">
              "Este proyecto nace como una terminal de datos centralizada para explorar 
              la complejidad del multiverso de Rick y Morty, unificando registros biológicos 
              e interdimensionales en una interfaz de alto rendimiento."
            </p>
            
            <div className="relative z-10 space-y-6 text-white/50 text-lg leading-relaxed">
              <p>
                La aplicación ha sido desarrollada utilizando <span className="text-white font-bold">Next.js 16</span> bajo el motor de 
                <span className="text-blue-500 font-bold ml-1">Turbopack</span>, optimizando cada milisegundo de renderizado 
                para ofrecer una experiencia de usuario fluida y reactiva.
              </p>
              <p>
                A través del consumo de la <span className="text-white font-bold italic underline decoration-blue-600 underline-offset-4">Rick and Morty API</span>, 
                el sistema procesa y organiza dinámicamente información de cientos de personajes, 
                clasificándolos por su estado vital, especie y origen dimensional.
              </p>
              <p>
                El diseño visual, bajo la estética <span className="text-blue-600 font-bold tracking-widest">ANIMEHERO</span>, 
                implementa técnicas de **Glassmorphism** y un sistema de cuadrícula adaptativo (Grid) que asegura 
                la integridad de la información en cualquier dispositivo de la Ciudadela.
              </p>
            </div>

            <div className="mt-12 relative z-10">
              <a
                href="https://rickandmortyapi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-black italic uppercase tracking-tighter rounded-full hover:bg-blue-700 transition-all active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
              >
                <Globe size={18} />
                Documentación de la API
              </a>
            </div>
          </div>

          {/* Columna Derecha: El Stack Técnico Real */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            <div className="flex-1 bg-blue-600/10 border border-blue-500/20 rounded-[3rem] p-8 flex flex-col justify-center group transition-colors hover:bg-blue-600/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-500">
                  <Zap size={24} fill="currentColor" />
                </div>
                <h4 className="text-white font-black italic uppercase tracking-tighter text-xl">Rendimiento</h4>
              </div>
              <p className="text-blue-400/60 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Renderizado del lado del servidor (SSR) y optimización de imágenes nativa.
              </p>
            </div>

            <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-[3rem] p-8 flex flex-col justify-center group">
              <div className="flex items-center gap-4 mb-4 text-white/40 group-hover:text-blue-500 transition-colors">
                <Layout size={32} />
                <h4 className="text-white font-black italic uppercase tracking-tighter text-xl">UI / UX</h4>
              </div>
              <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Componentes reutilizables con Tailwind CSS v4 y animaciones interactivas.
              </p>
            </div>

            <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-[3rem] p-8 flex flex-col justify-center group">
              <div className="flex items-center gap-4 mb-4 text-white/40 group-hover:text-blue-500 transition-colors">
                <Code2 size={32} />
                <h4 className="text-white font-black italic uppercase tracking-tighter text-xl">Tipado</h4>
              </div>
              <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Desarrollo robusto con TypeScript para un manejo de datos sin errores dimensionales.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}