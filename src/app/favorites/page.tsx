"use client";

import { useFavoriteStore } from "@/hooks/store/useFavoriteStore";
import Link from "next/link";

const FavoritesPage = () => {
  const { favorites } = useFavoriteStore();

  return (
    <div className="min-h-screen px-6 py-12 text-white">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Mis Favoritos</h1>
          <p className="text-white/50 text-sm">
            {favorites.length} elementos guardados
          </p>
        </div>

        {/* Empty state */}
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-white/50">
            <p className="text-lg">No tienes favoritos aún</p>
            <span className="text-sm">
              Guarda elementos para verlos aquí
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {favorites.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition"
              >
                {/* Imagen (si tienes) */}
                {item.image && (
                  <div className="w-full h-40 mb-4 rounded-xl overflow-hidden bg-black/20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Info */}
                <h3 className="text-sm font-semibold mb-1">
                  {item.name || "Item"}
                </h3>

                <p className="text-xs text-white/50 mb-3">
                  {item.description || "Sin descripción"}
                </p>

                {/* Footer */}
                <div className="flex justify-evenly items-center">
                  {item.price && (
                    <span className="text-sm text-blue-400">
                      ${item.price}
                    </span>
                  )}

                  <button className="text-xs text-red-400 hover:text-red-500">
                    Quitar
                  </button>
                  <Link href={`/info/${item.id}`}>
                   <button className="text-xs text-blue-400 hover:text-blue-500">
                    Ver Personaje
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