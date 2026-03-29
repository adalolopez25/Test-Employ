"use client";

import { useState, useEffect } from "react";
import { useFavoriteStore } from "@/core/hooks/store/useFavoriteStore";
import Link from "next/link";
import Image from "next/image";
import { CardSkeleton } from "@/components/shared/CardSkeleton";
import { useSession } from "next-auth/react";

const FavoritesPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  // Obtener estado SIN transformar (evita loop)
  const favoritesStore = useFavoriteStore((state) => state.favorites);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

  // Filtrar favoritos del usuario
  const favorites = user
    ? favoritesStore.filter((fav: any) => fav.userId === user.email)
    : [];

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen px-6 py-12 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <div className="h-10 w-48 bg-slate-900 animate-pulse rounded-lg mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-8 mb-8">
          <h1 className="text-3xl font-black italic text-blue-500 uppercase">
            Mis Favoritos
          </h1>
        </div>

        <div className="flex items-center gap-5 justify-between">
          <p className="ml-5 mb-5 text-white/50 text-sm">
            {favorites.length} personajes en tu multiverso
          </p>

          <Link href="/characters">
            <button className="mb-3 px-4 py-2 bg-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-500">
              Volver a Personajes
            </button>
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-white/50">
            <p className="text-lg italic font-bold">
              No hay dimensiones guardadas
            </p>
            <Link href="/characters" className="text-blue-400 hover:underline">
              Ir a buscar personajes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((item: any) => (
              <div
                key={item.id}
                className="bg-slate-900/50 border border-white/10 rounded-2xl p-4 hover:border-blue-500/50 transition-all"
              >
                {item.image && (
                  <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-black/20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <h3 className="text-lg font-bold mb-1">{item.name}</h3>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="text-xs text-red-400 hover:text-red-500 font-bold uppercase"
                  >
                    Quitar
                  </button>

                  <Link href={`/info/${item.id}`}>
                    <button className="px-4 py-2 bg-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-500">
                      Ver Detalles
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;