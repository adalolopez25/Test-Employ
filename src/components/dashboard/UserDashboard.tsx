"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserDashboard() {

  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <p className="p-10 text-slate-400">
        Cargando datos del multiverso...
      </p>
    );
  }

  if (!session) {
    return (
      <p className="p-10 text-red-500">
        No se pudo obtener la sesión.
      </p>
    );
  }

  const user = session.user;

  return (
    <div className="p-10 text-white min-h-screen">

      <h1 className="text-4xl font-black italic uppercase mb-10 border-l-4 border-blue-600 pl-4">
        Dashboard de Usuario
      </h1>

      {/* Perfil */}
      <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 flex items-center gap-6 mb-10">

        {user?.image && (
          <div className="relative w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={user.image}
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
        )}

        <div>

          <p className="text-xl font-bold">
            {user?.name}
          </p>

          <p className="text-slate-400 text-sm">
            {user?.email}
          </p>

          <span className="text-[10px] uppercase font-black text-blue-400">
            {user?.role}
          </span>

        </div>

      </div>

      {/* Estadísticas */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
          <p className="text-xs uppercase text-slate-500 mb-2">
            Personajes explorados
          </p>
          <p className="text-3xl font-black text-blue-500">
            ∞
          </p>
        </div>

        <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
          <p className="text-xs uppercase text-slate-500 mb-2">
            Favoritos guardados
          </p>
          <p className="text-3xl font-black text-blue-500">
            ?
          </p>
        </div>

        <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
          <p className="text-xs uppercase text-slate-500 mb-2">
            Estado
          </p>
          <p className="text-3xl font-black text-green-500">
            Activo
          </p>
        </div>

      </div>

    </div>
  );
}