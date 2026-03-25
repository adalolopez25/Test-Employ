"use client";

import { useState } from "react";
import { User as UserIcon, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { fetcher } from "@/lib/api-client";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface RegisterFormProps {
  onSuccess?: () => void;
  redirectPath?: string;
}

export const RegisterForm = ({ onSuccess, redirectPath = "/characters" }: RegisterFormProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await fetcher<any>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setAuth(data.user, data.token);
      toast.success("Registro Completado");
      
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = redirectPath;
      }
    } catch (err: any) {
      setError(err.message || "Error al crear cuenta interdimensional");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-6 text-center italic">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group/input">
          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-blue-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="NOMBRE DE USUARIO"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white text-xs font-bold tracking-widest placeholder:text-slate-600"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="relative group/input">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-blue-500 transition-colors" size={18} />
          <input
            type="email"
            placeholder="CORREO ELECTRÓNICO"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white text-xs font-bold tracking-widest placeholder:text-slate-600"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="relative group/input">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-blue-500 transition-colors" size={18} />
          <input
            type="password"
            placeholder="CONTRASEÑA"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white text-xs font-bold tracking-widest placeholder:text-slate-600"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black italic tracking-[0.2em] py-5 rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin" /> : (
            <>GUARDAR DATOS <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} /></>
          )}
        </button>
      </form>

      <div className="flex items-center gap-4 my-6">
        <div className="h-[1px] flex-1 bg-white/5"></div>
        <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">O</span>
        <div className="h-[1px] flex-1 bg-white/5"></div>
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: redirectPath })}
        className="w-full border border-white/10 py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-colors group"
      >
        <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width={16} height={16} alt="Google" />
        <span className="text-[9px] font-black uppercase tracking-[.2em] text-slate-500 group-hover:text-white">Google Auth</span>
      </button>
    </div>
  );
};