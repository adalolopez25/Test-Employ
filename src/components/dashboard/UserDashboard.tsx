"use client";

import { useAuthStore } from "@/core/hooks/store/useAuthStore";
import Image from "next/image";

export default function UserDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="p-8 bg-transparent min-h-screen text-white">

      <h1 className="text-4xl font-black italic uppercase mb-8 border-l-4 border-blue-600 pl-4">
        Panel de Usuario
      </h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-6">

        {user?.image && (
          <Image
            src={user.image}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full"
          />
        )}

        <div>

          <h2 className="text-2xl font-bold">
            {user?.name}
          </h2>

          <p className="text-slate-400">
            {user?.email}
          </p>

          <span className="mt-2 inline-block px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 uppercase font-bold">
            {user?.role}
          </span>

        </div>

      </div>

    </div>
  );
}