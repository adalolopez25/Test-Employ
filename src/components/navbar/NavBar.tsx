"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import NavLinks from "./Navlinks";

const AuthModal = dynamic(
  () => import("@/components/ui/AuthModal").then((mod) => mod.AuthModal),
  { ssr: false },
);

export default function NavBar() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "register">("login");

  const openLogin = () => {
    setAuthView("login");
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthView("register");
    setIsAuthModalOpen(true);
  };

  if (status === "loading") return null;

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <h1 className="text-white font-black text-xl tracking-tight">
          Rick <span className="text-blue-500">& Morty</span>
        </h1>

        <div className="hidden md:flex">
          <NavLinks role={user?.role} />
        </div>

        {user ? (
          <UserMenu user={user} />
        ) : (
          <div className="flex gap-4">
            <button
              onClick={openLogin}
              className="text-white text-sm hover:text-blue-400 transition"
            >
              Login
            </button>
            <button
              onClick={openRegister}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
            >
              Register
            </button>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        view={authView}
        setView={setAuthView}
      />
    </>
  );
}
