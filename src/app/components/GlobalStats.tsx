"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, Globe, Tv } from "lucide-react";

const fetchGlobalStats = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  if (!res.ok) throw new Error("Fallo al conectar con la API central.");
  return res.json();
};

export function GlobalStats() {
  const { data: stats } = useQuery({
    queryKey: ["global-stats"],
    queryFn: fetchGlobalStats,
    staleTime: 1000 * 60 * 30, // 30 min de caché, no cambian mucho
  });

  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full" data-aos="fade-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 border-l-2 border-blue-600 pl-6">
        <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
          Estatus <br /> Global
        </h2>
        <p className="text-slate-500 text-xs font-bold leading-relaxed max-w-md uppercase tracking-wider">
          Sincronización en tiempo real con el servidor central de Rick & Morty. <br />
          Información del Multiverso catalogada hasta la fecha.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <StatCard icon={<Users size={20}/>} value={stats?.info?.count || "826+"} label="Personajes Catalogados" />
        <StatCard icon={<Globe size={20}/>} value="126" label="Locaciones Identificadas" />
        <StatCard icon={<Tv size={20}/>} value="51" label="Episodios Catalogados" />
        <StatCard icon={<Users size={20}/>} value="7" label="Temporadas Activas" />
      </div>
    </section>
  );
}

// Sub-componente interno para StatCard (Reutilizable aquí)
function StatCard({ icon, value, label }: { icon: any, value: string | number, label: string }) {
  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-start gap-3 hover:border-blue-500/50 transition-colors group">
      <div className="text-blue-500 opacity-50 mb-1 group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-4xl font-black italic text-white tracking-tighter leading-none">{value}</span>
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-tight">{label}</span>
    </div>
  );
}