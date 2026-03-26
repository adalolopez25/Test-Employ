"use client";

import { useState } from "react";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";
import { useAuthStore } from "@/core/hooks/store/useAuthStore";
import { fetcher } from "@/lib/api-client";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  onSuccess?: () => void;
  redirectPath?: string;
}

export const LoginForm = ({ onSuccess, redirectPath = "/characters" }: LoginFormProps) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await fetcher<any>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setAuth(data.user, data.token);
      toast.success("Acceso concedido");
      
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = data.user.role === "admin" ? "/admin" : redirectPath;
      }
    } catch (err: any) {
      setError(err.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-[10px] mb-6 text-center italic font-black uppercase tracking-wider">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative group/input">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-blue-500 transition-colors" size={18} />
          <input
            type="email"
            placeholder="CORREO ELECTRÓNICO"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white text-xs font-bold placeholder:text-slate-600 tracking-widest"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="relative group/input">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-blue-500 transition-colors" size={18} />
          <input
            type="password"
            placeholder="CONTRASEÑA"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white text-xs font-bold placeholder:text-slate-600 tracking-widest"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black italic tracking-[0.2em] py-5 rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3 group active:scale-[0.98]"
        >
          {loading ? <Loader2 className="animate-spin" /> : (
            <>INGRESAR <LogIn size={18} className="group-hover:translate-x-1 transition-transform" /></>
          )}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5"></div>
        </div>
        <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.3em]">
          <span className="bg-transparent px-4 text-slate-600 italic">O </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: redirectPath })}
        className="w-full bg-white/5 border border-white/10 hover:border-blue-500/40 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
      >
        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        <span className="text-[10px] tracking-[0.2em] uppercase font-black">Iniciar con Google</span>
      </button>
    </div>
  );
};