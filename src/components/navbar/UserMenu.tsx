"use client";

import { useState, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  LogOut,
  User,
  Star,
  ShieldCheck,
  LayoutGrid
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useClickOutside } from "@/core/hooks/store/useClickOutside";
import { useQuery } from "@tanstack/react-query";

async function fetchFavorites() {
  const res = await fetch("/api/favorites");

  if (!res.ok) throw new Error("Error cargando favoritos");

  return res.json();
}

export default function UserMenu() {

  const { data: session } = useSession();

  const user = session?.user;

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    enabled: !!session
  });

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const favoriteCount = favorites?.length ?? 0;

  if (!user) return null;

  return (
    <div className="relative" ref={ref} style={{ zIndex: 9999 }}>

      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95 outline-none"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "User"}
            width={40}
            height={40}
            className="rounded-full border-2 border-blue-500/50 object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-[#0d0d0d]/95 border border-white/10 rounded-2xl p-2 shadow-lg">

          {/* Header */}
          <div className="px-4 py-3 border-b border-white/5 mb-2">

            <p className="text-sm font-bold text-white truncate">
              {user.name}
            </p>

            <div className="mt-2 flex items-center gap-2">

              <span className="text-[10px] font-black uppercase bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md">
                {user.role}
              </span>

              <span className="text-[10px] font-black uppercase bg-white/5 text-gray-400 px-2 py-0.5 rounded-md">
                {favoriteCount} Favs
              </span>

            </div>
          </div>

          <div className="flex flex-col gap-1">

            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-xl"
            >
              <User size={16} />
              Perfil
            </Link>

            <Link
              href="/favorites"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-gray-300 hover:bg-white/5 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <Star size={16} />
                Favoritos
              </div>

              <span className="text-xs">{favoriteCount}</span>
            </Link>

            <Link
              href="/ratings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-xl"
            >
              <LayoutGrid size={16} />
              Mis Calificaciones
            </Link>

            {user.role === "admin" && (
              <Link
                href="/dashboard/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-xl"
              >
                <ShieldCheck size={16} />
                Panel Admin
              </Link>
            )}

          </div>

          <div className="mt-2 pt-2 border-t border-white/5">

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-xl"
            >
              <LogOut size={16} />
              Cerrar Sesión
            </button>

          </div>

        </div>
      )}
    </div>
  );
}