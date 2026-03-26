"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  role?: string;
}

export default function NavLinks({ role }: Props) {
  const pathname = usePathname();

  const links = [
    { title: "Inicio", href: "/" },
    { title: "Conocenos", href: "/about" },
    { title: "Contacto", href: "/contact" },
  ];

  if (role === "admin") {
    links.push({ title: "Dashboard Admin", href: "/admin" });
  }

  if (role === "user") {
    links.push({ title: "Dashboard", href: "/dashboard/user" });
  }

  return (
    <ul className="flex gap-8 font-black italic text-base tracking-tight">
      {links.map((link) => (
        <Link key={link.title} href={link.href}>
          <li
            className={`relative group ${
              pathname === link.href ? "text-blue-600" : "text-white"
            }`}
          >
            {link.title}

            <span
              className={`absolute -bottom-2 left-0 h-0.5 bg-blue-600 transition-all duration-500 ${
                pathname === link.href
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            />
          </li>
        </Link>
      ))}
    </ul>
  );
}