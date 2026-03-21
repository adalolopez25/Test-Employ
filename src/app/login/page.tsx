"use client";

import { useState } from "react";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Credenciales incorrectas");

      setAuth(data.user, data.token);
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black italic text-blue-500 tracking-tighter uppercase">Welcome Back</h2>
          <p className="text-slate-500 text-xs tracking-[0.3em] mt-2 font-bold uppercase">Identifícate, viajero</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm mb-6 text-center italic font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black italic tracking-widest py-5 rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>LOGIN <LogIn size={18} /></>
            )}
          </button>
        </form>

        <p className="text-center text-slate-500 mt-10 text-sm">
          ¿Aún no tienes acceso? <Link href="/register" className="text-blue-400 font-bold hover:underline uppercase">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}