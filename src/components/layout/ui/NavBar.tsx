"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // ✅ agregado
import { useAuthStore } from "@/core/hooks/store/useAuthStore";
import { useFavoriteStore } from "@/core/hooks/store/useFavoriteStore";
import { LogOut, User as UserIcon, Heart, ChevronDown } from "lucide-react";
import { AuthModal } from "@/components/ui/AuthModal";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";

interface NavLinkItem {
  title: string;
  href: string;
}

interface UnifiedUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: string;
}

const NavBar = () => {
  const currentPath = usePathname();
  const { user, logout, setAuth } = useAuthStore();
  const { favorites } = useFavoriteStore();
  const { data: session, status } = useSession();
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentUser = (user || (session?.user ? {
    id: (session.user as any).id || "",
    name: session.user.name || "Usuario",
    email: session.user.email || "",
    image: session.user.image,
    role: (session.user as any).role || "user"
  } : null)) as UnifiedUser | null;

  useEffect(() => {
    if (status === "authenticated" && session?.user && !user) {
      const syncUser: any = {
        id: (session.user as any).id || session.user.email,
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
        role: (session.user as any).role || "user",
      };
      setAuth(syncUser, "google-session");
    }
  }, [status, session, user, setAuth]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNavLinks = (): NavLinkItem[] => {
    const baseLinks: NavLinkItem[] = [
      { title: "Inicio", href: "/" },
      { title: "Conocenos", href: "/about" },
      { title: "Contacto", href: "/contact" },
    ];
    if (currentUser?.role === "admin") {
      return [...baseLinks, { title: "Dashboard Admin", href: "/admin" }];
    }
    return baseLinks;
  };

  const currentLinks = getNavLinks();

  const getInitials = (value?: string | null) => {
  if (!value) return "??";

  // Si es email, quitar dominio
  const clean = value.split("@")[0];

  const words = clean.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return (
    words[0][0] + words[words.length - 1][0]
  ).toUpperCase();
};

  const handleLogout = async () => {
  setIsDropdownOpen(false);

  await nextAuthSignOut({ redirect: false });
  logout();

  window.location.href = "/";
};

  if (!mounted) return null;

  return (
    <>
      <nav className="flex items-center justify-between w-full py-4 px-8 bg-transparent">
        <ul className="flex gap-8 font-black italic text-base tracking-tight items-center">
          {currentLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <li className={`group relative transition-all duration-300 hover:text-blue-500 cursor-pointer flex items-center gap-2 ${
                currentPath === link.href ? "text-blue-600" : "text-white"
              }`}>
                {link.title}
                <span className={`absolute -bottom-2 left-0 h-0.75 bg-blue-600 transition-all duration-500 ${
                  currentPath === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </li>
            </Link>
          ))}
        </ul>

        <div className="flex items-center gap-8">
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-2 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:border-blue-600/30 transition-colors group"
              >
                <div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center font-black text-xl italic shadow-[0_0_20px_rgba(37,99,235,0.2)] ${
                  currentUser.role === "admin"
                    ? "bg-red-500/10 text-red-500 border border-red-500/30"
                    : "bg-blue-600/10 text-blue-500 border border-blue-600/30"
                }`}>
                  {currentUser.image ? (
                    <Image
                      src={currentUser.image}
                      alt="Avatar"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    getInitials(currentUser.name || currentUser.email)
                  )}
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black uppercase text-white tracking-[0.2em]">
                    {currentUser.name.split(" ")[0]}
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                    currentUser.role === "admin" ? "text-red-500 animate-pulse" : "text-blue-500"
                  }`}>
                    {currentUser.role}
                  </span>
                </div>

                <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180 text-blue-500" : "group-hover:text-white"
                }`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[#0a0a0a]/95 border border-white/10 rounded-2xl p-4 shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="mb-4 pb-4 border-b border-white/5">
                    <p className="text-sm font-semibold text-white leading-tight">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500">{currentUser.email}</p>
                  </div>

                  <nav className="space-y-2">
                    <Link href="/profile" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition" onClick={() => setIsDropdownOpen(false)}>
                      <UserIcon size={16} className="text-slate-400" />
                      <span className="text-xs font-medium text-white/80">Mi Perfil</span>
                    </Link>

                    <Link href="/favorites" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition" onClick={() => setIsDropdownOpen(false)}>
                      <div className="relative">
                        <Heart size={16} className="text-slate-400" />
                        {favorites.length > 0 && (
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-600 rounded-full text-[8px] flex items-center justify-center text-white">
                            {favorites.length}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-medium text-white/80">Favoritos</span>
                    </Link>

                    <div className="h-px bg-white/5 my-2" />
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-red-500/10 transition text-red-500"
                    >
                      <LogOut size={16} />
                      <span className="text-xs font-medium">Cerrar sesión</span>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="relative overflow-hidden group px-10 py-3 rounded-full border border-blue-600/30 text-white font-black italic uppercase text-xs tracking-[0.2em] hover:border-blue-500 transition-all"
            >
              <span className="relative z-10">Iniciar Sesion</span>
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-20" />
            </button>
          )}
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default NavBar;