"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

type AuthView = "login" | "register";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  view: AuthView;
  setView: (view: AuthView) => void;
}

export const AuthModal = ({
  isOpen,
  onClose,
  view,
  setView,
}: AuthModalProps) => {
  const imageForm =
    "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Imagenes/webp/rick.webp";

  const isLogin = view === "login";

  // cerrar con ESC + bloquear scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const tabStyle =
    "flex-1 pb-4 text-sm font-black uppercase tracking-widest transition-all";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] flex shadow-[0_0_50px_rgba(0,0,0,0.5)] min-h-150 overflow-hidden"
          >
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-6 right-10 text-slate-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
            </button>

            {/* IMAGEN */}
            <div className="hidden md:block w-1/2 relative">
              <Image
                src={imageForm}
                fill
                alt="Rick and Morty"
                className="object-cover opacity-50 grayscale"
                priority={false}
              />

              <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0a0a0a]" />

              <div className="absolute bottom-12 left-12 z-10">
                <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">
                  RICK <span className="text-blue-500">& MORTY</span>
                </h3>

                <p className="text-blue-400 text-[11px] font-bold tracking-[0.4em] uppercase">
                  By Andres Armenta
                </p>
              </div>
            </div>

            {/* FORMULARIOS */}
            <div className="w-full md:w-1/2 flex flex-col relative overflow-hidden">
              <div className="flex flex-col flex-1 pt-20">
                <div className="px-12">
                  <div className="flex w-full mb-10 relative border-b border-white/5">
                    <button
                      onClick={() => setView("login")}
                      className={`${tabStyle} ${
                        isLogin
                          ? "text-blue-500"
                          : "text-slate-600 hover:text-slate-400"
                      }`}
                    >
                      Login
                    </button>

                    <button
                      onClick={() => setView("register")}
                      className={`${tabStyle} ${
                        !isLogin
                          ? "text-blue-500"
                          : "text-slate-600 hover:text-slate-400"
                      }`}
                    >
                      Register
                    </button>

                    <motion.div
                      className="absolute -bottom-px h-0.5 bg-blue-500 shadow-[0_0_15px_#3b82f6]"
                      animate={{
                        width: "50%",
                        left: isLogin ? "0%" : "50%",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  </div>
                </div>

                <motion.div
                  className="flex flex-1"
                  animate={{ x: isLogin ? "0%" : "-100%" }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{ width: "100%" }}
                >
                  {/* LOGIN */}
                  <div className="min-w-full px-12">
                    <h2 className="text-center text-3xl font-black text-white mb-2 italic uppercase tracking-tighter">
                      INICIAR SESIÓN
                    </h2>

                    <p className="text-center text-slate-500 text-sm mb-8 italic">
                      Ingresa tus credenciales
                    </p>

                    <LoginForm onSuccess={onClose} />
                  </div>

                  {/* REGISTER */}
                  <div className="min-w-full px-12">
                    <h2 className="text-center text-3xl font-black text-white mb-2 italic uppercase tracking-tighter">
                      REGISTRARSE
                    </h2>

                    <p className="text-center text-slate-500 text-sm mb-8 italic">
                      Crea tu cuenta
                    </p>

                    <RegisterForm onSuccess={onClose} />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};