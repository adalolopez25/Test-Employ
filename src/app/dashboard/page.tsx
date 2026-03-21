"use client";

import React from "react";
import { Zap, Star, Clock, Settings, User, LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans">
      
      {/* Header con Personalidad */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-16">
        <div>
          <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] italic">
            Bienvenido de vuelta,
          </span>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            ANDRES <span className="text-blue-600">DAVID</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Nivel de Acceso</p>
            <p className="text-blue-500 font-black italic uppercase tracking-tighter">Administrador</p>
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-blue-600 p-1">
            <img 
              src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" 
              className="w-full h-full rounded-full grayscale hover:grayscale-0 transition-all cursor-pointer" 
              alt="Profile"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Columna Izquierda: Acciones y Estadísticas */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Card de Progreso Humano */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:border-blue-600/50 transition-all group">
            <div className="flex justify-between items-start mb-6">
               <div className="p-3 bg-blue-600 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] text-white">
                 <Zap size={24} fill="currentColor" />
               </div>
               <span className="text-white/20 font-black text-4xl group-hover:text-blue-600/20 transition-colors italic">01</span>
            </div>
            <h3 className="text-2xl font-black italic uppercase mb-2 tracking-tighter">Tu Actividad</h3>
            <p className="text-white/50 text-sm font-medium leading-relaxed mb-6">
              Has explorado 42 variantes multiversales esta semana. Estás en el top 5% de recolectores.
            </p>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-3/4 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
            </div>
          </div>

          {/* Menú de Navegación Lateral */}
          <nav className="space-y-3">
            {[
              { label: "Mis Favoritos", icon: <Star size={20} />, active: true },
              { label: "Historial de Búsqueda", icon: <Clock size={20} /> },
              { label: "Configuración", icon: <Settings size={20} /> },
              { label: "Soporte Técnico", icon: <LayoutGrid size={20} /> },
            ].map((item, i) => (
              <button 
                key={i}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl font-black italic uppercase tracking-widest text-[11px] transition-all border ${
                  item.active 
                  ? "bg-blue-600 border-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.3)]" 
                  : "bg-transparent border-white/5 text-white/40 hover:border-blue-600/30 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Columna Derecha: Contenido y Vistas Rápidas */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Sección de Recientes con Imágenes Grandes */}
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 overflow-hidden relative">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Últimos Avistamientos</h2>
                <Link href="/characters" className="text-blue-500 font-bold uppercase text-[10px] tracking-widest hover:underline">Ver Todo</Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[183, 2, 3, 4].map((id) => (
                <div key={id} className="relative aspect-square rounded-3xl overflow-hidden group cursor-pointer">
                   <img 
                    src={`https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" 
                    alt="Recent"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                      <p className="text-white font-black italic text-[10px] uppercase tracking-tighter">Sujeto RM-{id}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer de Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 border border-white/5 rounded-[2.5rem] flex items-center gap-6 group hover:bg-blue-600 transition-all cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/20">
                    <User className="text-blue-500 group-hover:text-white" />
                </div>
                <div>
                   <h4 className="font-black italic uppercase text-lg leading-none mb-1">Perfil Público</h4>
                   <p className="text-white/40 group-hover:text-white/70 text-[10px] font-bold uppercase tracking-widest">Gestionar Identidad</p>
                </div>
             </div>
             
             <div className="p-8 border border-blue-600/30 rounded-[2.5rem] flex items-center gap-6 bg-blue-600/5 group hover:bg-blue-600 transition-all cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg group-hover:bg-white/20">
                    <LayoutGrid className="text-white" />
                </div>
                <div>
                   <h4 className="font-black italic uppercase text-lg leading-none mb-1">Explorar API</h4>
                   <p className="text-white/40 group-hover:text-white/70 text-[10px] font-bold uppercase tracking-widest">Nuevos Parámetros</p>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}