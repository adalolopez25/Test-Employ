"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Zap, Target, Globe, Fingerprint } from "lucide-react";
import Image from "next/image";
import { fetcher } from "@/lib/api-client";
import  {InfoSkeleton}  from "@/app/components/skeletons/InfoSkeleton";
import { cn } from "@/lib/utils";

export default function CharacterInfoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const { data: char, isLoading, error } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetcher<any>(`https://rickandmortyapi.com/api/character/${id}`),
    enabled: isReady, // Solo dispara la query cuando el cliente está listo
    staleTime: 1000 * 60 * 30, // 30 min de cache
  });

  if (!isReady || isLoading) return <InfoSkeleton />;
  if (error || !char) return <ErrorView />;

  return (
    <div className="min-h-screen bg-transparent text-slate-200 relative overflow-hidden font-sans">
      {/* Luces de Fondo (Blue & Green Neon) */}
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-6 md:px-12">
        {/* Navegación */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-3 text-slate-500 hover:text-blue-400 transition-all mb-12"
        >
          <div className="p-2 rounded-full border border-white/10 group-hover:border-blue-500/50 bg-white/5">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Volver al Registro</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* SECCIÓN IMAGEN */}
          <div className="relative w-full lg:w-auto flex justify-center lg:block">
            <div className={cn(
              "absolute -inset-4 rounded-[4rem] blur-2xl opacity-20 transition-opacity duration-1000",
              char.status === 'Alive' ? 'bg-emerald-500' : 'bg-red-600'
            )} />
            
            <div className="relative w-80 h-80 md:w-125 md:h-125 rounded-[3.5rem] overflow-hidden border border-white/10 bg-slate-900 group shadow-2xl">
              <Image
                src={char.image}
                alt={char.name}
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Overlay de escaneo */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* SECCIÓN DATOS */}
          <div className="flex-1 w-full space-y-10">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className={cn(
                  "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border animate-pulse",
                  char.status === 'Alive' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
                )}>
                  Status: {char.status}
                </span>
                <span className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {char.species}
                </span>
              </div>
              <h1 className="text-6xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.85] text-white">
                {char.name.split(' ')} <br />
                <span className="text-blue-600">{char.name.split(' ').slice(1).join(' ')}</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard icon={<Fingerprint size={16}/>} label="Género" value={char.gender} />
              <InfoCard icon={<Globe size={16}/>} label="Origen" value={char.origin.name} />
              <InfoCard icon={<Target size={16}/>} label="Ubicación Actual" value={char.location.name} />
              <InfoCard icon={<Zap size={16}/>} label="Tipo/Raza" value={char.type || "Estándar"} />
            </div>

                      </div>
        </div>
      </div>
      
      	
    </div>
  );
}

// COMPONENTES AUXILIARES
function InfoCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 hover:border-blue-500/30 transition-all group">
      <div className="flex items-center gap-3 mb-3 text-slate-500 group-hover:text-blue-400 transition-colors">
        {icon}
        <p className="text-[10px] font-black uppercase tracking-widest">{label}</p>
      </div>
      <p className="text-lg font-bold text-white truncate italic">{value}</p>
    </div>
  );
}

function ErrorView() {
  return (
    <div className="h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-6">
      <h2 className="text-4xl font-black text-white italic uppercase mb-4">Sujeto No Detectado</h2>
      <p className="text-slate-500 mb-8 max-w-md">El ID proporcionado no corresponde a ninguna entidad registrada en el Nexo Central.</p>
      <button onClick={() => window.history.back()} className="px-8 py-4 bg-blue-600 text-white font-black uppercase rounded-full tracking-widest italic shadow-xl shadow-blue-600/20">
        Reintentar Escaneo
      </button>
    </div>
  );
}