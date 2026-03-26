"use client";

import { useRatingStore } from "@/core/hooks/store/useRatingStore";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft } from "lucide-react";
import { useSession } from "next-auth/react";

export default function RatingsPage() {

  const { data: session } = useSession();
  const user = session?.user;

  const ratingsStore = useRatingStore((state) => state.ratings);

  const ratings = user
    ? ratingsStore.filter((r) => r.userId === user.email)
    : [];

  return (
    <div className="min-h-screen bg-transparent text-white px-6 py-24">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500">
              Mis Calificaciones
            </h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">
              Has evaluado {ratings.length} sujetos del multiverso
            </p>
          </div>

          <Link 
            href="/characters" 
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-bold uppercase italic"
          >
            <ChevronLeft size={16} /> Volver
          </Link>
        </div>

        {ratings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
            <Star size={48} className="text-gray-800 mb-4" />
            <p className="text-gray-500 font-bold italic uppercase">
              Aún no has calificado a nadie
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ratings.map((r) => (
              <div 
                key={r.characterId} 
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500"
              >
                
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={r.image} 
                    alt={r.characterName} 
                    fill 
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] to-transparent" />
                </div>

                <div className="p-5 relative">
                  <h3 className="text-sm font-black uppercase italic truncate mb-3 tracking-tighter">
                    {r.characterName}
                  </h3>
                  
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star 
                        key={s} 
                        size={14} 
                        fill={s <= r.value ? "#facc15" : "transparent"} 
                        className={
                          s <= r.value
                            ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                            : "text-white/10"
                        }
                      />
                    ))}

                    <span className="ml-2 text-[10px] font-bold text-blue-400/80">
                      {r.value}/5
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}