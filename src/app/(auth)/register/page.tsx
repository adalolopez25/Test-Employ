"use client";

import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="min-h-[95vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative group"
      >
        {/* Glow Efecto al pasar el mouse */}
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-500 rounded-[3rem] opacity-10 group-hover:opacity-20 transition duration-1000 blur-2xl" />
        
        <div className="relative bg-[#0a0a0a]/80 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
          
          {/* Header de la Vista */}
          <div className="text-center mb-10">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-black italic text-white tracking-tighter uppercase leading-none"
            >
              NUEVO <span className="text-blue-500">Usuario</span>
            </motion.h2>
            <p className="text-slate-500 text-[10px] tracking-[0.4em] mt-4 font-black uppercase italic">
              Crea tu cuenta
            </p>
          </div>

          <RegisterForm />

          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              ¿Ya tienes una cuenta?{" "}
              <Link 
                href="/login" 
                className="text-blue-400 hover:text-blue-300 transition-colors underline-offset-4 hover:underline decoration-blue-500/50"
              >
                Ingresar aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Badge de Seguridad Opcional */}
        <p className="text-center mt-6 text-[8px] text-slate-700 font-black uppercase tracking-[0.5em]">
          by Andres Armenta
        </p>
      </motion.div>
    </div>
  );
}