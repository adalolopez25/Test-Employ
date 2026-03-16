"use client";

import React from 'react'
import { NavLinks } from '@/constants/navLink'
import { usePathname } from "next/navigation";
import Link from 'next/link'

const NavBar = () => {
  const currentPath = usePathname();

  return (
    <nav>
      <ul className='flex gap-5 font-light text-2xl italic tracking-wider'>
        {NavLinks.map((link) => {
          // Comparamos la ruta actual con el href del link
          const isActive = currentPath === link.href;

          return (
            <Link key={link.title} href={link.href}>
              <li className={`transition-all duration-300 hover:text-blue-400 ${
                isActive 
                  ? "text-blue-500 font-normal not-italic border-b-2 border-blue-500" 
                  : "text-white"
              }`}>
                {link.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  )
}

export default NavBar