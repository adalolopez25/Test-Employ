"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LoginForm } from "@/components/forms/auth/LoginForm";
import { RegisterForm } from "@/components/forms/auth/RegisterForm";

export const AuthModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const imageMongo = "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Imagenes/webp/rick.webp";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-all duration-300"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] flex shadow-[0_0_50px_rgba(0,0,0,0.5)] min-h-[600px] overflow-hidden"
          >
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-6 right-6 text-slate-500 hover:text-white z- transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <X size={26} />
            </button>

            {/* Lado Izquierdo: Imagen */}
            <div className="hidden md:block w-1/2 relative">
              <Image
                src={imageMongo}
                fill
                alt="Rick and Morty"
                className="object-cover opacity-50 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]" />
              <div className="absolute bottom-12 left-12 z-10">
                <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">
                  RICK <span className="text-blue-500">& MORTY</span>
                </h3>
                <p className="text-blue-400 text-[11px] font-bold tracking-[0.4em] uppercase">
                  By Andres Armenta
                </p>
              </div>
            </div>

            {/* Lado Derecho: Formularios */}
            <div className="w-full md:w-1/2 flex flex-col bg-transparent relative overflow-hidden">
              <div className="flex flex-col flex-1 pt-20">
                <div className="px-12">
                  <div className="flex w-full mb-10 relative border-b border-white/5">
                    <button
                      onClick={() => setIsLogin(true)}
                      className={`flex-1 pb-4 text-sm font-black uppercase tracking-widest transition-all ${isLogin ? "text-blue-500" : "text-slate-600 hover:text-slate-400"}`}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setIsLogin(false)}
                      className={`flex-1 pb-4 text-sm font-black uppercase tracking-widest transition-all ${!isLogin ? "text-blue-500" : "text-slate-600 hover:text-slate-400"}`}
                    >
                      Register
                    </button>
                    <motion.div
                      className="absolute bottom-[-1px] h-0.5 bg-blue-500 shadow-[0_0_15px_#3b82f6]"
                      animate={{ width: "50%", left: isLogin ? "0%" : "50%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  </div>
                </div>

                <motion.div
                  className="flex flex-1"
                  animate={{ x: isLogin ? "0%" : "-100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ width: "100%" }}
                >
                  {/* PANEL LOGIN */}
                  <div className="min-w-full px-12">
                    <h2 className="text-center text-3xl font-black text-white mb-2 italic uppercase tracking-tighter">
                      INICIAR SESIÓN
                    </h2>
                    <p className="text-center text-slate-500 text-sm mb-8 italic">Ingresa tus credenciales interdimensionales.</p>
                    <LoginForm onSuccess={onClose} />
                  </div>

                  {/* PANEL REGISTER */}
                  <div className="min-w-full px-12">
                    <h2 className="text-center text-3xl font-black text-white mb-2 italic uppercase tracking-tighter">
                      REGISTRARSE
                    </h2>
                    <p className="text-center text-slate-500 text-sm mb-8 italic">Crea tu nuevo ID de viajero.</p>
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