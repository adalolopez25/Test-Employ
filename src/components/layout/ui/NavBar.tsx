"use client";

import React, { useState } from 'react'; // Importamos useState
import { NavLinks } from '@/constants/navLink';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useAuthStore } from '@/hooks/store/useAuthStore';
import { LogOut, User as UserIcon } from 'lucide-react';
// Importamos el nuevo modal
import { AuthModal } from '@/components/AuthModal'; 

const NavBar = () => {
  const currentPath = usePathname();
  const { user, logout } = useAuthStore();
  
  // ESTADO LOCAL para abrir/cerrar el Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between w-full py-6 px-10">
        {/* IZQUIERDA: Tus links originales */}
        <ul className='flex gap-10 font-light text-2xl italic tracking-wider items-center'>
          {NavLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <Link key={link.title} href={link.href}>
                <li className={` transition-all duration-300 hover:text-blue-400 cursor-pointer ${
                  isActive ? "text-blue-500 font-normal not-italic border-b-2 border-blue-500" : "text-white"
                }`}>
                  {link.title}
                </li>
              </Link>
            );
          })}
        </ul>

        {/* DERECHA: Autenticación */}
        <div className="flex items-center">
          {user ? (
            // SI HAY USUARIO: Muestra perfil
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1 rounded-full">
                <UserIcon size={18} className="text-blue-400" />
                <span className="text-lg font-medium text-blue-100">{user.name.split(' ')[0]}</span>
              </div>
              <button onClick={logout} className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1 text-sm uppercase italic tracking-widest font-bold">
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            // SI NO HAY USUARIO: Botón que ABRE EL MODAL
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="text-white hover:text-blue-400 transition-all text-xl italic font-light border border-white/20 px-8 py-2 rounded-full hover:border-blue-400"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Insertamos el Modal aquí al final */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}

export default NavBar;