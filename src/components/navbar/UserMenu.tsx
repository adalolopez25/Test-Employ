"use client";

import { useState, useRef } from "react";
import { signOut } from "next-auth/react";
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
import { useFavoriteStore } from "@/core/hooks/store/useFavoriteStore";

export default function UserMenu({ user }: any) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const favorites = useFavoriteStore((state) => state.favorites);

  useClickOutside(ref, () => setOpen(false));

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="relative" ref={ref} style={{ zIndex: 9999 }}>
      
      {/* Avatar Button */}
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
            className="rounded-full border-2 border-blue-500/50 object-cover shadow-lg shadow-blue-500/20"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold border-2 border-white/10 shadow-lg">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-[#0d0d0d]/95 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in duration-200">

          {/* Header */}
          <div className="px-4 py-3 border-b border-white/5 mb-2">
            <p className="text-sm font-bold text-white truncate">{user.name}</p>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px] font-black uppercase bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md border border-blue-500/20">
                {user.role || "user"}
              </span>

              <span className="text-[10px] font-black uppercase bg-white/5 text-gray-400 px-2 py-0.5 rounded-md border border-white/10">
                {favorites.length} Favs
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1">

            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <User size={16} className="text-blue-400" />
              Perfil
            </Link>

            <Link
              href="/favorites"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <Star size={16} className="text-yellow-500" />
                Favoritos
              </div>

              <span className="text-[10px] font-bold bg-white/10 px-1.5 py-0.5 rounded group-hover:bg-blue-500 group-hover:text-white transition-colors">
                {favorites.length}
              </span>
            </Link>

            <Link
              href="/ratings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <LayoutGrid size={16} className="text-purple-400" />
              Mis Calificaciones
            </Link>

            {/* SOLO ADMIN */}
            {user.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                <ShieldCheck size={16} className="text-green-400" />
                Panel Admin
              </Link>
            )}

          </div>

          {/* Logout */}
          <div className="mt-2 pt-2 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium"
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