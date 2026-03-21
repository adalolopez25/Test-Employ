"use client";

import { useState } from "react";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import rick from "@/assets/rick.png"
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Loader2,
  LogIn,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AuthModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const setAuth = useAuthStore((state) => state.setAuth);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ocurrió un error");
      setAuth(data.user, data.token);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        /* FONDO: bg-black/40 para transparencia y backdrop-blur-md para borrosidad */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-all duration-300"
        >
          {/* CONTENEDOR PRINCIPAL */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] flex shadow-[0_0_50px_rgba(0,0,0,0.5)] min-h-[600px] overflow-hidden"
          >
            {/* BOTÓN CERRAR GLOBAL */}
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-6 right-6 text-slate-500 hover:text-white z-[120] transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <X size={26} />
            </button>

            {/* LADO IZQUIERDO: Imagen */}
            <div className="hidden md:block w-1/2 ">
              <img
                alt="Rick and Morty"
                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale myimageform"
              />
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0a0a0a]/100" />
              <div className="absolute bottom-12 left-12 z-10">
                <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">
                  RICK{" "} <span>&</span><span className="text-blue-500">{" "}MORTY</span>
                </h3>
                <p className="text-blue-400 text-[11px] font-bold tracking-[0.4em] uppercase">
                  By Andres Armenta
                </p>
              </div>
            </div>

            {/* LADO DERECHO: Formulario */}
            <div className="w-full md:w-1/2 flex flex-col relative overflow-hidden bg-transparent">
              <div className="flex flex-col flex-1 pt-20">
                {/* TABS 50/50 */}
                <div className="px-12">
                  <div className="flex w-full mb-10 relative border-b border-white/5">
                    <button
                      onClick={() => {
                        setIsLogin(true);
                        setError("");
                      }}
                      className={`flex-1 pb-4 text-sm font-black uppercase tracking-widest transition-all ${isLogin ? "text-blue-500" : "text-slate-600 hover:text-slate-400"}`}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setIsLogin(false);
                        setError("");
                      }}
                      className={`flex-1 pb-4 text-sm font-black uppercase tracking-widest transition-all ${!isLogin ? "text-blue-500" : "text-slate-600 hover:text-slate-400"}`}
                    >
                      Register
                    </button>
                    <motion.div
                      className="absolute bottom-[-1px] h-0.5 bg-blue-500 shadow-[0_0_15px_#3b82f6]"
                      animate={{ width: "50%", left: isLogin ? "0%" : "50%" }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  </div>
                </div>

                {/* SLIDER */}
                <motion.div
                  className="flex flex-1"
                  animate={{ x: isLogin ? "0%" : "-100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ width: "100%" }}
                >
                  {/* LOGIN PANEL */}
                  <div className="min-w-full px-12 flex flex-col">
                    <h2 className="text-center text-3xl font-black text-white mb-2 italic uppercase tracking-tighter">
                      INICIAR SESION
                    </h2>
                    <p className="text-center text-slate-500 text-sm mb-8">
                      Ingresa tus credenciales.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                          size={18}
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500 transition-all text-sm"
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="relative">
                        <Lock
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                          size={18}
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500 transition-all text-sm"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
    
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 py-4 rounded-2xl font-black italic tracking-widest text-white hover:bg-blue-500 mt-4 flex justify-center items-center gap-2 group transition-all"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>
                            INGRESAR{" "}
                            <LogIn
                              size={18}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* REGISTER PANEL */}
                  <div className="min-w-full px-12 flex flex-col">
                    <h2 className="text-center text-3xl font-black text-white mb-2 italic uppercase tracking-tighter">
                      REGISTRARSE
                    </h2>
                    <p className="text-center text-slate-500 text- mb-8">
                      Ingresa tus datos personales.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <UserIcon
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                          size={18}
                        />
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500 transition-all text-sm"
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="relative">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                          size={18}
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500 transition-all text-sm"
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="relative">
                        <Lock
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                          size={18}
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500 transition-all text-sm"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 py-4 rounded-2xl font-black italic tracking-widest text-white hover:bg-blue-500 mt-4 flex justify-center items-center gap-2 group transition-all"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>
                            GUARDAR DATOS{" "}
                            <ArrowRight
                              size={18}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>
              {error && (
                <div className="px-12 pb-8">
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-[10px] italic font-bold text-center">
                    {error}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
